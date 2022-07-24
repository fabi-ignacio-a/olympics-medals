import logo from './logo.svg';
import './App.css';

import 
  React,
  { 
    useState,
    useEffect  
  }
from 'react';

function App() {

  const [text, setText] = useState('Escribe algo');
  const onChangeText = (event) => {
    event.persist();
    setText(event.target.value);
    console.log(event.target.name);
  }

  return (
    <form>
      <input type="text" 
      value={ text } 
      name={'oro'}
      onChange = { 
        (event) => onChangeText(event) }
      />
    </form>
  );

}

export default App;
