import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';

const port = 8080;
const app = express();
const httpServer = app.listen(port, () => console.log(`Server up on port: ${port}`));
const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', viewsRouter);

socketServer.on('connection', socket => {
    console.log('New client connected');

    socket.on('message', data => {
        console.log('Message from client: ', data);
    });

    socket.emit('For myself', 'This is a message for a single socket');
    socket.broadcast.emit('For everyone else', 'This is a message for everyone except the sender');
    socketServer.emit('For everyone', 'This is a message for everyone');

    socket.on('disconnect', () => console.log('Client disconnected'));
});