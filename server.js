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
            choices: ["View all employees", "View all departments", "View all roles", "Add an employee"]
        }
        // "Add a department", "Add a role", "Add an employee", "Update an employee role", "Finish and Exit"
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
                askQuestion();
            })
        }
        //     console.log("view employees!")
        //     console.log(data.choice);
        //     // db.end();
        //     // viewEmployees();
        //     break;

        // case "Add a department":
        //     console.log("add an department")
        //     // addDepartment();
        //     break;

        // case "Add a role":
        //     console.log("add a role!")
        //     // addRole();
        //     break;

        // case "Add an employee":
        //     console.log("add an employee!")
        //     return data
        //     db.end();
        //     // addEmployee();
        //     break;

        // case "Update an employee role":
        //     console.log("add an employee!")
        //     // addEmployee();
        //     break;

        // case "Finish and Exit":
        //     console.log("finished updating company org!")
        // console.log(`${team}`)
        // console.log(team[0]);
        // team.forEach(person => {
        //     console.log(person.role + " role");
        // });
        // generateHTML(team);
        // const htmlPageContent = generateHTML(answers);
        // fs.writeFile('index.html', generateHTML(team), (err) => err ? console.log(err) : console.log('Successfully created index.html!'));
        // break;

        // default:
        //     console.log("goodbye!")
        //     break;
        // }

    });
};
askQuestion();
//working up to this point except that arrow selection keys don't work. Need to figure that out.