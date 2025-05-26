const http = require('http')

const PORT = 4090;

const server = http.createServer((req, res) => {
    res.write('Hello World')
    res.end()
})

server.listen(PORT, (err) => {
    if (err) {
        console.log('server not successfully start!!');
    }

    console.log('server successfully start!!');
})