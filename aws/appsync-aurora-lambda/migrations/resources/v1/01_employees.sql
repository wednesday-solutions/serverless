create table employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_name VARCHAR(36) UNIQUE NOT NULL,
    office_id INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);