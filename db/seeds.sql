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

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("John", "Doe", 1),
       ("Jane", "Dee", 2),
       ("Harry", "Smith", 3),
       ("Caroline", "White", 4),
       ("George", "Jones", 5),
       ("Celia", "Williams", 6),
       ("Michael", "Garcia", 7),
       ("Cheryl", "Johnson", 8),
       ("Gary", "Brown", 9),
       ("Christina", "Lee", 10);