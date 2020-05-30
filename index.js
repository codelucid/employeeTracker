const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table"); 

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "LearningIsFun",
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
            "Update employee roles",
            "EXIT"
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
        name: "addDepartment",
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
        // console.log(answer);
        var query = "INSERT INTO department SET ? ";
        var q = connection.query(query, {name:answer.addDepartment}, function(err, res) {
            if (err) throw err;
            console.log(`Added ${answer.addDepartment} to the database`);
            runQuestions();
        })
        console.log(q.sql)
    });
};

function viewAllRoles() {
    var query = "SELECT name, title, salary FROM role INNER JOIN department ON role.department_id = department.id ";
    connection.query(query, function(err, res) {
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
        var query = "INSERT INTO role (title, salary, department_id) VALUES (answer.role, answer.salary, answer.departmentOfRole) ";
        connection.query(query, [answer.role, answer.salary, answer.departmentOfRole], function(err, res) {
            if(err) throw err;
            console.log(`Added ${answer.role} to the database`);
        });
        
    });
};

function viewAllEmployees() {
    var query = "SELECT title, salary, first_name, last_name, manager_id FROM role RIGHT JOIN employee ON role.id = employee.role_id ";
    connection.query(query, function(err, res) {
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
            "Malia Brown",
            "Billy Bo",
            "Sarah Smith"
        ]
    }
    ])
    .then(function(answer) {
        var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (answer.firstname, answer.lastname, answer.employeeRole, answer.employeeManager) ";
        connection.query(query, [answer.firstname, answer.lastname, answer.employeeRole, answer.employeeManager], function(err, res) {
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
                "Billy Bo",
                "Sarah Smith"
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
        var query = "UPDATE employee SET role_id = answer.updateRole WHERE id = answer.updatePerson ";
        connection.query(query, [answer.updateRole, answer.updatePerson], function(err, res) {
            if (err) throw err;
            
            var table = cTable.getTable(res)
            console.log(table);
            console.log("Updated employee's role");
            runQuestions();
        })
    });
};

function connectionEnd() {
    console.log("Goodbye!");
};