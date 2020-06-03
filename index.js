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
            "Update employee role",
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
    var query = "SELECT department.id, name FROM department";
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
        connection.query(query, {name:answer.addDepartment}, function(err, res) {
            if (err) throw err;
            console.log(`Added ${answer.addDepartment} to the database`);
            runQuestions();
        })
        
    });
};

function viewAllRoles() {
    var query = "SELECT department.id, name, title, salary FROM role INNER JOIN department ON role.department_id = department.id ";
    connection.query(query, function(err, res) {
        if (err) throw err;
        var table = cTable.getTable(res)
        console.log(table);
        runQuestions();
    })
};

function addRole() {
    connection.query("SELECT * FROM department", function(err, results) {
        if (err) throw err
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
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].name)
                    }
                    return choiceArray;
                },
                message: "Which department does the role belong to?"
            }
        ])
        .then(function(answer) {
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].name === answer.departmentOfRole) {
                    chosenItem = results[i].id;
                }
            }
            var query = "INSERT INTO role SET ? "; 
                
            connection.query(query, {title: answer.role, salary: answer.salary, department_id: chosenItem}, function(err, res) {
                if(err) throw err;
                console.log(`Added ${answer.role} to the database`);
                runQuestions();
            });
        })
        .catch(function(err) {
            console.log(err)
        });
        
    });
};   


function viewAllEmployees() {
    var query = "SELECT employee.id, title, salary, first_name, last_name, manager_id FROM role RIGHT JOIN employee ON role.id = employee.role_id ";
    connection.query(query, function(err, res) {
        if (err) throw err;
        var table = cTable.getTable(res)
        console.log(table);
        runQuestions();
    })
   
};

function addEmployee() {
    connection.query("SELECT * FROM role", function(err, results) {
        if (err) throw err;
        connection.query("SELECT * FROM employee", function(err, results2) {
            if (err) throw err;
        
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
                choices: function() {
                    let choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].title);
                    }
                    return choiceArray;
                },
                message: "What is the employee's role?"   
            },
            {
                name: "employeeManager",
                type: "rawlist",
                choices: function() {
                    let choiceArray = [];
                    for (var i = 0; i < results2.length; i++) {
                        let manager = results2[i].first_name + " " + results2[i].last_name;
                        choiceArray.push(manager);
                    }
                    return choiceArray;
                },
                message: "Who is the employee's manager?"
            }
            ])
            .then(function(answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].title === answer.employeeRole) {
                        chosenItem = results[i].id;
                    }
                }
            
                var chosenItem2;
            
                for (var i = 0; i < results2.length; i++) {
                    if (results2[i].manager_id === answer.employeeManager) {
                        chosenItem2 = results2[i].id;
                    }
                }

                var query = "INSERT INTO employee SET ? ";
                connection.query(query, {first_name: answer.firstname, last_name: answer.lastname, role_id: chosenItem, manager_id: chosenItem2}, function(err, res) {
                    if (err) throw err;
            
            
                console.log(`Added ${answer.firstname} ${answer.lastname} to the database`);
                runQuestions();
                })
            })
            .catch(function(err) {
                console.log(err)
            });
        });
    });
};

function updateEmployeeRole() {
    connection.query("SELECT * FROM employee", function(err, results) {
        if (err) throw err;
        connection.query("SELECT * FROM role", function(err, results2) {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: "updatePerson",
                    type: "rawlist",
                    choices: function() {
                        let choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            var employee = results[i].first_name + " " + results[i].last_name;
                            choiceArray.push(employee);
                        }
                        return choiceArray;
                    },
                    message: "Which employee do you want to update?",
                    
                },
                {
                    name: "updateRole",
                    type: "rawlist",
                    choices: function() {
                        let choiceArray = [];
                        for (var i = 0; i < results2.length; i++) {
                            choiceArray.push(results2[i].title);
                        }
                        return choiceArray;
                    },
                    message: "Which role do you want to assign the selected employee?",
                    
                }
            ])
            .then(function(answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].role_id === answer.updatePerson) {
                        chosenItem = results[i].id;
                    }
                }
            
                var chosenItem2;
            
                for (var i = 0; i < results2.length; i++) {
                    // LINE 315: It will accept results2[i] or results2[i].id  
                    // It will not accept results2[i].title
                    if (results2[i] === answer.updateRole) {
                        chosenItem2 = results2[i].id;
                    }
                }7
                
                // Does NOT seem to be updating the table
                var query = "UPDATE employee SET role_id = ? WHERE id = ? ";
                connection.query(query, [chosenItem, chosenItem2], function(err, res) {
                    if (err) throw err;
            
                    // var table = cTable.getTable(res)
                    // console.log(table);
                    console.log("Updated employee's role");
                    runQuestions();
                })
            })
            .catch(function(err) {
                console.log(err)
            });
        });
    });
};

function connectionEnd() {
    console.log("Goodbye!");
};