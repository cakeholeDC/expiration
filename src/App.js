import React from 'react';
import './App.scss';
import KitchenContainer from './containers/KitchenContainer.js'

function App() {
  return (
    <div className="App">
      <KitchenContainer id="1"/>
      <div id="credits">
      	  <p>ExpiRATION &copy;2020 <a href="https://www.kylepcole.com/" target="_blank">Kyle P. Cole</a></p>
	  	  <div className="flaticon-credits">Icons by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a></div>
  	  </div>
    </div>
  );
}

export default App;
