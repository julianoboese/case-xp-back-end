import app from './app';

const port = process.env.PORT || 3000;

app.server.listen(port, () => console.log(`listening on port ${port}!`));
