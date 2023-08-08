import { Router } from 'express' // inicializams el router que nos da express
import { userController } from '../controllers/userController.js'
// odo los que sea app lo pasamos a las router para terner codigo mas ordenado
export const userRoutes = () => {
  const userRouter = Router()
  const { getUser, getUserById, createdUser, updateUser, deleteUser } = userController()

  userRouter.route('/')
    .get(getUser)
    .post(createdUser)

  userRouter.route('/users/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

  return userRouter
}
