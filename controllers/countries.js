import { v4 as uuidv4 } from 'uuid';

const countries = [
  { id: 1, name: 'Mexico', alpha2Code: 'MX', alpha3Code: 'MEX' },
  { id: 2, name: 'Kazakhstan', alpha2Code: 'KZ', alpha3Code: 'KAZ' },
  { id: 3, name: 'Heard Island and McDonald Islands', alpha2Code: 'HM', alpha3Code: 'HMD' }
];

export const getAllCountries = (req, res) => {
  const { sort } = req.query;
  console.log(sort);
  if (sort) {
    const newArr = [...countries];
    const sortedArr = newArr.sort((a, b) => a.name.localeCompare(b.name));
    res.json(sortedArr);
  } else {
    res.json(countries);
  }
};

export const createCountry = (req, res) => {
  const { id, alpha2Code, alpha3Code } = req.body;
  if (id) return res.status(400).json({ message: 'Bad request' });
  const found = countries.find(country => country.alpha2Code === alpha2Code || country.alpha3Code === alpha3Code);
  if (found) {
    res.status(401).json({ message: 'The country already exists' });
  } else {
    const newCountry = { id: uuidv4(), ...req.body };
    countries.push(newCountry);
    res.status(201).json(newCountry);
  }
};

export const getSingleCountry = (req, res) => {
  const { code } = req.params;
  const found = countries.find(country => country.alpha2Code === code || country.alpha3Code === code);
  if (found) {
    res.json(found);
  } else {
    res.status(404).json({ message: 'Country does not exist' });
  }
};

export const updateCountry = (req, res) => {
  const { id } = req.body;
  if (id) return res.status(400).json({ message: 'Bad request' });
  const { code } = req.params;
  const found = countries.find(
    country => country.alpha2Code === code || country.alpha3Code === code || country.id === code
  );
  if (found) {
    countries.forEach(country =>
      country.alpha2Code === found.alpha2Code || country.alpha3Code === found.alpha3Code
        ? { id: found.id, ...req.body }
        : country
    );
    res.status(200).json({ id: found.id, ...req.body });
  } else {
    res.status(404).json({ message: 'Country does not exist' });
  }
};

export const deleteCountry = (req, res) => {
  res.send('delete');
};
