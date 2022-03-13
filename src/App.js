import logo from './logo.svg';
import './App.css';
import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [isHome, setHome] = useState(true);

  return (
    <div className="App">
      <header className={`App-header ${!isHome ? 'App-header-top' : ''}`}>
        {/* <header className={`App-header ${navToTop}`}> */}
        < img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

        <nav>
          {!isHome ? (<Link to="/" onClick={() => setHome(true)}>Home</Link>) : ''}
          <Link to="/product" onClick={() => setHome(false)}>Product List</Link>
          <Link to="/game" onClick={() => setHome(false)}>Tic-Tac-Toe Game</Link>
        </nav>

        <Outlet />
      </header>
    </div>
  );
}

export default App;
