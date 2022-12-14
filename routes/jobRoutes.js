const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Job = require("../models/Job");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Get the job list
router.get("/", async (req, res) => {
  const findJobs = await Job.findAll();
  const allJobs = findJobs.map((job) => job.get({ plain: true }));
  console.log(allJobs);
  return res.render("jobs", {
    jobs:allJobs,
  });
});

//Display the add a job form
router.get("/add", (req, res) => res.render("add"));

// Add a job to the list
router.post("/add", (req, res) => {
  let { title, skills, budget, description, contact_email } = req.body;
  let errors = [];

  if (!title) {
    errors.push({ text: "Please add a title to your job." });
  }
  if (!skills) {
    errors.push({ text: "Please add skills to you job." });
  }
  if (!description) {
    errors.push({ text: "Please add a description to your job." });
  }
  if (!contact_email) {
    errors.push({ text: "Please add contact email." });
  }

  //   check errors here
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      skills,
      budget,
      description,
      contact_email,
    });
  } else {
    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `$${budget}`;
    }

    //fixes an issue where user couldnt search for something because of an uppercase.
    skills = skills.toLowerCase().replace(/,[]+/g, `,`);

    Job.create({
      title,
      skills,
      description,
      budget,
      contact_email,
    })
      .then((job) => res.redirect("/jobs"))
      .catch((err) => console.log(err));
  }
});

// Search for jobs
router.get("/search", async (req, res) => {
  let { term } = req.query;

  //make lowercase
  // term = term.toLowerCase();
let jobList = await Job.findAll({ where: { skills: { [Op.like]: "%" + term.toLowerCase() + "%" } } });

let allJobs = jobList.map((job) => job.get({ plain: true }));
console.log(allJobs);
return res.render("jobs", {
  jobs:allJobs,
});
  
});

module.exports = router;
