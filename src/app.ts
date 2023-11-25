import express from 'express'
import cors from 'cors';
import userRouter from './app/user/user.route';
const app = express()

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/users',userRouter);

export default app;