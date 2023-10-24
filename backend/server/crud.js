require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { readPosts, createPost, updatePost, deletePost, updateLike } = require('../utils/pg')

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/posts', (_, res) => {
    readPosts()
      .then((posts) => res.status(200).json(posts))
      .catch((error) => next(error));
  })

  app.post('/posts', (req, res) => {
    const { titulo, url, descripcion } = req.body;
    createPost({ titulo, url, descripcion })
      .then((posts) => res.status(200).json(posts))
      .catch((error) => next(error));
  })

app.put('/posts/:id', (req, res) => {
    updatePost(req.params.id, req.body)
    .then((result) => res.status(result?.code ? 500 : 200).json(result))
    .catch((error) => res.status(500).json(error))
})

app.delete('/posts/:id', (req, res) => {
    deletePost(req.params.id)
    .then((result) => res.status(result?.code ? 500 : 200).json(result))
    .catch((error) => res.status(500).json(error))
})

//rutas likes

app.put('/posts/like/:id', (req, res) => {
    updateLike(req.params.id)
    .then((result) => res.status(result?.code ? 500 : 200).json(result))
    .catch((error) => res.status(500).json(error))
})



app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'La ruta no existe' }))

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))