import logo from './logo.svg';
import './App.css';
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";

function App() {
  let location = useLocation();
  console.log('location: ', location);

  return (
    <div className="App">
      <header className={`App-header ${location.pathname !== '/' ? 'App-header-top' : ''}`}>
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
          {(location.pathname !== '/') ? (<Link to="/">Home</Link>) : ''}

          <NavLink to="/product"
            className={({ isActive }) => isActive ? 'active-link' : undefined}
          >
            Product List
          </NavLink>

          <NavLink to="/game"
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
