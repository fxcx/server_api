import { Router } from 'express' // inicializams el router que nos da express
import { bookController } from '../controllers/bookController.js'
//todo los que sea app lo pasamos a las router para terner codigo mas ordenado
export const bookRoutes = () => { 
  const bookRouter = Router()
  const { getBooks, getBookById, createBook, updateBook, deleteBook } = bookController()

  bookRouter.route('/books')
    .get(getBooks)
    .post(createBook)

  bookRouter.route('/books/:id')
    .get(getBookById)
    .put(updateBook)
    .delete(deleteBook)

  return bookRouter
}
