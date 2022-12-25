import express from 'express';

const app = express();

const PORT = process.env.PORT ?? 3333;

app.listen(3333, () => {
  console.log(`Server is listening on port ${PORT}`);
});
