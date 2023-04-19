// import required packages
const mySql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
// const express = require('express');


// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// set up sql connection
const connection = mySql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'pass123',
        database: 'employee_tracker_db'
    },
    console.log('Connected to employee_tracker_db database!')
);


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// function for options menu that loads upon app initializing
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
// switch case to run function associated with the user choice
            switch (result.options) {
                case "View All Departments":
                    viewDepartment();
                    break;
                case "View All Roles":
                    viewRole();
                    break;
                case "View All Employees":
                    viewEmployee();
                    break;
                case "Add A Department":
                    addDepartment();
                    break;
                case "Add A Role":
                    addRole();
                    break;
                case "Add An Employee":
                    addEmployee();
                    break;
                case "Update An Employee Role":
                    updateEmployee();
                    break;
                default:
                    end();
            }
        });
};

landingPage();

// function to load department table data
function viewDepartment() {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        landingPage();
    });
};

// function to load role table data
function viewRole() {
    let query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        landingPage();
    });
};

// function to load employee table data
function viewEmployee() {
    let query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        landingPage();
    });
};

// function to insert new value into department table based on user input
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

// function to insert new value into role table based on user input
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

// function to insert new value into employee table based on user input
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

// function to update current employee role ID based on user input
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
        connection.query("UPDATE employee SET role_id=? WHERE first_name=?", [choice.roleIDUpdate, choice.empName], function (err, res) {
            if (err) throw err;
            console.table(res);
            landingPage();
        });
    });
};


// function to end sql connection
function end () {
    process.exit();
};

