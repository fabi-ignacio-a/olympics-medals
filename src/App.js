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
  const [isError, setIsError] = useState(false);
  const [isEditMedals, setIsEditMedals] = useState({showForm: false, country: null});

  useEffect(
    () => {
        const fetchCountries = async() => {
        try{

          const response = await fetch(URL);
          const countries = await response.json();
          const sortCountries = await countries.sort( (a, b) => {
            return b.medals[0].gold  - a.medals[0].gold;
          })

          setCountries(sortCountries);
          setIsLoading(false);

        }catch (e){
          setIsError(true);
        }
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

  if(isError){
    return (
      <div className='App App-container'>
        <p style={ {color: '#fff'} }>... Algo malo ocurrió </p>
      </div>
    )
  }

  return (
    <div className="App">
      <section className="App-container">
        <h3> Cuadro de medallas </h3>
        <table width="800" border="1" cellPadding="1" cellSpacing="1">
          <tbody>
            <tr>
              <th></th>
              <th></th>
              <th>Oro <br /></th>
              <th>Plata <br /></th>
              <th>Bronce <br /></th>
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
                      <th 
                        onClick={ 
                          () => setIsEditMedals( {showForm: true, country} ) 
                        } 
                        className="edit-medals"
                        >
                        { country.name }
                        </th>
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

        <div className='medal-form-container'>
            {
              isEditMedals.showForm && 
              <>
              <div className='country-selecter-wrapper'>
              <span> { isEditMedals.country.flag } </span>
              <p> { isEditMedals.country.name } </p>
              </div>
              <form action= "" className='medal-form'>
                <div className='update-container'>
                  <label htmlFor=''>Oro: </label>
                  <input 
                  type="text" 
                  className='medal-input' 
                  value={ isEditMedals.country.medals[0].gold }
                  />
                </div>
                <div className='update-container'>
                  <label htmlFor=''>Plata: </label>
                  <input 
                  type="text" 
                  className='medal-input' 
                  value={ isEditMedals.country.medals[0].silver }
                  />
                </div>
                <div className='update-container'>
                  <label htmlFor=''>Oro: </label>
                  <input 
                  type="text" 
                  className='medal-input' 
                  value={ isEditMedals.country.medals[0].bronze }
                  />
                </div>
                <div className='update-container'>
                  <button className='update-btn'>
                    Actualizar
                  </button>
              </div>
              </form>
              </>
            }
        </div>

      </section>
    </div>
  );
}

export default App;
