const server = require('./api/server');

const port = 9000;

server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})

// START YOUR SERVER HERE
