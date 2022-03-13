import logo from './logo.svg';
import './App.css';
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
          <Link to="/">Home</Link> |{" "}
          <Link to="/product">Product List</Link> |{" "}
          <Link to="/game">Tic-Tac-Toe Game</Link>
        </nav>

        <Outlet />
      </header>
    </div>
  );
}

export default App;
