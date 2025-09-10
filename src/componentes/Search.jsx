import React, { useState } from 'react';
import { getCountriesByName } from '../actions/getCountriesByName';

function Search() {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setCountries([]);
    try {
      const result = await getCountriesByName(query);
      setCountries(result);
    } catch (err) {
      setError('No se encontró el país');
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar país..."
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <p>{error}</p>}
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;