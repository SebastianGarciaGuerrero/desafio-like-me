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

const genericSqlQuery = (query = '', values = []) => pool
    .query(query, values)
    .then(({ rows }) => rows)
    .catch(({ code, message }) => ({ code, message }))


const readPosts = async () => await genericSqlQuery('SELECT * FROM posts;')

const createPost = async ({ titulo, url: img, descripcion }) => {
    const query = 'INSERT INTO posts(id, titulo, img, descripcion) VALUES ($1, $2, $3, $4);'
    const values = [uuidv4(), titulo, img, descripcion]
    return await genericSqlQuery(query, values)
}

const updatePost = async (id, { titulo, url: img, descripcion }) => {
    const query = 'UPDATE posts set titulo = $2, img = $3, descripcion = $4 WHERE id = $1 RETURNING *;'
    const values = [uuidv4(), titulo, img, descripcion]
    return await genericSqlQuery(query, values)
}

const deletePost = async (id) => await genericSqlQuery('DELETE FROM posts WHERE id = $1 RETURNING *;', [id])

const updateLike = async (id) => {
    const query = `UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *;`
    return await genericSqlQuery(query, [id])
}


module.exports = {
    readPosts,
    createPost,
    updatePost,
    deletePost,
    updateLike
}