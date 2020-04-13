const express = require('express')
const usersController = require('./controllers/users')
const diapersController = require('./controllers/diapers')
const feedingsController = require('./controllers/feedings')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')
const app = express()
const port = process.env.SERVER_PORT
const User = require('./models/user')
const LocalStrategy = require('passport-local').Strategy
const MongoDBStore = require('connect-mongodb-session')(session)
const cors = require('cors')
require('dotenv').config

const corsOptions = {
    origin: `${process.env.CLIENT_PROTOCOL}://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
    credentials: true
}

app.use(cors(corsOptions))

const connectWithRetry = () => {
    mongoose.connect(`${process.env.DB_PROTOCOL}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
            console.log('MongoDB connection successful')
        }).catch(err => {
            console.log('MongoDB connection unsuccessful, retrying after 5 seconds... ' + err)
            setTimeout(connectWithRetry, 5000)
        })
}

connectWithRetry()

const store = new MongoDBStore({
    uri: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    collection: process.env.SESSION_DB_COLLECTION_NAME
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
    secret: process.env.SESSION_SECRET,
    cookie: {
        // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false
    },
    store: store, resave: true, saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    console.log("Path: " + req.path)
    console.log("Method: " + req.method)
    next()
})

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
app.get('/diapers/:username', (req, res) => {
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