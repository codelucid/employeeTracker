USE employee_trackerDB;



-- Insert values into rows in table "department"
INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");


-- Insert values into rows in the table "role"
INSERT INTO role (title, salary, department_id)
VALUES
("Sales Lead", 100000, 1),
("Sales Person", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Account Manager", 160000, 3),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);


-- Insert values into rows in the table "employee"
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 2, 2),
("Mike", "Chan", 1, null),
("Ashley", "Rodriquez", 4, 4),
("Kevin", "Tupik", 3, null),
("Kunal", "Singh", 6, 6),
("Malia", "Brown", 5, null),
("Billy", "Bo", 8, 8),
("Sarah", "Smith", 7, null);