import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

class HeaderNavigation extends Component {
  render() {
    return (
      <Navbar href="/">
        <NavbarBrand>
          <img alt=""/>
        </NavbarBrand>
      </Navbar>
    );
  }
}

export default HeaderNavigation;
