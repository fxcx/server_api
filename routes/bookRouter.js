// vamos a empezar a separar el codigo tal como en el html no esten los escript en html
import { Router } from 'express' // inicializams el router que nos da express
import { bookController } from '../controllers/bookController.js'
//todo los que sea app lo pasamos a las router para terner codigo mas ordenado
export const bookRoutes = (BOOKS) => { 
  const bookRouter = Router()
  const { getBooks, getBookById, createBook, updateBook, deleteBook } = bookController(BOOKS)

  bookRouter.route('/books')
    .get(getBooks)
    .post(createBook)

  bookRouter.route('/books/:id')
    .get(getBookById)
    .put(updateBook)
    .delete(deleteBook)

  return bookRouter
}
