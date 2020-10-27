create table offices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    office_name VARCHAR(36) UNIQUE NOT NULL,
    office_address VARCHAR(36) NOT NULL,
    employee_id INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT offices_employee_id_fk FOREIGN KEY (employee_id) REFERENCES employees (id)
);