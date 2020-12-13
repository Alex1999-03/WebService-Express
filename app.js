const express = require('express');
const product = require('./routes/product');
const morgan = require('morgan');

const app = express();  
const port = 3000;

app.use(express.json());

app.use(morgan('dev'));

app.use('/product', product);

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
})

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});