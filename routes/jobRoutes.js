const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Job = require("../models/Job");

// Get the job list
router.get("/", (req, res) =>
  Job.findAll()
    .then((jobs) => {
      console.log(jobs);
      res.sendStatus(200);
    })
    .catch((err) => console.log(err))
);

// Add a job to the list
router.get("/add", (req, res) => {
  const data = {
    title: "Rocket League Developer",
    skills: "Coding, JS, C#, Animation, CSS",
    budget: "$150000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    contact_email: "rocketrocket@rockert.rocket",
  };

  let {title, skills, budget, description, contact_email} = data;

  Job.create ({
    title,
    skills,
    description,
    budget,
    contact_email
  })
  .then(job => res.redirect('/jobs'))
  .catch(err => console.log(err));

});

module.exports = router;
