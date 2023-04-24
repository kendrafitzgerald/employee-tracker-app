const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sampson423',
    database: 'employeetracker_db'

});
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
promptList();

function viewDepartments() {
    db.query('SELECT * FROM departments', (err, results) => {
        if (err) {
            throw err;
        } 
        console.table(results);
        promptList();
    });
};

function viewRoles() {
    db.query('SELECT roles.title, roles.id, departments.names, roles.salary FROM roles INNER JOIN departments ON roles.department_id = departments.id', (err, results) => {
        if (err) {
            throw err;
        }
        console.table(results);
        promptList();
    });
};

function viewEmployees() {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.names AS "Department Names", roles.salary, CONCAT(manager.first_name, " ", manager.last_name) AS "Manager" FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id', (err, results) => {
        if (err) {
            throw err
        }
        console.table(results)
        promptList();
    });
};


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
            console.log('Added new department!')
            promptList();
        });
   });
};

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
                console.log('Added new role!');
                promptList();

            });
        });
        
    });
  });
};

function addEmployee() {
    db.query('SELECT * FROM roles', 'SELECT * FROM employees', function (err, results) {
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
            choices: results.map(roles => `${roles.title}`)
        },
        {
            type: 'rawlist',
           message: 'Who is their manager?',
           name: 'manager',
           choices: results.map(employees => `${employees.manager_id}`)
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

            db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [firstName, lastName, roleID, manager], (err, results) => {
                    if (err) {
                        throw err
                    }
                    console.log('Added new employee!')
                    promptList();
            });
        });
    });
  });
};


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
                        console.log('Updated employee role!');
                        promptList();
                    });
                });
            });
        });
    });
}

