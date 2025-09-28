---- RESPONSABLE:JUAN


CREATE TABLE tb_users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_dni VARCHAR(8) NOT NULL UNIQUE,
    user_role_id INT NOT NULL,
    user_state VARCHAR(1) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_users_role_role_id FOREIGN KEY (user_role_id) REFERENCES tb_roles(role_id)

);