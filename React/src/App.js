import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./components/menu";

function App() {
  return (
    <div>
      <Navbar dark color="primary" fixed="top">
        <div className="container">
          <NavbarBrand href="/">Ristorante con Fusion</NavbarBrand>
        </div>
      </Navbar>
      <Menu />
    </div>
  );
}

export default App;
