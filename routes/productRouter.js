import { Router } from 'express'
import { productController } from '../controllers/productController.js'

export const productRoutes = () => {
  const productRouter = Router()
  const { getProduct, getProductById, createdProduct, updateProduct, deleteProduct } = productController()

  productRouter.route('/product')
    .get(getProduct)
    .post(createdProduct)

  productRouter.route('/product/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct)

  return productRouter
}
