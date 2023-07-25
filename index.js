import express from 'express'
import BOOKS_FROM from './data.js'
import dotenv from 'dotenv'
import { bookRoutes } from './routes/bookRouter.js'
import errorHandler from './middlewares/errorHandler.js'
import { addInitialTime } from './middlewares/petitionTime.js' // tengo que usarlo donde empieza mi servidor
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json()) 
// antes de entrar a la logica del roter antes del controlador por que las rutas me llevan al contrrolador
app.use(addInitialTime)
app.use('/api', bookRoutes(BOOKS_FROM))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`el servidor se levanto  ${PORT}!`)
})
