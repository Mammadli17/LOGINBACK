const express = require('express');
const app = express();

const { db } = require('./CONFIG/db');
const { userRoutes } = require('./ROUTES/UserRoute');

app.use(express.json())
app.use('/api/user', userRoutes)

db.connect()


app.get('/',(req,res) => {
    res.send('OK')
})



app.listen(3000, () => {
    console.log('Server is running...');
})





