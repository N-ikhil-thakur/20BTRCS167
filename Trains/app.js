require('dotenv').config();
require('express-async-errors');
// extra security packages 
const helmet = require('helmet');
// const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


const express = require('express');
const app = express();

// connect db 
const connectDB = require('./db/connect');

// routers 
const authRouter = require('./routes/auth');
const trainRouter = require('./routes/train')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy',1);
app.use(rateLimiter({
  windowMs:15 * 60 * 1000, // 15 minutes
  max:100, // limit each IP to 100 requests per windowMs
}))
app.use(express.json());
app.use(helmet());
// app.use(cors());
app.use(xss());
// extra packages

// routes
app.use('/train', authRouter);
app.use('/train', trainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {

    console.log('Connecting to DB ...');
    await connectDB(process.env.DATABASE_URL);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
      console.log(`http://localhost:${port} ...`);
    });

  } catch (error) {
    console.log(error);
  }
};

start();
