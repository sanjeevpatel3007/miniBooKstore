
import Book from "../modal/book.modal.js";

export const getBook= async (req,res)=>{
 try {
    const book=await Book.find();
    res.status(200).json(book);
 } catch (error) {
    console.log("error  : " ,error);
    res.status(500).json(error);
 }

};


export const getBookById = async (req, res) => {
   try {
     const { id } = req.params;
     const book = await Book.findById(id);
     if (!book) {
       return res.status(404).json({ message: 'Book not found' });
     }
     res.status(200).json(book);
   } catch (error) {
     console.log("error  : ", error);
     res.status(500).json(error);
   }
 };


