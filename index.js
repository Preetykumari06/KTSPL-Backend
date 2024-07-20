const express = require('express');
const cors = require('cors');
const sequelize = require('./Backend/Config/db');
const userRouter = require('./Backend/Routes/UserRouter');
const categoryRouter = require('./Backend/Routes/CategoryRouter');

const PORT = process.env.PORT || 4050;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use("/categories", categoryRouter)

app.get('/', (req, res) => {
    res.send('Hello, Welcome!');
});


sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is Running on http://localhost:${PORT}`);
    });
});


