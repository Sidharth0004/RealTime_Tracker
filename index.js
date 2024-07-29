const express = require('express');
const socketio = require('socket.io');
const http = require('http'); 
const path = require('path');



const app = express();
const server = http.createServer(app);
const io = socketio(server);  

app.set('view engine', 'ejs');
app.set(express.static(path.join(__dirname, '/public/')));
app.use(express.static("public"));

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('sendLocation', (data) => {
        // const { latitude, longitude } = data;
        io.emit('recive-location', { id: socket.id, ...data });
    });
    socket.on('disconnect', () => {
        io.emit('user-disconnected', socket.id);
        console.log('User disconnected');
    });
  
})



app.get('/', (req, res) => {
    res.render('index');
}   );

server.listen(3000, () => {
    console.log('Server is running on port 3000');
}   );

