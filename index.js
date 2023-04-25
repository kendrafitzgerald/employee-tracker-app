// variables for packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');

// connection to mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sampson423',
    database: 'employeetracker_db'

});
//function to display list of questions
function promptList() {
inquirer
.prompt ([

    {
        type: 'list',
        message: 'What would you like to view?',
        name: 'viewAll',
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", 
        "Add a Role", "Add an Employee", "Update an Employee Role"]

    },
]).then(answer => {
    //given user answer to prompt, calls functions that either display tables or give user opportunity to change database
    switch(answer.viewAll) {
        case 'View All Departments':
            viewDepartments();
            break;
        case 'View All Roles':
            viewRoles();
            break;
        case 'View All Employees':
            viewEmployees();
            break;
        case 'Add a Department':
            addDepartment();
            break;
        case 'Add a Role':
            addRole();
            break;
        case 'Add an Employee':
             addEmployee();
             break;
        case 'Update an Employee Role':
            updateEmployeeRole();
            break;    
    }
   });
};
//calls promptList function once applicaiton begins
promptList();
// Selects columns and values from departments tables and displays it on screen
function viewDepartments() {
    db.query('SELECT id as "Department ID", names as "Departments" FROM departments', (err, results) => {
        if (err) {
            throw err;
        } 
        console.table(results);
        //calls promptList function so it immediately repopulates under table
        promptList();
    });
};
//Selects columns and values from roles table and displays it on screen, handles JOIN for department and role keys
function viewRoles() {
    db.query('SELECT roles.title AS "Job Title", roles.id AS "Role ID", departments.names AS "Department", roles.salary AS "Salary" FROM roles INNER JOIN departments ON roles.department_id = departments.id', (err, results) => {
        if (err) {
            throw err;
        }
        console.table(results);
        //calls promptList function so it immediately repopulates under table
        promptList();
    });
};
//Selects columns and values from employees table and displays it on screen, handles JOIN for role ids, department ids, and assigns manager to each employee 
function viewEmployees() {
    db.query('SELECT employees.id AS "Employee ID", employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Job Title", departments.names AS "Department", roles.salary AS "Salary", CONCAT(manager.first_name, " ", manager.last_name) AS "Manager" FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id', (err, results) => {
        if (err) {
            throw err
        }
        console.table(results)
        //calls promptList function so it immediately repopulates under table
        promptList();
    });
};

//prompts user to input text for a new department name then takes the answer to insert a new set of values into the departments table
function addDepartment () {
   inquirer .prompt([
        {
            type: 'input',
            message: 'What would you like to name this department?',
            name: 'addDepartment'
        }
   ]).then(answer => {
        const newDepartment = answer.addDepartment;
        db.query(`INSERT INTO departments(names) VALUES ("${newDepartment}")`, (err, results) => {
            if (err) {
                throw err
            }
            //alerts user they successfully added new department
            console.log('Added new department!');
            //calls promptList function so it immediately repopulates under success notice
            promptList();
        });
   });
};
//prompts user to input a new role, input a new salary, and select a pre-existing department to insert the new values to the roles table
function addRole () {
   db.query('SELECT * FROM departments', function (err, results) {

   inquirer .prompt([
        {
            type: 'input',
            message: 'What would you like to name this role?',
            name: 'newRole'
        },
        {
            type: 'input',
            message: 'What is the salary of this role?',
            name: 'newSalary'
        },
        {
            type: 'rawlist',
            message: 'What is the department for this role?',
            name: 'newDepartment',
            choices: results.map(departments => `${departments.names}`),
        }
    ]).then (answer => {
        const newRole = answer.newRole;
        const newSalary = answer.newSalary;
        const newDepartment = answer.newDepartment;

        db.query (`SELECT id FROM departments WHERE names = ?`, newDepartment, (err, results) => {
            if (err) {
                throw err
            }
            const newID = results[0].id

            db.query(`INSERT INTO roles(title, salary, department_id) VALUES (?, ?, ?)`, [newRole, newSalary, newID], (err, results) => {
                if (err) {
                    throw err
                }
                //alerts user if new role was successfully added
                console.log('Added new role!');
                //calls promptList function so it immediately repopulates under success notice
                promptList();

            });
        });
        
    });
  });
};
//prompts user to add a new employee name, assign a pre-existing role to the employee, and assign an existing manager to the employee then insert the new values into the employees table
function addEmployee() {
    db.query('SELECT * FROM roles', function (err, roleResults) {
        if(err) {
            throw err
        }
    db.query('SELECT * FROM employees WHERE manager_id IS NULL', function (err, employeeResults) {
    inquirer .prompt([
        {
            type: 'input',
            message: 'Please enter first name of employee',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Please enter last name of employee',
            name: 'lastName'
        },
        {
            type: 'rawlist',
            message: 'What is their role?',
            name: 'employeeRole',
            choices: roleResults.map(roles => `${roles.title}`)
        },
        {
            type: 'rawlist',
           message: 'Who is their manager?',
           name: 'manager',
           choices: employeeResults.map(employees => `${employees.first_name} ${employees.last_name}`)
         }
    ]).then (answer => {
        const firstName = answer.firstName;
        const lastName = answer.lastName;
        const role = answer.employeeRole;
        const manager = answer.manager

        db.query(`SELECT id FROM roles WHERE title =?`, role, (err, results) => {
            if (err) {
                throw err
            }
            const roleID = results[0].id

        db.query(`SELECT id FROM employees WHERE CONCAT (first_name, " ", last_name) = ?`, manager, (err, managerResults) => {
            if (err) {
                throw err
            }
            const managerID = managerResults[0].id;

        db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [firstName, lastName, roleID, managerID], (err, results) => {
                    if (err) {
                        throw err
                    }
                    //alerts user if the new employee was added successfully
                    console.log('Added new employee!');
                    //calls promptList function so it immediately repopulates under success notice
                    promptList();
             });
           });
        });
      });
    });
  });
};

//prompts user to update an employees role by choosing a pre-existing employee and then updating them to a pre-existing role before updating that employee's information in the employees table
function updateEmployeeRole() {
    db.query('SELECT * FROM employees', function (err, employeeResults) {
        if (err) {
            throw err;
        }
        db.query('SELECT * FROM roles', function (err, roleResults) {
            if (err) {
                throw err;
            }
            inquirer.prompt([
                {
                    type: 'rawlist',
                    message: 'What employee would you like to update?',
                    name: 'updateEmployee',
                    choices: employeeResults.map(employee => `${employee.first_name} ${employee.last_name}`)
                }, 
                {
                    type: 'rawlist',
                    message: 'What is their new role?',
                    name: 'newRole',
                    choices: roleResults.map(role => role.title)
                }
            ]).then(answer => {
                const employee = answer.updateEmployee;
                const role = answer.newRole;

                db.query(`SELECT id FROM roles WHERE title = ?`, [role], (err, results) => {
                    if (err) {
                        throw err;
                    }
                    const roleID = results[0].id;

                    db.query(`UPDATE employees SET role_id = ?  WHERE CONCAT(first_name, ' ', last_name) = ?`, [roleID, employee], (err, results) => {
                        if (err) {
                            throw err;
                        }
                        //alerts user if employee was updated successfully
                        console.log('Updated employee role!');
                        //calls promptList function so it immediately repopulates under success notice
                        promptList();
                    });
                });
            });
        });
    });
}

