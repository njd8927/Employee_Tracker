const mySql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mySql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'pass123',
        database: 'employee_tracker_db'
    },
    console.log('Connected to employee_tracker_db database!')
);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


function landingPage () {
    inquirer.prompt([
        {
            name: "options",
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add A Department",
                "Add A Role",
                "Add An Employee",
                "Update An Employee Role"
            ],
        }
    ]);
};


