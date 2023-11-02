// Create web server

// Import dependencies
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Import data
const comments = require('../data/comments')

// Create server
const app = express()

// Add middleware
app.use(cors())
app.use(bodyParser.json())

// Create route handlers
app.get('/', (request, response) => {
  response.json({ data: comments })
})

app.get('/:id', (request, response) => {
  const id = Number(request.params.id)
  const comment = comments.find(comment => comment.id === id)

  if (!comment) {
    response.status(404).json({
      error: {
        message: 'Comment not found'
      }
    })
  }

  response.json({ data: comment })
})

app.post('/', (request, response) => {
  const { body } = request
  const lastId = comments[comments.length - 1].id
  const newComment = {
    id: lastId + 1,
    ...body
  }

  comments.push(newComment)

  response.json({ data: newComment })
})

app.put('/:id', (request, response) => {
  const id = Number(request.params.id)
  const { body } = request
  const comment = comments.find(comment => comment.id === id)

  if (!comment) {
    response.status(404).json({
      error: {
        message: 'Comment not found'
      }
    })
  }

  const updatedComment = {
    id,
    ...body
  }

  const index = comments.indexOf(comment)
  comments[index] = updatedComment

  response.json({ data: updatedComment })
})

app.delete('/:id', (request, response) => {
  const id = Number(request.params.id)
  const comment = comments.find(comment => comment.id === id)

  if (!comment) {
    response.status(404).json({
      error: {
        message: 'Comment not found'
      }
    })
  }

  const index = comments.indexOf(comment)
  comments.splice(index, 1)

  response.json({ data: comment })
})

// Export server
module.exports = app