import logo from './logo.svg';
import './App.css';
// import { Outlet, Link } from "react-router-dom";
import { Outlet, Link, NavLink } from "react-router-dom";
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
          <NavLink to="/product" onClick={() => setHome(false)}
            className={({ isActive }) => isActive ? 'active-link' : undefined}
          >
            Product List
          </NavLink>
          <NavLink to="/game" onClick={() => setHome(false)}
            className={({ isActive }) => isActive ? 'active-link' : undefined}
          >
            Tic-Tac-Toe Game
          </NavLink>
        </nav>

        <Outlet />
      </header>
    </div>
  );
}

export default App;
