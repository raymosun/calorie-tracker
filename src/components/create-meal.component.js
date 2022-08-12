import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import axios from 'axios';

export default class CreateMeal extends Component {
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
          users: []   // FIXME, shouldn't be able to create a meal for every user
        }

        this.userInput = React.createRef()
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                this.setState({ 
                    users: response.data.map(user => user.username),
                    username: response.data[0].username
                });
                }
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
        e.preventDefault();
        const meal = {
          username: this.state.username,
          mealName: this.state.mealName,
          calories: this.state.calories,
          mealTime: this.state.mealTime,
        };
      console.log(meal);
      axios.post('http://localhost:5000/meals/add', meal)
        .then(res => console.log(res.data));

      window.location = '/'; 
    }

    render() {
        return (
            <div>
                <h3>Create New Meal Log</h3>
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Username: </label>
                        <select ref={this.userInput}
                            required
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
                        <label>Meal Name: </label>
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
                        <label>Date: </label>
                        <div>
                        <DatePicker
                            selected={this.state.mealTime}
                            onChange={this.onChangeMealTime}
                        />
                        </div>
                    </div>
            
                    <div className="form-group">
                        <input type="submit" value="Create Meal Log" className="btn btn-primary" />
                    </div>
                    </form>
            </div>
        )
    }
}