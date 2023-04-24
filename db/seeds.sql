INSERT INTO departments (names)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 75000, 1),
       ("Salesperson", 60000, 1),
       ("Lead Software Engineer", 120000, 2),
       ("Junior Software Engineer", 90000, 2),
       ("Law Team Lead", 115000, 3),
       ("Lawyer", 85000, 3),
       ("Marketing Lead", 70000, 4),
       ("Marketing Assistant", 50000, 4),
       ("Accountant", 100000, 5),
       ("Account Manager", 70000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Jane", "Dee", 2, 1),
       ("Harry", "Smith", 3, NULL),
       ("Caroline", "White", 4, 3),
       ("Celia", "Williams", 5, NULL),
       ("George", "Jones", 6, 5),
       ("Cheryl", "Johnson", 7, NULL),
       ("Michael", "Garcia", 8, 7),
       ("Gary", "Brown", 9, NULL),
       ("Christina", "Lee", 10, 9);