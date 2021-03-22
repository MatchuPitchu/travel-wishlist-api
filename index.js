import express from 'express';
import {
  getAllCountries,
  createCountry,
  getSingleCountry,
  updateCountry,
  deleteCountry
} from './controllers/countries.js';

const port = process.env.PORT || 5000;
const app = express();
// set express.json() as a global middleware
app.use(express.json());
app.get('/', (req, res) => res.send('Hello'));

/* app.get('/api/countries', getAllCountries);
app.post('/api/countries', createCountry); */

app.route('/api/countries').get(getAllCountries).post(createCountry);
app.route('/api/countries/:code').get(getSingleCountry).put(updateCountry).delete(deleteCountry);

app.listen(port, () => console.log(`Server running in port ${port}`));
