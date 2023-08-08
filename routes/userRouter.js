import { Router } from 'express'
import { userController } from '../controllers/userController.js'

export const userRouter = () => {
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
