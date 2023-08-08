import { prisma } from '../database/database.js'
import httpStatus from 'http-status'

export const pedidoController = () => {
  const createPedido = async (req, res, next) => {
    try {
      const { estado, total, metodoPago, clientId, productos } = req.body
      const pedido = await prisma.pedido.create({
        data: {
          estado,
          total,
          metodoPago,
          client: {
            connect: { id: clientId }
          },
          productos: {
            connect: productos.map(producto => ({ id: producto }))
          }
        }
      })
      res.status(httpStatus.CREATED).json(pedido)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getAllPedidos = async (_req, res, next) => {
    try {
      const pedidos = await prisma.pedido.findMany({
        include: {
          client: true,
          productos: true
        }
      })
      res.json(pedidos)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getPedidoById = async (req, res, next) => {
    try {
      const { id } = req.params
      const pedido = await prisma.pedido.findUnique({
        where: {
          id: Number(id)
        },
        include: {
          client: true,
          productos: true
        }
      })
      if (!pedido) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: "Pedido not found" })
      }
      res.json(pedido)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updatePedido = async (req, res, next) => {
    try {
      const { id } = req.params
      const { estado, total, metodoPago, productos } = req.body
      const updatedPedido = await prisma.pedido.update({
        where: {
          id: Number(id)
        },
        data: {
          estado,
          total,
          metodoPago,
          productos: {
            set: productos.map(producto => ({ id: producto }))
          }
        },
        include: {
          client: true,
          productos: true
        }
      })
      res.json(updatedPedido)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deletePedido = async (req, res, next) => {
    try {
      const { id } = req.params
      await prisma.pedido.delete({
        where: {
          id: parseInt(id)
        }
      })
      res.sendStatus(httpStatus.NO_CONTENT)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    createPedido,
    getAllPedidos,
    getPedidoById,
    updatePedido,
    deletePedido
  }
}
