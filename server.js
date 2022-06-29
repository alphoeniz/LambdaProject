const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser'); 
const session = require('express-session');
const{v4:uuidv4} = require('uuid');

const router = require('./router');

const port = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine', 'ejs');

//load static assets
app.use('/static', express.static(path.join(__dirname, 'public')))  
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

app.use('/route',router);

//home route
app.get('/', (req, res) => {
    res.render('base', {title : "Dating in the Dark"}); 
})

app.listen(port, () => {console.log("Listening to the server on port 3000")});

const io = require('socket.io')(process.env.PORT || 8000, {
    cors: {
      origin: '*',
    }
});

const users = {};

io.on('connection', socket =>{
	socket.on('new-user-joined', username =>{
		users[socket.id] = username;
		socket.broadcast.emit('user-joined', username);
	});
	
	socket.on('send', message =>{
		socket.broadcast.emit('receive', {message: message, username: users[socket.id]})
	});

	socket.on('disconnect', message =>{
		socket.broadcast.emit('leave', users[socket.id])
		delete users[socket.id];
	});
})