USE company_db;

INSERT INTO departments (name)
VALUES ("Finance"),
       ("Human Resources"),
       ("Engineering"),
       ("Sales"),
       ("Manufacturing"),
       ("Distribution"),
       ("Customer Service");

SELECT * FROM departments;

INSERT INTO roles (title, salary, department_id)
VALUES ("Chief Executive Officer", 250000, 1),
    ("Chief Financial Officer", 150000, 1),
    ("Manager Human Resources", 120000, 2),
    ("Director Engineering", 150000, 3),
    ("Lead Engineer", 150000, 3),
    ("Chief Revenue Officer", 200000, 4),
    ("Sales Executive", 200000, 4),
    ("Director Manufacturing", 150000, 5),
    ("Manager Supply Chain", 125000, 6),
    ("Director Customer Support", 110000, 7);

SELECT * FROM roles;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
       ("Sally", "Lewis", 1, null),
       ("Tom", "Holland", 2, 1);

SELECT * FROM employees;
