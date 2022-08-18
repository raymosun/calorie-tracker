import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar.component"
import MealsList from "./components/meals-list.component";
import EditMeal from "./components/edit-meal.component";
import CreateMeal from "./components/create-meal.component";
import CreateUser from "./components/create-user.component";

export const DarkContext = React.createContext(false);

function App() {
 return (
  <DarkContext.Provider value="false">
    <Router>
     <div className="container">
     <Navbar />
      <br/>
      <Routes>
        <Route path="/" exact element={<MealsList />} />
        <Route path="/edit/:id" element={<EditMeal />} />
        <Route path="/create" element={<CreateMeal />} />
        <Route path="/user" element={<CreateUser />} />
      </Routes>
      
     </div>
   </Router>
  </DarkContext.Provider>
 );
}
 
export default App;