import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./components/menu";
import { DISHES } from "./shared/dishes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }
  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <div className="container">
          <Menu dishes={this.state.dishes} />
        </div>
      </div>
    );
  }
}

export default App;
