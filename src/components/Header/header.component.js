import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem } from 'reactstrap';

import './header.component.css';

class HeaderComponent extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
       <Navbar expand="md" light className="fixed-top navbar navbar-expand-lg navbar-dark bg-primary">
         <Link className="navbar-brand" to="/">Movie App</Link>
         <NavbarToggler onClick={this.toggle} />
         <Collapse isOpen={this.state.isOpen} navbar>
           <Nav  navbar className="ml-auto">
             <NavItem>
               <Link className="nav-link" to="/">Home</Link>
             </NavItem>
             <NavItem>
               <Link className="nav-link" to="/movies/popular">Movies</Link>
             </NavItem>
             <NavItem>
               <Link className="nav-link" to="/genres">Genres</Link>
             </NavItem>
             <NavItem>
               <Link className="nav-link" to="/movies/search">Search</Link>
             </NavItem>
           </Nav>
         </Collapse>
       </Navbar>
     </div>
    );
  }
}

export default HeaderComponent;
