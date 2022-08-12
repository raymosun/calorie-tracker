import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { useParams } from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class EditMeal extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeMealName = this.onChangeMealName.bind(this);
    this.onChangeCalories = this.onChangeCalories.bind(this);
    this.onChangeMealTime = this.onChangeMealTime.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      mealName: '',
      calories: 0,
      mealTime: new Date(),
      users: []
    }

    this.userInput = React.createRef();
  }

  componentDidMount() {
    let { id } = this.props.params;
    console.log(id);
    axios.get('http://localhost:5000/meals/'+id)
      .then(response => {
        this.setState({
          username: response.data.username,
          mealName: response.data.mealName,
          calories: response.data.calories,
          mealTime: new Date(response.data.mealTime)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data.map(user => user.username) });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeMealName(e) {
    this.setState({
      mealName: e.target.value
    });
  }

  onChangeCalories(e) {
    this.setState({
      calories: e.target.value
    });
  }

  onChangeMealTime(mealTime) {
    this.setState({
      mealTime: mealTime
    });
  }

  onSubmit(e) {
    let { id } = this.props.params;
    e.preventDefault();

    const meal = {
      username: this.state.username,
      mealName: this.state.mealName,
      calories: this.state.calories,
      mealTime: this.state.mealTime,
    };

    console.log(meal);

    axios.post('http://localhost:5000/meals/update/'+id, meal)
      .then(res => console.log(res.data));
    
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Meal Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref={this.userInput}
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>MealName: </label>
            <input type="text"
                required
                className="form-control"
                value={this.state.mealName}
                onChange={this.onChangeMealName}
                />
          </div>
          <div className="form-group">
            <label>Calories: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.calories}
                onChange={this.onChangeCalories}
                />
          </div>
          <div className="form-group">
            <label>MealTime: </label>
            <DatePicker
              selected={this.state.mealTime}
              onChange={this.onChangeMealTime}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Meal Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

export default withParams(EditMeal);