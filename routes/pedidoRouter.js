import { Router } from 'express'
import { pedidoController } from '../controllers/pedidoController.js'

export const pedidoRouter = () => {
  const pedidoRouter = Router()
  const { getPedido, getPedidoById, createPedido, updatePedido, deletePedido } = pedidoController()

  pedidoRouter.route('/')
    .get(getPedido)
    .post(createPedido)

  pedidoRouter.route('pedido/:id')
    .get(getPedidoById)
    .put(updatePedido)
    .delete(deletePedido)

  return pedidoRouter
}
