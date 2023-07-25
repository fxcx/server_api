import { v4 as uuid } from 'uuid'
import httpStatus from '../helpers/httpStatus.js'
import { getPetitionTime } from '../middlewares/petitionTime.js'

export const bookController = (BOOKS) => {
  const getBooks = (_, res) => {
    return res.json(BOOKS)
  }
  try {
    const { initialTime } = req
    console.log(`la solicitud demoro: ${getPetitionTime(initialTime)}ms`);
    return res.json(BOOKS)

  } catch (error) {

  } finally {

  }

  const getBookById = (req, res) => {
    const { id } = req.params
    const book = BOOKS.find((book) => book.id === id)
    if (!book) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Book not found' })
    }
    return res.status(httpStatus.OK).json(book)
  }

  const createBook = (req, res, next) => {
    const newBook = req.body
    const books = structuredClone(BOOKS)
    try {
      if (!newBook.title) {
        throw new Error('Title is required')
      }
      if (!newBook.author) {
        throw new Error('Author is required')
      }
      books.push({
        id: uuid(),
        ...newBook
      })
      return res.status(httpStatus.CREATED).json(books)
    } catch (error) {
      next(error)
    } finally {
      console.log('This will always run')
    }
  }

  const updateBook = (req, res) => {
    const { id } = req.params
    const books = structuredClone(BOOKS)
    const book = books.find((book) => book.id === id)
    if (!book) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: 'Book not found' })
    }
    const updatedBook = req.body
    const index = books.indexOf(book)
    books.splice(index, 1, { id: book.id, ...updatedBook })
    return res.status(httpStatus.OK).json(books)
  }

  const deleteBook = (req, res) => {
    const { id } = req.params
    const books = structuredClone(BOOKS)
    const book = books.find((book) => book.id === id)
    if (!book) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Book not found' })
    }
    const index = books.indexOf(book)
    books.splice(index, 1)
    return res.status(httpStatus.OK).json(books)
  }

  return {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
  }
}
