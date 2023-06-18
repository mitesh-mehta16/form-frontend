import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import ListForms from "./ListForms";
import { Link, createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

const Header = () => {
  return (
    <div>
      <Navbar>
        <NavbarBrand href="/">Form-Task</NavbarBrand>

        <Link to="showForms">Show Forms</Link>

        {/* <NavbarText>Simple Text</NavbarText> */}
      </Navbar>
    </div>
  );
};

export default Header;
