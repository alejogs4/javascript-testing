const express = require('express');
const cors = require('cors');

const app = express();
const taskHandlers = require('./handlers');
// const { getTotalPriceInCOP } = require('./basics')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

/**
 * Routes
 */
app.get('/tasks', taskHandlers.getAll);
app.get('/task/:id', taskHandlers.getById);
app.post('/task', taskHandlers.create);
app.put('/task', taskHandlers.update);
app.delete('/task/:id', taskHandlers.removeTask);

// getTotalPriceInCOP()
//   .then(resp => console.log(resp))
app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Running in http://localhost:3001');
});
