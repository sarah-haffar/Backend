/**
 * @swagger
 * /api/search/{model}:
 *   get:
 *     summary: Search records in a specific model
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: model
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
const express = require('express');
const router = express.Router();
const db = require('../models');
const searchableModels = require('../config/searchableModels');

router.get('/search/:model', async (req, res) => {
  const { model } = req.params;
  const { q } = req.query;

  if (!q) return res.status(400).json({ error: 'Missing search query (?q=)' });

  const columns = searchableModels[model];

  if (!columns) {
    return res.status(404).json({ error: `Model '${model}' is not searchable.` });
  }

  // Whitelist table names to prevent SQL injection
  const allowedModels = Object.keys(searchableModels);
  if (!allowedModels.includes(model)) {
    return res.status(403).json({ error: 'Access denied to this model' });
  }

  const whereClause = columns.map(col => `${col} LIKE :query`).join(' OR ');

  try {
    const results = await db.sequelize.query(
      `SELECT * FROM ${model} WHERE ${whereClause} LIMIT 50`,
      {
        replacements: { query: `%${q}%` },
        type: db.Sequelize.QueryTypes.SELECT,
      }
    );
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
