import { Book } from "../models/book.models.js";

export const uploadBook = async (req, res) => {
    try {
        const newBook = new Book({
            title: req.body.title,
        })
        await newBook.save()
        res.status(201).json({
            success: true,
            message: 'Book uploded successfully!',
            data: newBook
        })
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

export const getAllBook = async (req, res) => {
    try {
        const books = await Book.find()
        res.status(201).json({
            success: true,
            books
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book Not Found!'
            })
        }
        res.json({
            success: true, data: book
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

export const updateBook = async (req, res) => {
    try {
        const updateData = { title: req.body.title }
        if (req.file) {
            updateData.coverImage = `/uploads/${req.file.filename}`
        }
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true })
        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }
        res.json({ success: true, message: 'book updated', data: updatedBook })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

export const deleteBook = async (req, res) => {
    try {
        const deleteBook = await Book.findByIdAndDelete(req.params.id)
        if (!deleteBook) {
            return res.status(404).json({
                success: false,
                message: 'book not found'
            })
        }
        res.json({
            success: true,
            message: 'book deleted successfully!'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}