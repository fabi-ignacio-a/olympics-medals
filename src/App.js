import logo from './logo.svg';
import './App.css';

import 
  React,
  { 
    useState,
    useEffect,
    //useReducer sirve para, en casos de useState muy complicados, hacerlo más sencillo de aplicar.
    useReducer  
  }
from 'react';
import UseFecthCountries from './hooks/UseFetchCountries';
import Button from './component/buttons';

const URL = 'http://localhost:4000/countries';

const medalsReducer = (state, action) => {
  switch(action.type){
    case 'EDIT_MEDALS':{
      return {
        ...state,
        isEditMedals: action.payload
      }
    }
    default:
      throw new Error();
  }
}

function App() {

  //Declaración de los state que se utilizan en este proyecto
  const [ { isLoading, isError, countries }, fetchCountries] = UseFecthCountries();
  const [onChangeMedal, setOnChangeMedal] = useState( { gold: '', silver: '', bronze: '' } );

  //Lógica del useReducer
  const [state, dispatch] = useReducer(medalsReducer, {
    isEditMedals: {
      showForm: false,
      country: null,
      didMedalUpdate: false
    }
  })

  //Definición de funciones y useEffect {Hooks}
  useEffect( () => {
      fetchCountries();  
    }, [state.isEditMedals.didMedalUpdate, fetchCountries]);

  const editMedals = (country) => {
    const { medals: [{gold, silver, bronze}] } = country;
    dispatch( { type: 'EDIT_MEDALS', payload: {showForm: true, country } } )
    setOnChangeMedal({gold, silver, bronze});
  };

  const handleInputChange = (event, keyName) => {
    event.persist();
    setOnChangeMedal((onChangeMedal) => {
      return { ...onChangeMedal, [keyName]: event.target.value }
    })
  };

  //Metodo para actualizar las medallas
  const updateMedales = async(id, country) => {
    const response = await fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(country)
    })

    await response.json();
    await dispatch( { type: 'EDIT_MEDALS', payload:{showForm: false, didMedalUpdate: true} } )
  };

  const onSubmitMedals = ((event, {country}, newMedals) => {
    const { gold, silver, bronze } = newMedals;
    updateMedales(country.id, {
      ...country, medals:[{
        gold: parseInt(gold),
        silver: parseInt(silver),
        bronze: parseInt(bronze)
      }]
    });
    event.preventDefault();
  });

  //Condicionales para mandar mensajes de "Cargando" y por si ocurre algún error
  if(isLoading){
    return (
      <div className='App App-container'>
        <p style={ {color: '#fff'} }>... Cargando </p>
      </div>
    )
  };

  if(isError){
    return (
      <div className='App App-container'>
        <p style={ {color: '#fff'} }>... Algo malo ocurrió </p>
      </div>
    )
  };

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
                        onClick = { () => editMedals(country) } 
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
              state.isEditMedals.showForm && 
              <>
              <div className='country-selecter-wrapper'>
              <span> { state.isEditMedals.country.flag } </span>
              <p> { state.isEditMedals.country.name } </p>
              </div>
              <form 
              className='medal-form'
              onSubmit = { (event) => onSubmitMedals(event, state.isEditMedals, onChangeMedal) }
              >
                <div className='update-container'>
                  <label htmlFor=''>Oro: </label>
                  <input 
                  type = "text" 
                  className = 'medal-input' 
                  value = { onChangeMedal.gold }
                  onChange = { (event) => handleInputChange(event, 'gold') }
                  />
                </div>
                <div className='update-container'>
                  <label htmlFor=''>Plata: </label>
                  <input 
                  type = "text" 
                  className = 'medal-input' 
                  value = { onChangeMedal.silver }
                  onChange = { (event) => handleInputChange(event, 'silver') }
                  />
                </div>
                <div className='update-container'>
                  <label htmlFor=''>Bronce: </label>
                  <input 
                  type = "text" 
                  className = 'medal-input' 
                  value = { onChangeMedal.bronze }
                  onChange = { (event) => handleInputChange(event, 'bronze') }
                  />
                </div>
                <div className='update-container'>
                  <Button 
                    type = "primary"
                    text = "Actualizar"
                    styles = {{marginRight: 10}}
                  />
              </div>
              <div className='update-container'>
                  <Button 
                    type = "default"
                    onClick = { () => dispatch({ type: 'EDIT_MEDALS', payload:{ showForm: false }})}
                    text = "Cancelar"
                  />
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
