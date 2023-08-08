import httpStatus from '../helpers/httpStatus.js'
import { prisma } from '../database/database.js'

export const userController = () => {
  const createUser = async (req, res, next) => {
    try {
      const { firstName, lastName, email, password } = req.body
      const users = await prisma.User.create({
        data: {
          firstName,
          lastName,
          email,
          password
        }
      })
      res.status(httpStatus.CREATED).json(users)
    } catch (error) {
      next(error)
    }
  }

  const getUser = async (_req, res, next) => {
    try {
      const users = await prisma.User.findMany()
      res.status(httpStatus.OK).json(users)
    } catch (error) {
      next(error)
    }
  }
  const getUserById = async (req, res, next) => {
    try {
      const { id } = req.params
      const users = await prisma.User.findUnique({
        where: {
          id: Number(id)
        }
      })
      res.status(httpStatus.OK).json(users)
    } catch (error) {
      next(error)
    }
  }
  const updateUser = async (req, res, next) => {
    try {
      const { id } = req.params
      const { firstName, lastName, email, password } = req.body
      const users = await prisma.User.update({
        where: {
          id: Number(id)
        },
        data: {
          firstName,
          lastName,
          email,
          password
        }
      })
      res.status(httpStatus.OK).json(users)
    } catch (error) {
      next(error)
    }
  }
  const deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params
      const users = await prisma.User.delete({
        where: {
          id: Number(id)
        }
      })
      res.status(httpStatus.OK).json(users)
    } catch (error) {
      next(error)
    }
  }
  return {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  }
}
