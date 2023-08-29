import express from 'express'
import { userRoutes } from './routes/userRouter.js' // empiezo a separar codigpo, importo las rutas de los metodos
import { productRoutes } from './routes/productRouter.js' // importo la ruta
import { pedidoRouter } from './routes/pedidoRouter.js'
import errorHandler from './middlewares/errorHandler.js'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

// router
app.use('/api', userRoutes(), productRoutes(), pedidoRouter()) // la uso en el middelwere como end point que me va llevar a los controladores de cada ruta

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`el servidor se levanto  ${PORT}!`)
})
