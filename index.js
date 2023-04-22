const inquirer = require('inquirer');

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