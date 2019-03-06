// init project
import express from 'express'
import cors from 'cors'

const port = process.env.PORT || 3000
const app = express()

// enable CORS so that the API is remotely testable
app.use(cors({optionSuccessStatus: 200})) // some legacy browsers choke on 204

// get ip even if it's behind a proxy
app.set('trust proxy', true);

// API endpoint
app.get('/api/whoami', (req, res) => {
    res.json({
        ipaddress: req.ip,
        language: req.headers['accept-language'],
        software: req.headers['user-agent']
    })
})

// other routes
app.get('*', (req, res) => {
    res.redirect('/api/whoami')
})

// listen for requests
app.listen(port, () => {
    console.log(`Your api is listening on port ${port}`)
})