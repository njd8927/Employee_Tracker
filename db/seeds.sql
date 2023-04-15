INSERT INTO department (name) VALUES 
('Accounting'), 
('Legal'),
('Human Resources'),
('Sales'),
('Customer Service');


INSERT INTO role (title, salary, department_id) VALUES
('Controller', 150000, 1),
('Senior Counsel', 300000, 2),
('HR Manager', 100000, 3),
('VP of Sales', 125000, 4),
('CS Manager', 70000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Chrissy', 'Zentai', 2, 1),
('Nick', 'Zentai', 5, 2),
('Riley', 'Zentai', 3, 3),
('Mike', 'Zentai', 4, 4),
('Zsolt', 'Zentai', 1, 5);

