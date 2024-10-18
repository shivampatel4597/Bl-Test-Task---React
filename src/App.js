import React from 'react';

import './App.css';
import Linechart from './components/Linechart';
import Bargraph from './components/Bargraph';
import World from './components/World';

import Navbar from './components/Navbar';
import Liveupdate from './components/Liveupdate';

function App() {
  return (
    <>
    {alert("sorry i did not make it responsive ")}
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", display:"flex"}}>
<div>
<Linechart />
        <Bargraph />
        <World />
</div>

<Liveupdate/>
       


      </div>

    </>
  );
}

export default App;
