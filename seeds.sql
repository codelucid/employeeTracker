USE employee_trackerDB;



-- Insert values into rows in table "department"
INSERT INTO department (name)
VALUES ("Sales"), ("Emgineering"), ("Finance"), ("Legal");





-- Insert values into rows in the table "role"
INSERT INTO role (title)
VALUES ("Sales Lead"), ("Sales Person"), ("Lead Engineer"), ("Software Engineer"), ("Account Manager"), ("Accountant"), ("Legal Team Lead"), ("Lawyer");

INSERT INTO role (salary)
VALUES ("100,000"), ("80,000"), ("150,000"), ("120,000"), ("160,000"), ("125,000"), ("250,000"), ("190,000");

-- NEED TO DO A JOIN WITH TABLE DEPARTMENT
INSERT INTO role (department_id)
-- VALUES ("Sales"), ("Sales"), ("Engineering"), ("Engineering"), ("Finance"), ("Finance"), ("Legal"), ("Legal");






-- Insert values into rows in the table "employee"
INSERT INTO employee (first_name)
VALUES ("John"), ("Mike"), ("Ashley"), ("Kevin"), ("Kunal"), ("Malia");

INSERT INTO employee (last_name)
VALUES ("Doe"), ("Chan"), ("Rodriquez"), ("Tupik"), ("Singh"), ("Brown");

-- NEED TO DO A JOIN WITH TABLE ROLE
INSERT INTO employee (role_id)
-- VALUES ("blah"), ("blah"), ("blah"), ("blah");

-- THIS IS JOINED FROM TABLE EMPLOYEE-JOINED FROM WITHIN
INSERT INTO employee (manager_id)
-- VALUES ("blah"), ("blah"), ("blah"), ("blah");