import React from 'react';
import './App.css';

import HeaderComponent from './components/Header/header.component';
import FooterComponent from './components/Footer/footer.component';
import Main from './main.component';


const App = () =>  {
  // Our main app wrapper
  return(
    <div>
      <HeaderComponent />
      <Main />
      <FooterComponent />
    </div>
  )
}

export default App;
