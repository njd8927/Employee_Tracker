const mySql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');
const path = require('path');
// const db = require('/');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mySql.createConnection(
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

function landingPage() {
    inquirer.prompt([
        {
            name: "options",
            type: "list",
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
    ])
        .then((result) => {
            console.log(result.options);

            switch (result.options) {
                case "View Departments":
                    viewDepartment();
                    break;
                case "View Roles":
                    viewRole();
                    break;
                case "View Employees":
                    viewEmployee();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployee();
                    break;
            }
        });
};

landingPage();

function viewDepartment() {
    let query = SELECT * FROM department;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        landingPage();
    });
};

function viewRole() {
    let query = SELECT * FROM "role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        landingPage();
    });
};

function viewEmployee() {
    let query = SELECT * FROM employee;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        landingPage();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "What is the name of the department you would like to add?"
        }
    ]).then(function (choice) {
        connection.query("INSERT INTO department (name) VALUES (?)", [choice.deptName], function (err, res) {
            if (err) throw err;
            console.table(res);
            landingPage();
        });
    });
};

function addRole() {
    inquirer.prompt([
        {
            name: "roleTitle",
            type: "input",
            message: "What is the name of the role you would like to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "Please enter the salary for this role."
        },
        {
            name: "departmentID",
            type: "input",
            message: "Please enter the department id that the role will be assigned to."
        }
    ]).then(function (choice) {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [choice.roleTitle, choice.salary, choice.departmentID], function (err, res) {
            if (err) throw err;
            console.table(res);
            landingPage();
        });
    });
};

function addEmployee() {
    inquirer.prompt([
        {
            name: "empFirstName",
            type: "input",
            message: "What is the first name of the employee?"
        },
        {
            name: "empLastName",
            type: "input",
            message: "What is the last name of the employee?"
        },
        {
            name: "empRoleID",
            type: "input",
            message: "What is the employees role id number?"
        },
        {
            name: "empManagerID",
            type: "input",
            message: "What is the employees managers id number?"
        },
    ]).then(function (choice) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [choice.empFirstName, choice.empLastName, choice.empRoleID, choice.empManagerID], function (err, res) {
            if (err) throw err;
            console.table(res);
            landingPage();
        });
    });
};

function updateEmployee() {
    inquirer.prompt([
        {
            name: "empName",
            type: "input",
            message: "Which employee would you like to update?"
        },
        {
            name: "roleIDUpdate",
            type: "input",
            message: "What is the role id you would like to update the employee to?"
        },
    ]).then(function (choice) {
        connection.query("UPDATE employee SET role_id=? WHERE first_name=?", [choice.empName, choice.roleIDUpdate], function (err, res) {
            if (err) throw err;
            console.table(res);
            landingPage();
        });
    });
};

