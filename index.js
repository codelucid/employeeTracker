const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table"); 

const connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "",
    database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    runQuestions();
});

function runQuestions() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message:"What would you like to do?",
        choices: [
            "View all departments",
            "Add a department",
            "View all roles",
            "Add a role",
            "View all employees",
            "Add an employee",
            "Update employee roles"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case "View all departments":
                viewAllDepartments();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "View all roles":
                viewAllRoles();
                break;
            case "Add a role":
                addRole();
                break;
            case "View all employees":
                viewAllEmployees();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update employee role":
                updateEmployeeRole();
                break;
            case "EXIT":
                connectionEnd();
                connection.end();
                break;
        }
    });
}

function viewAllDepartments() {
    var query = "SELECT name FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        var table = cTable.getTable(res)
        console.log(table);
        runQuestions();
    })
};

function addDepartment() {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "What is the name of the department?",
        validate: function(value) {
            if (isNaN(value) === true) {
                return true;
            }
            return false;
        }
    })
    .then(function(answer) {
        connection.query = "INSERT INTO department VALUES ?",
        {
            name: answer.department
        },
        function(err) {
            if (err) throw err;
            console.log(`Added ${answer.department} to the database`);
            runQuestions();
        }
    });
};

function viewAllRoles() {
    var query = "need a join here";
    connection.query(query,      ,function(err, res) {
        if (err) throw err;
        var table = cTable.getTable(res)
        console.log(table);
        runQuestions();
    })
};

function addRole() {
    inquirer.prompt([
    {
        name: "role",
        type: "input",
        message: "What is the name of the role?",
        validate: function(value) {
            if (isNaN(value) === true) {
                return true;
            }
            return false;
        }
    },
    {
        name: "salary",
        type: "input",
        message: "What is the salary of the role?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    },
    {
        name: "departmentOfRole",
        type: "rawlist",
        message: "Which department does the role belong to?",
        choices: [
            "Sales",
            "Engineering",
            "Finance",
            "Legal"
        ]
    }
    ])
    .then(function(answer) {
        var query = "ADD ";

        console.log(`Added ${answer.role} to the database`)
    })
};

function viewAllEmployees() {
    var query = "need some joins here";
    connection.query(query,      ,function(err, res) {
        if (err) throw err;
        var table = cTable.getTable(res)
        console.log(table);
        runQuestions();
    })
   
};

function addEmployee() {
    inquirer.prompt([
    {    
        name: "firstname",
        type: "input",
        message: "What is the employee's first name?",
        validate: function(value) {
            if (isNaN(value) === true) {
                return true;
            }
            return false;
        }

    },
    {
        name: "lastname",
        type: "input",
        message: "What is the employee's last name?",
        validate: function(value) {
            if (isNaN(value) === true) {
                return true;
            }
            return false;
        }
    },
    {
        name: "employeeRole",
        type: "rawlist",
        message: "What is the employee's role?",
        choices: [
            "Sales Lead",
            "Salesperson",
            "Lead Engineer",
            "Software Engineer",
            "Account Manager",
            "Accountant",
            "Legal Team Lead",
            "Lawyer"
        ]
    },
    {
        name: "employeeManager",
        type: "rawlist",
        message: "Who is the employee's manager?",
        choices: [
            "None",
            "John Doe",
            "Mike Chan",
            "Ashley Rodriquez",
            "Kevin Tupik",
            "Kunal Singh",
            "Malia Brown"
        ]
    }
    ])
    .then(function(answer) {
        var query = "ADD ";
        connection.query(query,     , function(err, res) {
            if (err) throw err;
            
            
            console.log(`Added ${answer.firstname} ${answer.lastname} to the database`);
            runQuestions();
        })
    });
};

function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: "updatePerson",
            type: "rawlist",
            message: "Which employee's role do you want to update?",
            choices: [
                "John Doe",
                "Mike Chan",
                "Ashley Rodriquez",
                "Kevin Tupik",
                "Kunal Singh",
                "Malia Brown",
                "Sarah Lourd"
            ]
        },
        {
            name: "updateRole",
            type: "rawlist",
            message: "Which role do you want to assign the selected employee?",
            choices: [
                "Sales Lead",
                "Salesperson",
                "Lead Engineer",
                "Software Engineer",
                "Account Manager",
                "Accountant",
                "Legal Team Lead",
                "Lawyer"
            ]
        }
    ])
    .then(function(answer) {
        var query = "ADD ";
        connection.query(query,     , function(err, res) {
            if (err) throw err;
            
           
            console.log("Updated employee's role");
            runQuestions();
        })
    });
};

function connectionEnd() {
    console.log("Goodbye!");
};