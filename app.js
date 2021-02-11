//подключаем express
const express = require('express');
//Подключаем пакет config (для работы с константами)
const config = require('config');
//Подключаем пакет mongoose что бы подключится к mongoDB
const mongoose = require('mongoose');
const path = require('path');

//Переменная app результат работы функции express(), то есть это наш будущий сервер
const app = express();
//body->json
app.use(express.json({ extended: true}));

app.use('/api/admin', require('./routes/admin.routes'))
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/locations', require('./routes/locations.route'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 4300;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start();
