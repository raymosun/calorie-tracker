const router = require('express').Router();
let Meal = require('../models/meal.model');

router.route('/').get((req, res) => {
  Meal.find()
    .then(meals => res.json(meals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const mealName = req.body.mealName;
  const calories = Number(req.body.calories);
  const mealTime = Date.parse(req.body.mealTime);

  const newMeal = new Meal({
    username,
    mealName,
    calories,
    mealTime,
  });

  newMeal.save()
  .then(() => res.json('Meal added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Meal.findById(req.params.id)
      .then(meal => res.json(meal))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').delete((req, res) => {
    Meal.findByIdAndDelete(req.params.id)
        .then(() => res.json('Meal deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Meal.findById(req.params.id)
        .then(meal => {
        meal.username = req.body.username;
        meal.mealName = req.body.mealName;
        meal.calories = Number(req.body.calories);
        meal.mealTime = Date.parse(req.body.mealTime);

        meal.save()
            .then(() => res.json('Meal updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;