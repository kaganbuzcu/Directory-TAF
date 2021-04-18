import locationRouter from './locationRouter';
import subLocationRouter from './subLocationRouter';
import numberRouter from './numberRouter';

export default (app) => {
  app.get('/api/v1/', (req, res) => {
    res.json({ message: 'TAF Api yo!' });
  });

  app.use('/api/v1/', locationRouter);
  app.use('/api/v1/', subLocationRouter);
  app.use('/api/v1/', numberRouter);
};
