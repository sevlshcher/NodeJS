const http = require('http')
const pid = process.pid
require('dotenv').config()

http
    .createServer((req, res) => {
        if (req.url !== '/favicon.ico' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            let date = new Date(),
                dateUTC = date.toUTCString(),
                count = 0

            const timer = setInterval(() => {
                count++
                console.log(`${count}. Current date: ${dateUTC}`)
                if (+new Date() - date.getTime() >= process.env.TIME_OUT) {
                    clearInterval(timer)
                    res.end(`Breakin time: ${dateUTC}`)
                }
            }, process.env.TIME_INT)
        }
    })
    .listen(8080, () => {
        console.log(`Server started. Pid: ${pid}`)
})