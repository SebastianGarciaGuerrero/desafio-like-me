require('dotenv').config()
const cors = require('cors')
const express = require('express')
const {
  createPost,
  readPosts,
  readPost,
  updatePost,
  deletePost
} = require('../utils/pg')

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/posts', async (_, res) => {
  const posts = await readPosts()
  res.json(posts)
})

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params
  const post = await readPost(id)
  res.json(post)
})

app.post('/posts', async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body
  const newPost = await createPost(titulo, img, descripcion, likes)
  res.json(newPost)
})

app.put('/posts/:id', async (req, res) => {
  updatePost(req.params.id, req.body)
    .then((result) => res.status(result?.code ? 500 : 200).json(result))
    .catch((error) => res.status(500).json(error))
})

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params
  await deletePost(id)
  res.json({ message: 'Post eliminado' })
})

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'Not Found' }))

app.listen(PORT, () => console.log(`Server listo: http://localhost:${PORT}`))
