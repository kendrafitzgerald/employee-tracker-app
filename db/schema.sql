/* Deletes database if it exists and creates a new database in its place */
DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;

/* Selects employeetracker_db database for use */
USE employeetracker_db;

/* Creates a table for departments with columns for an auto-incrementing id and department name */
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    names VARCHAR(30)

);
/* Creates a table for roles with columns for an auto-incrementing id, role title, salary, and department_id that renders the department name*/
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL, 
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
/* Creates a table for employees with columns for an auto-incrementing id, employee first and last names, a role id that renders the role title, and a manager id 
that assigns a manager to non-manager employees */
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
