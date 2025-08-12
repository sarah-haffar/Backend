const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const isAuthenticated = require('../middlewares/isAuthenticated');

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - make
 *         - model
 *         - year
 *         - user_id
 *         - engineId
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the car
 *         make:
 *           type: string
 *           description: Car make (e.g., Toyota)
 *         model:
 *           type: string
 *           description: Car model (e.g., Corolla)
 *         year:
 *           type: integer
 *           description: Manufacturing year
 *         user_id:
 *           type: integer
 *           description: ID of the owner user
 *         engineId:
 *           type: integer
 *           description: ID of the associated engine
 *       example:
 *         id: 1
 *         make: "Toyota"
 *         model: "Corolla"
 *         year: 2020
 *         user_id: 5
 *         engineId: 3
 *     
 *     CompatiblePart:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Part ID
 *         name:
 *           type: string
 *           description: Part name
 *         description:
 *           type: string
 *           description: Part description
 *         price:
 *           type: number
 *           format: float
 *           description: Part price
 *         shop:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *             address:
 *               type: string
 *             phone:
 *               type: string
 *         category:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *         compatibilities:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               car_id:
 *                 type: integer
 *               part_id:
 *                 type: integer
 * 
 *     Shop:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         owner:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             first_name:
 *               type: string
 *             last_name:
 *               type: string
 *             email:
 *               type: string
 * 
 *     CompatiblePartsResponse:
 *       type: object
 *       properties:
 *         user_cars:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Car'
 *         compatible_parts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CompatiblePart'
 *         total_parts:
 *           type: integer
 * 
 *     ShopsResponse:
 *       type: object
 *       properties:
 *         user_cars:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Car'
 *         shops:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Shop'
 *         total_shops:
 *           type: integer
 * 
 *     RecommendationsResponse:
 *       type: object
 *       properties:
 *         user_cars:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Car'
 *         recommendations:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *             page:
 *               type: integer
 *             limit:
 *               type: integer
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CompatiblePart'
 *   
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   - name: Cars
 *     description: API for managing cars
 *   - name: Car Compatibility
 *     description: API for car parts compatibility and recommendations
 */

// ================================================================
// ROUTES SPÉCIFIQUES (à placer AVANT les routes génériques)
// ================================================================

/**
 * @swagger
 * /api/cars/user/{user_id}:
 *   get:
 *     summary: Get all cars for a specific user
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID to filter cars
 *     responses:
 *       200:
 *         description: List of user's cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       404:
 *         description: User not found
 */
router.get('/user/:user_id', carController.getCarsByUserId);

// Routes pour la compatibilité des pièces avec les voitures

/**
 * @swagger
 * /api/cars/users/{user_id}/cars/compatible-parts:
 *   get:
 *     summary: Get all compatible parts for user's cars
 *     tags: [Car Compatibility]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID to get compatible parts for their cars
 *     responses:
 *       200:
 *         description: List of compatible parts for user's cars
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompatiblePartsResponse'
 *       404:
 *         description: No cars found for this user
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.get('/users/:user_id/cars/compatible-parts', 
  isAuthenticated, 
  carController.getCompatiblePartsForUser
);

/**
 * @swagger
 * /api/cars/users/{user_id}/cars/shops:
 *   get:
 *     summary: Get all shops that sell parts compatible with user's cars
 *     tags: [Car Compatibility]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID to get shops for their cars
 *     responses:
 *       200:
 *         description: List of shops selling compatible parts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShopsResponse'
 *       404:
 *         description: No cars found for this user
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.get('/users/:user_id/cars/shops', 
  isAuthenticated, 
  carController.getShopsForUserCars
);

/**
 * @swagger
 * /api/cars/users/{user_id}/cars/recommendations:
 *   get:
 *     summary: Get part recommendations for user's cars with pagination
 *     tags: [Car Compatibility]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID to get recommendations for their cars
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of items per page
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filter by part category ID
 *     responses:
 *       200:
 *         description: Paginated list of recommended parts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecommendationsResponse'
 *       404:
 *         description: No cars found for this user
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.get('/users/:user_id/cars/recommendations', 
  isAuthenticated, 
  carController.getPartRecommendationsForUser
);

// Routes alternatives pour l'utilisateur connecté (sans spécifier l'user_id)

/**
 * @swagger
 * /api/cars/my-cars/compatible-parts:
 *   get:
 *     summary: Get compatible parts for the authenticated user's cars
 *     tags: [Car Compatibility]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of compatible parts for authenticated user's cars
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompatiblePartsResponse'
 *       404:
 *         description: No cars found for authenticated user
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.get('/my-cars/compatible-parts', 
  isAuthenticated, 
  carController.getCompatiblePartsForUser
);

/**
 * @swagger
 * /api/cars/my-cars/shops:
 *   get:
 *     summary: Get shops that sell parts for the authenticated user's cars
 *     tags: [Car Compatibility]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of shops selling compatible parts for authenticated user's cars
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShopsResponse'
 *       404:
 *         description: No cars found for authenticated user
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.get('/my-cars/shops', 
  isAuthenticated, 
  carController.getShopsForUserCars
);

/**
 * @swagger
 * /api/cars/my-cars/recommendations:
 *   get:
 *     summary: Get part recommendations for the authenticated user's cars
 *     tags: [Car Compatibility]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of items per page
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filter by part category ID
 *     responses:
 *       200:
 *         description: Paginated list of recommended parts for authenticated user's cars
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecommendationsResponse'
 *       404:
 *         description: No cars found for authenticated user
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.get('/my-cars/recommendations', 
  isAuthenticated, 
  carController.getPartRecommendationsForUser
);

/**
 * @swagger
 * /api/cars/{carId}/compatible-parts:
 *   get:
 *     summary: Get compatible parts for a specific car
 *     tags: [Car Compatibility]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: carId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Car ID to get compatible parts
 *     responses:
 *       200:
 *         description: List of compatible parts for the specified car
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 car:
 *                   $ref: '#/components/schemas/Car'
 *                 compatible_parts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CompatiblePart'
 *                 total_parts:
 *                   type: integer
 *       404:
 *         description: Car not found
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.get('/:carId/compatible-parts', 
  isAuthenticated, 
  carController.getCompatiblePartsForCar
);

// ================================================================
// ROUTES CRUD BASIQUES (à placer APRÈS les routes spécifiques)
// ================================================================

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: List of all cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */
router.get('/', carController.getAllCars);

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - make
 *               - model
 *               - year
 *               - user_id
 *               - engineId
 *             properties:
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               engineId:
 *                 type: integer
 *             example:
 *               make: "Honda"
 *               model: "Civic"
 *               year: 2019
 *               user_id: 2
 *               engineId: 1
 *     responses:
 *       201:
 *         description: Car created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Invalid input
 */
router.post('/', carController.createCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Get a car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the car to retrieve
 *     responses:
 *       200:
 *         description: Car details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 */
router.get('/:id', carController.getCarById);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Car ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               engineId:
 *                 type: integer
 *             example:
 *               make: "Ford"
 *               model: "Focus"
 *               year: 2018
 *               user_id: 2
 *               engineId: 3
 *     responses:
 *       200:
 *         description: Car updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 */
router.put('/:id', carController.updateCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Car ID to delete
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 */
router.delete('/:id', carController.deleteCar);

module.exports = router;