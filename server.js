import express from 'express'
import userRouter from './routes/user.route.js'
import listingRouter from './routes/listing.route.js'
const app = express();
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello World!');
}
);

app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRouter);
app.use('/api/listings', listingRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
