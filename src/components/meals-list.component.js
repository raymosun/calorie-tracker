import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Meal = props => (
    <tr>
      <td>{props.meal.username}</td>
      <td>{props.meal.mealName}</td>
      <td>{props.meal.calories}</td>
      <td>{props.meal.mealTime.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.meal._id}>edit</Link> | <a href="/#" onClick={() => { props.deleteMeal(props.meal._id) }}>delete</a>
      </td>
    </tr>
  )

export default class MealsList extends Component {

    constructor(props) {
        super(props);
        this.deleteMeal = this.deleteMeal.bind(this);
        this.state = {meals: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/meals/')
         .then(response => {
           this.setState({ meals: response.data });
         })
         .catch((error) => {
            console.log(error);
         })
      }

    deleteMeal(id) {
        axios.delete('http://localhost:5000/meals/'+id)
            .then(res => console.log(res.data));
        this.setState({
            meals: this.state.meals.filter(el => el._id !== id)
        })
    }

    mealList() {
        return this.state.meals.map(currentMeal => {
          return <Meal meal={currentMeal} deleteMeal={this.deleteMeal} key={currentMeal._id}/>;
        })
      }

    render() {
        return (
            <div>
            <h3>Logged Meals</h3>
            <table className="table" dark-mode="true">
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th>Meal Name</th>
                  <th>Calories</th>
                  <th>Meal Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.mealList() }
              </tbody>
            </table>
          </div>
        )
    }
}

MealsList.contextType = DarkContext;