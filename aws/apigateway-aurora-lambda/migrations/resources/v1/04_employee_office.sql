create table employee_office (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    office_id INT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT employee_office_id UNIQUE (id),
    CONSTRAINT employee_id_fk FOREIGN KEY (employee_id) REFERENCES employees (id),
    CONSTRAINT office_id_fk FOREIGN KEY (office_id) REFERENCES offices (id)
);