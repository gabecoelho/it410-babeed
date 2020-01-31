const express = require('express')
const Enforcer = require('openapi-enforcer-middleware')
const path = require('path')

const app = express()
const port = 8080
app.use(express.json())

const controllerDirectory = path.resolve(__dirname, 'controllers')
const mockDirectory = path.resolve(__dirname, 'mock-controllers')
const pathToOpenApiDoc = path.resolve(__dirname, 'babeed_api.yaml')

const enforcer = Enforcer(pathToOpenApiDoc)

// Task 2 - Middleware that all requests go through
app.use((req, res, next) => {
    console.log("Path: " + req.path)
    console.log("Method: " + req.method)

    if (req.method != "GET")
        req.secret = "I am your father."
    next()
})

// Handle all mock requests
enforcer.mocks(mockDirectory, false)
    .catch(console.error)

// Handle all real requests
enforcer.controllers(controllerDirectory)
    .catch(console.error)

// Fallback handler if the controller does not provide a response
enforcer.mocks(mockDirectory, true)
    .catch((err) => { console.log(err) })

// User enforcer middleware
app.use(enforcer.middleware())

// Error handling middleware
app.use((err, req, res, next) => {
    // If the error was in the client's request then send back a detailed report
    if (err.statusCode >= 400 && err.statusCode < 500 && err.exception) {
        res.set('Content-Type', 'text/plain')
        res.status(err.statusCode)
        res.send(err.message)
    } else {
        console.error(err.stack)
        res.sendStatus(err.statusCode || 500)
    }
})

const listener = app.listen(port, err => {
    if (err) return console.error(err.stack)
    console.log('Server listening on port ' + listener.address().port)
})