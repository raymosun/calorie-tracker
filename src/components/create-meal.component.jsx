import React, { useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import axios from "axios";

export default function CreateMeal(props) {
  const [username, setUsername] = useState("");
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState(0);
  const [mealTime, setMealTime] = useState(new Date());
  const [users, setUsers] = useState([]);
  const userInput = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          setUsers(response.data.map((user) => user.username));
          setUsername(response.data[0].username);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const meal = {
      username: username,
      mealName: mealName,
      calories: calories,
      mealTime: mealTime,
    };

    axios.post("http://localhost:5000/meals/add", meal)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  return (
    <div>
      <h3>Create New Meal Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            ref={userInput}
            required
            className="form-control"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          >
            {users.map(function (user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Meal Name: </label>
          <input
            type="text"
            required
            className="form-control"
            value={mealName}
            onChange={(e) => {
              setMealName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Calories: </label>
          <input
            type="text"
            className="form-control"
            value={calories}
            onChange={(e) => {
              setCalories(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={mealTime}
              onChange={(time) => {
                setMealTime(time);
              }} 
            />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Meal Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
