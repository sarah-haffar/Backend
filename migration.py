import json
import os
import re
from datetime import datetime
from typing import Dict, Optional
import logging

import mysql.connector
from mysql.connector import Error

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class AutoPartsImporter:
    def __init__(
        self,
        json_files_directory: str,
        output_sql_file: str = "import_data.sql",
        db_config: Optional[Dict] = None
    ):
        self.json_files_directory = json_files_directory
        self.output_sql_file = output_sql_file
        self.db_config = db_config
        self.db_connection = None
        self.sql_statements: list[str] = []
        
        # Counters for tracking imports
        self.counters = {
            'car_brands': 0,
            'car_models': 0,
            'engines': 0,
            'part_categories': 0,
            'parts': 0,
            'part_compatibility': 0
        }
        
        # Maps to store existing data and avoid duplicates
        self.brand_map: Dict[str, int] = {}
        self.model_map: Dict[tuple[int, str], int] = {}
        self.engine_map: Dict[tuple[int, str], int] = {}
        self.category_map: Dict[str, int] = {}
        self.shop_id = 1  # Default shop ID - you may need to adjust this

    def clean_price(self, price_str: str) -> float:
        """Convert price string to float"""
        if not price_str:
            return 0.0
        cleaned = re.sub(r'[^\d,.]', '', price_str)
        cleaned = cleaned.replace(',', '.')
        try:
            return float(cleaned)
        except ValueError:
            return 0.0

    def extract_engine_info(self, engine_str: str) -> Dict:
        """Extract engine information from string"""
        engine_info = {
            'displacement': None,
            'power_kw': None,
            'power_hp': None,
            'fuel_type': 'gasoline'
        }
        if not engine_str:
            return engine_info
        displacement_match = re.search(r'(\d+\.?\d*)\s*(?:L|l)?', engine_str)
        if displacement_match:
            engine_info['displacement'] = float(displacement_match.group(1))
        kw_match = re.search(r'(\d+)\s*KW', engine_str, re.IGNORECASE)
        if kw_match:
            engine_info['power_kw'] = int(kw_match.group(1))
        hp_match = re.search(r'(\d+)\s*(?:CV|HP)', engine_str, re.IGNORECASE)
        if hp_match:
            engine_info['power_hp'] = int(hp_match.group(1))
        return engine_info

    def extract_year_range(self, model_str: str) -> tuple[Optional[int], Optional[int]]:
        """Extract year range from model string"""
        year_pattern = r'\((\d{2})/(\d{4})\s*-\s*(\d{2})/(\d{4})\)'
        match = re.search(year_pattern, model_str)
        if match:
            start_year = int(match.group(2))
            end_year = int(match.group(4))
            return start_year, end_year
        return None, None

    def add_sql_statement(self, statement: str):
        """Add SQL statement to the list"""
        self.sql_statements.append(statement)

    def get_next_id(self, table: str) -> int:
        """Get next ID for a table"""
        return self.counters[table] + 1

    def process_brand(self, brand_name: str) -> int:
        if brand_name in self.brand_map:
            return self.brand_map[brand_name]
        brand_id = self.get_next_id('car_brands')
        self.counters['car_brands'] += 1
        self.brand_map[brand_name] = brand_id
        sql = (
            f"INSERT INTO car_brands (id, name, created_at)"
            f" VALUES ({brand_id}, '{brand_name}', NOW());"
        )
        self.add_sql_statement(sql)
        return brand_id

    def process_model(self, brand_id: int, model_str: str) -> int:
        model_name = re.sub(r'\s*\([^)]*\)$', '', model_str).strip()
        key = (brand_id, model_name)
        if key in self.model_map:
            return self.model_map[key]
        model_id = self.get_next_id('car_models')
        self.counters['car_models'] += 1
        self.model_map[key] = model_id
        year_start, year_end = self.extract_year_range(model_str)
        sql = (
            f"INSERT INTO car_models (id, brand_id, name, year_start, year_end)"
            f" VALUES ({model_id}, {brand_id}, '{model_name}', "
            f"{year_start if year_start else 'NULL'}, {year_end if year_end else 'NULL'});"
        )
        self.add_sql_statement(sql)
        return model_id

    def process_engine(self, model_id: int, engine_str: str) -> int:
        key = (model_id, engine_str)
        if key in self.engine_map:
            return self.engine_map[key]
        engine_id = self.get_next_id('engines')
        self.counters['engines'] += 1
        self.engine_map[key] = engine_id
        info = self.extract_engine_info(engine_str)
        sql = (
            f"INSERT INTO engines (id, car_model_id, name, fuel_type, displacement,"
            f" power_kw, power_hp, created_at) VALUES ("
            f"{engine_id}, {model_id}, '{engine_str}', '{info['fuel_type']}', "
            f"{info['displacement'] if info['displacement'] else 'NULL'}, "
            f"{info['power_kw'] if info['power_kw'] else 'NULL'}, "
            f"{info['power_hp'] if info['power_hp'] else 'NULL'}, NOW());"
        )
        self.add_sql_statement(sql)
        return engine_id

    def process_category(self, category_name: str, subcategory_name: Optional[str] = None) -> int:
        if category_name in self.category_map:
            parent_id = self.category_map[category_name]
        else:
            parent_id = self.get_next_id('part_categories')
            self.counters['part_categories'] += 1
            self.category_map[category_name] = parent_id
            sql = (
                f"INSERT INTO part_categories (id, name, created_at)"
                f" VALUES ({parent_id}, '{category_name}', NOW());"
            )
            self.add_sql_statement(sql)
        if subcategory_name and subcategory_name != category_name:
            key = f"{category_name}_{subcategory_name}"
            if key in self.category_map:
                return self.category_map[key]
            sub_id = self.get_next_id('part_categories')
            self.counters['part_categories'] += 1
            self.category_map[key] = sub_id
            sql = (
                f"INSERT INTO part_categories (id, parent_id, name, created_at)"
                f" VALUES ({sub_id}, {parent_id}, '{subcategory_name}', NOW());"
            )
            self.add_sql_statement(sql)
            return sub_id
        return parent_id

    def process_part(self, product: Dict, category_id: int, engine_id: int):
        part_id = self.get_next_id('parts')
        self.counters['parts'] += 1
        name = product.get('name', '').replace("'", "''")
        description = product.get('description', '').replace("'", "''")
        part_number = product.get('reference_number', '').replace("'", "''")
        brand = product.get('brand', '').replace("'", "''")
        price = self.clean_price(product.get('price', '0'))
        stock_text = product.get('stock', '').lower()
        stock_quantity = 1 if 'stock' in stock_text else 0
        piece_type = product.get('piece_type', '').lower()
        condition = 'new'
        if 'original' in piece_type:
            condition = 'original'
        elif 'adaptable' in piece_type:
            condition = 'aftermarket'
        sql = (
            f"INSERT INTO parts (id, shop_id, category_id, name, description, part_number,"
            f" brand, condition_type, price, stock_quantity, is_active, created_at, updated_at)"
            f" VALUES ({part_id}, {self.shop_id}, {category_id}, '{name}', '{description}',"
            f" '{part_number}', '{brand}', '{condition}', {price}, {stock_quantity}, true, NOW(), NOW());"
        )
        self.add_sql_statement(sql)
        comp_sql = f"INSERT INTO part_compatibility (part_id, engine_id) VALUES ({part_id}, {engine_id});"
        self.add_sql_statement(comp_sql)
        self.counters['part_compatibility'] += 1

    def process_json_file(self, file_path: str):
        logger.info(f"Processing file: {file_path}")
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            info = data.get('category_info', {})
            products = data.get('products', [])
            brand_id = self.process_brand(info.get('brand', 'Unknown Brand'))
            model_id = self.process_model(brand_id, info.get('model', 'Unknown Model'))
            engine_id = self.process_engine(model_id, info.get('engine', 'Unknown Engine'))
            cat_id = self.process_category(info.get('name', 'Unknown Category'))
            for prod in products:
                if prod.get('extraction_success', False):
                    subcat = prod.get('subcategory')
                    final_cat_id = self.process_category(info.get('name', 'Unknown Category'), subcat)
                    self.process_part(prod, final_cat_id, engine_id)
            logger.info(f"Processed {len(products)} products from {file_path}")
        except Exception as e:
            logger.error(f"Error processing file {file_path}: {e}")

    def connect_to_db(self):
        """Establish a database connection."""
        if not self.db_config:
            logger.warning("No database configuration provided. Will write to SQL file instead.")
            return
        try:
            self.db_connection = mysql.connector.connect(
                host=self.db_config.get("host", "localhost"),
                user=self.db_config.get("user"),
                password=self.db_config.get("password"),
                database=self.db_config.get("database")
            )
            if self.db_connection.is_connected():
                logger.info("Connected to MySQL database.")
        except Error as e:
            logger.error(f"Database connection failed: {e}")
            self.db_connection = None

    def execute_sql_statements(self):
        """Execute SQL statements in the connected database."""
        if not self.db_connection or not self.db_connection.is_connected():
            logger.error("No database connection available to execute SQL.")
            return
        cursor = self.db_connection.cursor()
        try:
            for stmt in self.sql_statements:
                if stmt.strip():
                    cursor.execute(stmt)
            self.db_connection.commit()
            logger.info("All SQL statements executed successfully.")
        except Error as e:
            logger.error(f"Error executing SQL: {e}")
            self.db_connection.rollback()
        finally:
            cursor.close()

    def import_all_json_files(self):
        logger.info(f"Starting import from directory: {self.json_files_directory}")
        if not os.path.exists(self.json_files_directory):
            logger.error(f"Directory not found: {self.json_files_directory}")
            return
        # Add header statements
        self.add_sql_statement("-- Auto Parts Import Script")
        self.add_sql_statement(f"-- Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        self.add_sql_statement("SET FOREIGN_KEY_CHECKS = 0;")
        self.add_sql_statement("")

        json_files = [f for f in os.listdir(self.json_files_directory) if f.endswith('.json')]
        for fname in json_files:
            self.process_json_file(os.path.join(self.json_files_directory, fname))

        # Footer statements
        self.add_sql_statement("")
        self.add_sql_statement("SET FOREIGN_KEY_CHECKS = 1;")

        # Execute or write
        if self.db_config:
            self.connect_to_db()
            if self.db_connection:
                self.execute_sql_statements()
                self.db_connection.close()
        else:
            self.write_sql_file()

        # Print summary
        self.print_summary()

    def write_sql_file(self):
        try:
            with open(self.output_sql_file, 'w', encoding='utf-8') as f:
                for stmt in self.sql_statements:
                    f.write(stmt + '\n')
            logger.info(f"SQL file written: {self.output_sql_file}")
        except Exception as e:
            logger.error(f"Error writing SQL file: {e}")

    def print_summary(self):
        logger.info("Import Summary:")
        logger.info("-" * 40)
        for tbl, cnt in self.counters.items():
            logger.info(f"{tbl}: {cnt} records")
        logger.info("-" * 40)
        logger.info(f"Total SQL statements: {len(self.sql_statements)}")


if __name__ == "__main__":
    # Configuration
    JSON_FILES_DIRECTORY = "./json_files"
    OUTPUT_SQL_FILE = "auto_parts_import.sql"
    DB_CONFIG = {
        "host": "localhost",
        "user": "root",
        "password": "admin",
        "database": "krenova_db"
    }
    importer = AutoPartsImporter(JSON_FILES_DIRECTORY, OUTPUT_SQL_FILE, db_config=DB_CONFIG)
    importer.import_all_json_files()
    print("\nImport completed! Check logs or SQL file for details.")
