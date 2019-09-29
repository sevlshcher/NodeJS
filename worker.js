const http = require('http')
const moment = require('moment')
const pid = process.pid
require('dotenv').config()

http
    .createServer((req, res) => {
        if (req.url !== '/favicon.ico') {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            
            let utc = moment.utc().format('YYYY/MM/DD , HH:mm:ss')
            let count = 0

            const myFunc = () => {
                console.log(`Current date: ${utc}`)
                count++
                if (count === process.env.TIME_OUT / 1000) {
                    clearInterval(timer)
                    res.end(`Breakin time: ${utc}`)
                }
            }
            const timer = setInterval(myFunc, process.env.TIME_INT)
        }
    })
    .listen(8080, () => {
        console.log(`Server started. Pid: ${pid}`)
})