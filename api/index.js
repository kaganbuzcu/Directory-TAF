import express from 'express';
import registerMiddlewares from './src/middlewares';
import registerRouter from './src/router';

const app = express();
const PORT = process.env.PORT || 8000;

registerMiddlewares(app);
registerRouter(app);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});