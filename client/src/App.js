import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Main from "./components/Main.jsx";
import Home from "./components/Home.jsx";
import Details from "./components/Details.jsx";
import Tipos from "./components/Tipos";
import Create from "./components/Create";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Main} />
        <Route exact path="/pokemons" component={Home} />
        <Route exact path="/pokemon/:id" component={Details} />
        <Route exact path="/pokemons/tipos" component={Tipos} />
        <Route exact path="/pokemons/crear" component={Create} />
      </div>
    </BrowserRouter>
  );
}

export default App;
