import { Router } from 'express'
import { userController } from '../controllers/userController.js'

export const userRouter = () => {
  const userRouter = Router()
  const { getUser, getUserById, createUser, updateUser, deleteUser } = userController()

  userRouter.route('/')
    .get(getUser)
    .post(createUser)

  userRouter.route('/users/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

  return userRouter
}
