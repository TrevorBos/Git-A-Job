const Sequelize = require('sequelize');
const db = require('../config/database')

const  Job = db.define ("job", {
    title: {
        type: Sequelize.STRING,
    },
    skills: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    budget: {
        type: Sequelize.STRING,
    },
    contact_email: {
        type: Sequelize.STRING,
    },
});

Job.sync().then(() => {
    console.log ("The table has been created successfully!");
});

module.exports = Job;