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
    }, []
  )

  if(isLoading){
    return (
      <div className='App App-container'>
        <p style={ {color: '#fff'} }>... Cargando </p>
      </div>
    )
  }

  return (
    <div className="App">
      <section className="App-container">
        <h3> Cuadro de medallas </h3>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th></th>
              <th>Oro | <br /></th>
              <th>Plata | <br /></th>
              <th>Bronce | <br /></th>
              <th>Total</th>
            </tr>
          </tbody>
          
            {
              countries.map(country => {
                const {medals: [{gold, silver, bronze}]} = country;
                return(
                  <tbody key={country.id}>
                    <tr>
                      <th>{ country.flag }</th>
                      <th>{ country.name }</th>
                      <th>{ gold }</th>
                      <th>{ silver }</th>
                      <th>{ bronze }</th>
                      <th>{ gold + silver + bronze }</th>
                    </tr>
                  </tbody>
                )
              })
            }

        </table>
      </section>
    </div>
  );
}

export default App;
