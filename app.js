require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
})
const errorMiddleware = require('./middlewares/error')
const CollectionRoute = require('./routes/CollectionRoute')
const CreatorRoute = require('./routes/CreatorRoute')
const QuestionRoute = require('./routes/QuestionRoute')
const QuizRoute = require('./routes/QuizRoute')
const UserRoute = require('./routes/UserRoute')
const UserHistory = require('./routes/UserHistoryRoute')
const PointRecord = require('./routes/PointRecordRoute')

// const { sequelize } = require('./models')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/collection', CollectionRoute)
app.use('/creator', CreatorRoute)
app.use('/question', QuestionRoute)
app.use('/quiz', QuizRoute)
app.use('/user', UserRoute)
app.use('/userhistory', UserHistory)
app.use('/pointrecord', PointRecord)

app.use((req, res, next) => {
  res.status(404).json({ message: 'path not found on this server' })
})

app.use(errorMiddleware)

// sequelize.sync({ force: true}).then(() => console.log('DB sync'))

const rooms = [] // [ 'id1', 'id2']
const allPlayers = {}

//  'id1': {
//         players: [{id, name, score}, {id, name, score}]
//         quiz: {
//             [player.id]: {
//                 1: 1
//             }
//         }
//     },
//     'id2': {
//         players: ['eieiza']
//     }
// }

io.on('connection', (socket) => {
  console.log(socket.id, 'is now connect')

  socket.on('create_lobby', (pin) => {
    console.log('creator', pin, socket.id)
    rooms.push(pin)
    allPlayers[pin] = { players: [], quiz: {} }
    socket.join(`play_room_${pin}`)
    //change status(database): inactive >> waiting
    console.log('rooms', rooms)
    console.log('all players', allPlayers)
  })

  // socket.on('hello', (arg) => {
  //   console.log('name', arg)
  // })

  socket.on('player_joined', (input) => {
    const player = {
      id: socket.id,
      name: input.name,
      scores: 0
    }

    allPlayers[input.pin].players.push(player)
    console.log(allPlayers)
    console.log(allPlayers[input.pin].players)

    socket.join(`play_room_${input.pin}`)

    socket.to(`play_room_${input.pin}`).emit('show_players', player)
  })

  socket.on('start_quiz', (data) => {
    if (data.status === 'start') {
      socket.to(`play_room_${data.pin}`).emit('player_start', data.status)
      socket.to(`play_room_${data.pin}`).emit('question_to_player', data.squizz)
    }
  })

  socket.on('answer_question', (data) => {
    allPlayers[input.pin].quiz = {}
    socket.to(`play_room_${data.pin}`).emit('player_start', data.status)
  })

  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnected')
  })
})

io.of('/').adapter.on('create-room', (room) => {
  console.log(`room ${room} was created`)
})

io.of('/').adapter.on('join-room', (room, id) => {
  console.log(`socket ${id} has joined room ${room}`)
})

const port = process.env.PORT
http.listen(port, () => console.log(`server is running on port ${port}`))
