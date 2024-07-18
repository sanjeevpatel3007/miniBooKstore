
import express from 'express';
import { getBook, getBookById} from '../controller/book.controller.js';

 const router = express.Router();

 router.get('/', getBook);


// Route to get specific book by _id
router.get('/:id', getBookById);


 export default router;