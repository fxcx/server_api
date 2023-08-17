import httpStatus from '../helpers/httpStatus.js'
import { prisma } from '../database/database.js'

export const userController = () => {
  const createUser = async (req, res, next) => {
    try {
      const { firstName, lastName, email, password } = req.body // requiero los capos que necesito en este caso el body
      const user = await prisma.User.create({ // creo una constante / await asincrono / de prisma. axedo a mis disponibilades de la tabla
        data: { // data es lo que voy a guardar en mi tabla
          firstName,
          lastName,
          email,
          password
        }
      })
      res.status(httpStatus.CREATED).json(user) // de respuesta me da el status podria poner un msj si quisera
    } catch (error) {
      next(error) // pasa al siguiete error con next
    } finally {
      await prisma.$disconnect()
    }
  }

  const getUser = async (_req, res, next) => {
    try { // asi nos aseguramos de manejar los errores
      const users = await prisma.User.findMany() // si yo quiero leer los libros de la base de datos tengo que guardarla en una variable
      res.status(httpStatus.OK).json(users) // status de mi carpeta helpper y me devuelve los users que me trajo findMany()
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }
  const getUserById = async (req, res, next) => {
    try {
      const { id } = req.params // traigo el id del req.params
      const user = await prisma.User.findUnique({ // obtengo el id del userio
        where: {
          id: Number(id) // donde el id es un number
        }
      })
      res.status(httpStatus.OK).json(user) // de respuesta un status 200 y devolve el json.(user)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }
  const updateUser = async (req, res, next) => {
    try {
      const { id } = req.params
      const { firstName, lastName, email, password } = req.body
      const users = await prisma.User.update({
        where: { // no tenemos que olvidarnos el where
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
    } finally {
      await prisma.$disconnect()
    }
  }
  const deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params
      await prisma.User.delete({ // como no lo guardo en una variable
        where: { // por el bien de todos
          id: Number(id)
        }
      })
      res.status(httpStatus.OK).json({ success: true, message: 'delete user' }) // puedo dar un mensaje de respuesta
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
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
