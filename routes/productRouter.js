import { Router } from 'express'
import { productController } from '../controllers/userController.js'

export const productRouter = () => {
  const productRouter = Router()
  const { getProduct, getProductById, createdProduct, updateProduct, deleteProduct } = productController()

  productRouter.route('/')
    .get(getProduct)
    .post(createdProduct)

  productRouter.route('/product/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct)

  return productRouter
}
