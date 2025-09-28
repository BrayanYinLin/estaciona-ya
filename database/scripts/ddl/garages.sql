-- Responsable: Jeanpol

CREATE TABLE tb_garages (
    garage_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT,
    location_id INT,
    garage_price DECIMAL(10,2),
    garage_description VARCHAR(255),
    garage_covered TINYINT(1),
    garage_has_cameras TINYINT(1),
    garage_restrictions VARCHAR(255),
    garage_state TINYINT(1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_garages_owner_id_users FOREIGN KEY (owner_id) REFERENCES tb_users(user_id),
    CONSTRAINT fk_garages_location_id_locations FOREIGN KEY (location_id) REFERENCES tb_locations(location_id)
);
