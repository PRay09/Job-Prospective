require('dotenv').config();
require('express-async-errors');
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended:false})

const connectDB= require('./db/connect')

const authenticateUser = require('./middleware/authentication')

const authRouter = require ('./routes/auth')
const jobRouter = require ('./routes/jobs')
const commRouter = require('./routes/comments')

app.set('trust proxy' , 1);
app.use(rateLimiter({
  windowMs: 15*60*1000,
  max:100,
}))

app.use(express.static('./publiic'));
app.use('/register',express.static('./Reg'))
app.use('/jobs',express.static('./jobs'))
app.use('/jobs/singlejob',express.static('./singlejob'))
app.use('/jobsOther',express.static('./jobsother'))
app.use('/search',express.static('./search'))

app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(xss())
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticateUser,jobRouter)
app.use('/api/v1/comments',authenticateUser,commRouter)
app.use('/api/v1',authRouter)
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const { application } = require('express');



// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
}); 
  
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MON_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
