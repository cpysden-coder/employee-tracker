console.log("hollow world");
//set up npm package dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'password',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);


//ask Question function to prompt user for answers
function askQuestion() {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "What do you want to do?",
            choices: ["View all employees", "View all departments", "View all roles", "Add an employee", "Add a department", "Add a role", "Update employee's role", "QUIT"]
        }
        // "Update an employee role", "Finish and Exit"
    ]).then((data) => {
        if (data.choice === "View all employees") {
            db.query('SELECT * FROM employees', (err, data) => {
                if (err) {
                    throw err;
                } else {
                    console.table("All Employees", data);
                    askQuestion();
                }
            });
        } else if (data.choice === "View all departments") {
            db.query('SELECT * FROM departments', (err, data) => {
                if (err) {
                    throw err;
                } else {
                    console.table("All Departments", data);
                    askQuestion();
                }
            });
        } else if (data.choice === "View all roles") {
            db.query('SELECT * FROM roles', (err, data) => {
                if (err) {
                    throw err;
                } else {
                    console.table("All Roles", data);
                    askQuestion();
                }
            });
        } else if (data.choice === "Add an employee") {
            inquirer.prompt([
                {
                    name: "firstname",
                    type: "input",
                    message: "Input employee first name"
                },
                {
                    name: "lastname",
                    type: "input",
                    message: "Input employee last name"
                },
                {
                    name: "roleid",
                    type: "input",
                    message: "Input employee role ID"
                },
                {
                    name: "managerid",
                    type: "input",
                    message: "Input employee manager id"
                }
            ]).then((data) => {
                console.table(data);
                console.log(data.firstname);
                db.query('INSERT INTO employees VALUES (?,?,?,?,?)', [null, data.firstname, data.lastname, data.roleid, data.managerid], (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        console.table("All Roles", data);
                        console.log(data)
                        askQuestion();
                    }
                });
                // askQuestion();
            })
        } else if (data.choice === "Add a department") {
            inquirer.prompt([
                {
                    name: "department",
                    type: "input",
                    message: "Input new department name"
                },
            ]).then((data) => {
                console.table(data);
                console.log(data.department);
                db.query('INSERT INTO departments VALUES (?,?)', [null, data.department], (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        console.table("All Departments", data);
                        console.log(data)
                        askQuestion();
                    }
                });
                // askQuestion();
            })
        } else if (data.choice === "Add a role") {
            inquirer.prompt([
                {
                    name: "title",
                    type: "input",
                    message: "Input new role title"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "Input salary for new role"
                },
                {
                    name: "departmentid",
                    type: "input",
                    message: "Input id for department role belongs to"
                },
            ]).then((data) => {
                console.table(data);
                console.log(data.role);
                db.query('INSERT INTO roles VALUES (?,?,?,?)', [null, data.title, data.salary, data.departmentid], (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        console.table("All Roles", data);
                        console.log(data)
                        askQuestion();
                    }
                });
                // askQuestion();
            })
        } else if (data.choice === "Update employee's role") {
            inquirer.prompt([
                {
                    name: "employeeid",
                    type: "input",
                    message: "Input employee id"
                },
                {
                    name: "new_roleid",
                    type: "input",
                    message: "Input new role id for employee"
                },
                
            ]).then((data) => {
                console.table(data);
                console.log(data.role);
                db.query('UPDATE employees SET role_id =? WHERE id= ?', [data.new_roleid, data.employeeid], (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        console.table("All Roles", data);
                        console.log(data)
                        askQuestion();
                    }
                });
                // askQuestion();
            })
        } else {
            console.log("Goodbye");
            db.end();
        }

    });
};
askQuestion();
//working up to this point except.