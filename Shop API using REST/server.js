const http = require('http');
const port = process.env.PORT || 4040;
const app = require('./app');
const { log } = require('console');
const server = http.createServer(app);
app.listen(port ,() => {
    console.log(`Server is running on ${port}`);
})