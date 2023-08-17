import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from "socket.io";
import viewsRouter from "./routes/views.js";

const app = express();

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/', viewsRouter);

const server = app.listen(8080, () => {
    console.log('Server ON')
})

const io = new Server(server)

let messages = [];

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on('message', data => {
        messages.push(data);
        io.emit('messageLogs', messages);
    })
})