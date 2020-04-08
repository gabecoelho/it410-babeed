const express = require('express')
const Enforcer = require('openapi-enforcer-middleware')
const path = require('path')
const usersController = require('./controllers/users')
const diapersController = require('./controllers/diapers')
const feedingsController = require('./controllers/feedings')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const app = express()
const port = 8081
const User = require('./models/user')
var MongoDBStore = require('connect-mongodb-session')(session);

var corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

mongoose.connect('mongodb://localhost:27017/babeed', { useUnifiedTopology: true, useNewUrlParser: true })
const connection = mongoose.connection

connection.once('open', () => {
    console.log("MongoDB connection established.")
});

var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/babeed',
    collection: 'sessions'
});

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        User.findOne({ email: email }, async (err, user) => {
            if (err) { return done(err) }
            if (!user) {
                return done(null, false, { message: 'Incorrect credentials.' });
            }
            const match = await usersController.validatePwd(password, user.password)
            if (!match) {
                return done(null, false, { message: 'Incorrect credentials.' });
            }
            return done(null, user);
        });
    } catch (error) {
        console.log(error)
        return done(null, false)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, { user: user })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    secret: "in pheenax not family the",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        // domain: '127.0.0.1:8080'
        secure: false
    },
    store: store, resave: true, saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

const controllerDirectory = path.resolve(__dirname, 'controllers')
const mockDirectory = path.resolve(__dirname, 'mock-controllers')
const pathToOpenApiDoc = path.resolve(__dirname, 'babeed_api.yaml')

const enforcer = Enforcer(pathToOpenApiDoc)

// Task 2 - Middleware that all requests go through
app.use((req, res, next) => {
    console.log("Path: " + req.path)
    console.log("Method: " + req.method)
    // console.log(req.body)
    next()
})

// Handle all mock requests
// enforcer.mocks(mockDirectory, false)
//     .catch(console.error)

// // Handle all real requests
// enforcer.controllers(controllerDirectory)
//     .catch(console.error)

// // Fallback handler if the controller does not provide a response
// enforcer.mocks(mockDirectory, true)
//     .catch((err) => { console.log(err) })

// // User enforcer middleware
// app.use(enforcer.middleware())

// // Error handling middleware
// app.use((err, req, res, next) => {
//     // If the error was in the client's request then send back a detailed report
//     if (err.statusCode >= 400 && err.statusCode < 500 && err.exception) {
//         res.set('Content-Type', 'text/plain')
//         res.status(err.statusCode)
//         res.send(err.message)
//     } else {
//         console.error(err.stack)
//         res.sendStatus(err.statusCode || 500)
//     }
// })


// HTTP Handlers
// Users
app.post('/users', usersController.addUser)
app.put('/users', passport.authenticate('local'), async (req, res) => {
    let user = await usersController.getUserByEmail(req.body.email)
    if (user)
        res.status(200).send({ name: user[0].name, email: user[0].email, username: user[0].username })
    else
        res.status(401)
})
app.delete('/users', usersController.logout)

// Diapers
// app.get('/diapers/:id', (req, res) => {
//     if (!req.user) return res.sendStatus(401);
//     diapersController.getDiaperById(req, res)
// })
// app.get('/diapers', (req, res) => {
//     if (!req.user) return res.sendStatus(401);
//     diapersController.getDiapers(req, res)
// })
app.get('/diapers/:user', (req, res) => {
    if (!req.user) return res.sendStatus(401);
    diapersController.getDiapersByUser(req, res)
})
app.post('/diapers', (req, res) => {
    if (!req.user) return res.sendStatus(401);
    diapersController.addDiaper(req, res)
})
app.put('/diapers/:id', (req, res) => {
    if (!req.user) return res.sendStatus(401);
    diapersController.updateDiaperById(req, res)
})
app.delete('/diapers/:id', (req, res) => {
    if (!req.user) return res.sendStatus(401);
    diapersController.deleteDiaperById(req, res)
})

// Feedings
// app.get('/feedings/:id', (req, res) => {
//     if (!req.user) return res.sendStatus(401);
//     feedingsController.getFeedingById(req, res)
// })
// app.get('/feedings', (req, res) => {
//     if (!req.user) return res.sendStatus(401);
//     feedingsController.getFeedings(req, res)
// })
app.get('/feedings/:username', (req, res) => {
    if (!req.user) return res.sendStatus(401);
    feedingsController.getFeedingsByUser(req, res)
})
app.post('/feedings', (req, res) => {
    if (!req.user) return res.sendStatus(401);
    feedingsController.addFeeding(req, res)
})
app.put('/feedings/:id', (req, res) => {
    if (!req.user) return res.sendStatus(401);
    feedingsController.updateFeedingById(req, res)
})
app.delete('/feedings/:id', (req, res) => {
    if (!req.user) return res.sendStatus(401);
    feedingsController.deleteFeedingById(req, res)
})

const listener = app.listen(port, err => {
    if (err) return console.error(err.stack)
    console.log('Server listening on port ' + listener.address().port)
})

app.use((err, req, res, next) => {
    console.log(err)
    next(err)
})