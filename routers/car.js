const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

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
 *         - userId
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
 *         userId:
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
 *         userId: 5
 *         engineId: 3
 */

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: API for managing cars
 */

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
 * /api/cars/user/{userId}:
 *   get:
 *     summary: Get all cars for a specific user
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: userId
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
router.get('/user/:userId', carController.getCarsByUserId);

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
 *               - userId
 *               - engineId
 *             properties:
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               engineId:
 *                 type: integer
 *             example:
 *               make: "Honda"
 *               model: "Civic"
 *               year: 2019
 *               userId: 2
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
 *               userId:
 *                 type: integer
 *               engineId:
 *                 type: integer
 *             example:
 *               make: "Ford"
 *               model: "Focus"
 *               year: 2018
 *               userId: 2
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
