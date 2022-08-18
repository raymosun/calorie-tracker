import React, { Component, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import { DarkContext } from '../App.js';

export default class Navbar extends Component {
  constructor(props){
    super(props)

    this.state = {
      darkMode: false
    }

    this.toggleDarkMode = this.toggleDarkMode.bind(this);

    const [, setDark] = useContext(DarkContext);
  }

  componentDidMount()  {
    console.log(JSON.parse(localStorage.getItem('darkMode')));
    
    const saved = localStorage.getItem('darkMode')
    const initialVal = JSON.parse(saved)
    this.setState( (state, props) => {
      return { darkMode: initialVal }
    });
  }

  toggleDarkMode(checked)  { 
    // this.state.darkMode = checked;
    this.setState({ darkMode: checked })
    localStorage.setItem('darkMode', JSON.stringify(checked))
    console.log(`changing state to ${checked}`)
    if (checked === true)
      document.documentElement.setAttribute("dark-mode", "true")
    else
      document.documentElement.setAttribute("dark-mode", "false")
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Calorie Tracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Meals</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Meals Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
          <li className="navbar-item">
            <Switch onChange={this.toggleDarkMode} checked={this.state.darkMode} />
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}