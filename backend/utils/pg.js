require('dotenv').config()
const { Pool } = require('pg')
const { v4: uuidv4 } = require('uuid')

const config = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  allowExitOnIdle: true
}

const pool = new Pool(config)

const genericSqlQuery = (query, values) =>
  pool.query(query, values)
    .then(({ rows }) => rows)
    .catch(error => {
      console.error('Error en la consulta SQL:', error)
      throw error
    })

const createPost = async (titulo, img, descripcion, likes) => {
  const id = uuidv4()
  const query = 'INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4, $5) RETURNING *'
  const values = [id, titulo, img, descripcion, likes]
  return genericSqlQuery(query, values)
}

const readPosts = async () => {
  return genericSqlQuery('SELECT * FROM posts')
}

const readPost = async (id) => {
  const query = 'SELECT * FROM posts WHERE id = $1'
  return genericSqlQuery(query, [id])
}

const updatePost = async (id, { titulo, img, descripcion, likes }) => {
  const query = 'UPDATE posts SET titulo = $2 WHERE id = 41 RETURNIG *;'
  const values = [id, titulo, img, descripcion, likes]
  return await genericSqlQuery(query, values)
}

const deletePost = async (id) => {
  const query = 'DELETE FROM posts WHERE id = $1'
  return genericSqlQuery(query, [id])
}

module.exports = {
  createPost,
  readPosts,
  readPost,
  updatePost,
  deletePost
}
