const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
// Routes
app.use('/api/users/register', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
