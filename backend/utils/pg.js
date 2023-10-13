const express = require('express')
const cors = require('cors')
const { Client } = require('pg')
const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

const db = new Client({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  allowExitOnIdle: true
})

db.connect()
  .then(() => {
    console.log('Conexión a PostgreSQL exitosa')
  })
  .catch((err) => {
    console.error('Error al conectar a PostgreSQL:', err)
  })

app.listen(PORT, () => console.log(`Server Up in port: ${PORT}`))
