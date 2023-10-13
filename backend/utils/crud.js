const express = require('express')
const db = require('./pg')
const { v4: uuidv4 } = require('uuid')
const router = express.Router()

router.post('/posts', async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body

  try {
    const id = uuidv4()
    const query = 'INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4, $5) RETURNING *'
    const values = [id, titulo, img, descripcion, likes]

    const result = await db.query(query, values)

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error al guardar el registro:', error)
    res.status(500).json({ error: 'Error al guardar el registro' })
  }
})

module.exports = router
