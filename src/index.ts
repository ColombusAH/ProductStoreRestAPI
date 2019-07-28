import { app } from './app';

app.listen(app.get('port'), () => {
  console.log(`Server is listennig on http://localhost:${app.get('port')}/`);
});
``