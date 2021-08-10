import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  author: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['todo', 'doing', 'done'],
    default: 'todo',
    required: true,
  },
})

todoSchema.set('toJSON', {
  transform: (document: mongoose.Document, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model('Todo', todoSchema)
