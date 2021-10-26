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
        switch (data.choice) {
            case "View all employees":
                return viewEmployees();
            case "View all departments":
                return viewDepartments();
            case "View all roles":
                return viewRoles();
            case "Add an employee":
                return addEmployee();
            case "Add a department":
                return addDepartment();
            case "Add a role":
                return addRole();
            case "Update employee's role":
                return updateRole();
            case "QUIT":
                console.log("goodbye");
                db.end();
        }
    })
};

//functions

function viewEmployees() {
    db.query("SELECT employees.id, employees.first_name AS first, employees.last_name AS last, roles.title AS role, departments.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON roles.id=employees.id LEFT JOIN departments ON roles.department_id=departments.id LEFT JOIN employees manager ON manager.id=employees.manager_id", (err, data) => {
        if (err) {
            throw err;
        } else {
            console.table("All Employees", data);
            askQuestion();
        }
    });
}

function viewDepartments() {
    db.query('SELECT * FROM departments', (err, data) => {
        if (err) {
            throw err;
        } else {
            console.table("All Departments", data);
            askQuestion();
        }
    })
};

function viewRoles() {
    db.query('SELECT * FROM roles', (err, data) => {
        if (err) {
            throw err;
        } else {
            console.table("All Roles", data);
            askQuestion();
        }
    })
}

function addEmployee() {
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
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "Input new department name"
        }
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
}

function addRole() {
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
        }
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
}

function updateRole() {
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
        }
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
    })
};

askQuestion();