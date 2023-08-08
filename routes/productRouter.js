import { Router } from 'express'
import { productController } from '../controllers/userController.js'

export const productRouter = () => {
  const userRouter = Router()
  const { getProduct, getProductById, createdProduct, updateProduct, deleteProduct } = productController()

  userRouter.route('/')
    .get(getProduct)
    .post(createdProduct)

  userRouter.route('/product/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct)
}
