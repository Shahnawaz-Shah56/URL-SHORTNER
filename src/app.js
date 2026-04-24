const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user.route');
const urlRouter = require('./routes/url.route')

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', userRouter )
app.use('/api/url', urlRouter)


module.exports = app;

