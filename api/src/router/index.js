import locationRouter from './locationRouter';
import userRouter from './userRouter';

export default (app) => {
  app.get('/api/v1/', (req, res) => {
    res.json({ message: 'Cub Api yo!' });
  });

  app.use('/api/v1/', locationRouter);
  app.use('/api/v1/', userRouter);
};
