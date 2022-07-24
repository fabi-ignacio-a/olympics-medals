import logo from './logo.svg';
import './App.css';

import 
  React,
  { 
    useState,
    useEffect  
  }
from 'react';

const URL = 'http://localhost:4000/countries';

function App() {

  const [countries, setCountries] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
        const fetchCountries = async() => {
        const response = await fetch(URL);
        const countries = await response.json();
        console.log(countries);
        setCountries(countries);
        setIsLoading(false);
      }
      fetchCountries();
    }, [])

  if(isLoading){
    return <p>... Loading</p>
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3> Cuadro de medallas </h3>
        <div>
        {
            countries.map(country => (
              <p key = {country.id}> {country.name} </p>
            ))
          }
        </div>
      </header>
    </div>
  );
}

export default App;
