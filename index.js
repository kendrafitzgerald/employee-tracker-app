const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sampson423',
    database: 'employeetracker_db'

});

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

function viewDepartments() {
    db.query('SELECT * FROM departments', (err, results) => {
        if (err) {
            throw err;
        } 
        console.table(results);
    });
};

function viewRoles() {
    db.query('SELECT roles.title, roles.id, departments.names, roles.salary FROM roles INNER JOIN departments ON roles.department_id = departments.id', (err, results) => {
        if (err) {
            throw err;
        }
        console.table(results)
    });
};

function viewEmployees() {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.names AS "Department Names", roles.salary FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id', (err, results) => {
        if (err) {
            throw err
        }
        console.table(results)
    });
};