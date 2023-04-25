# employee-tracker-app

## Description

I was motivated to build a command line application that allows a business owner to keep track of, and update, company data--including departments, roles, and employee data. I built this project so the head of a company could easily view important details about their employees and departments, as well as add new values to these datasets or update them. This project solves multiple problems. The first problem it solves is giving a business owner the ability to view all departments of their company and add new departments to their company. The second problem this app solves is allowing a business owner to view all roles in their company along with that roles salary and department, and the ability to add a new role to their database. The third problem the app solves is allowing the user to view all employees of their company, along with their role, department, salary and manager status or manager they are assigned to. The app also gives the business owner the opportunity to add a new employee and assign them a role and manager, or update a previous employee's role. Moreover, the app gives each role, department, and employee an associated ID. Overall, the app gives business owners a singular location where they can easily access important company information through the command line. It utilizes MySql, MySql 2, Inquirer, Node JS, and JavaScript. I learned how to connect MySql databases to node to create a backend application that can easily access and transform data in a localized database.


## Installation

To install this project, clone the repo and run node index.js in your terminal. The application will begin once you do this. 

## Usage

To begin the application, run node index.js in your terminal. A list of prompts will populate in your terminal, and you can use your arrow keys to navigate through each prompt, hitting enter to lock in your choice. If you click "View All Departments", "View All Roles", or "View All Employees", a table will render on screen with the associated data. You will notice that the original prompt list will appear under these tables, allowing you to continue navigating through the list if you wish to choose a new option. If you click "Add a Department", "Add a Role", "Add an Employee", or "Update an Employee Role", you will be met with a series of corresponding prompts that will allow you to input new data or select pre-existing data to be included in the updates. You will notice that once these prompts are answered correctly, a message will notify you of the success in changing the database, and the original prompt list will repopulate under the message. Moreover, if you View All after updating departments, roles, or employees, your new data will be in the specified table. Below is a video walkthrough of the application that depicts its usage. 

[Walkthrough Video for Employee Tracker App](https://drive.google.com/file/d/13mydzZWi0pzDuB5eg_Fx4jNIstAkcU9N/view)

## Credits

This project uses the following npm packages: MySql2, inquirer, and console.table. Screencastify was used to create the walkthrough video.


## How to Contribute

If you would like to contribute to this app, please reach out to me via email at kendrajfitzgerald@gmail.com. I would love any input on how to improve this application!
