-- Responsable: Jeanpol

CREATE TABLE tb_bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    garage_id INT,
    owner_id INT,
    start_dt DATETIME,
    end_dt DATETIME,
    status ENUM('pending', 'rejected', 'unpaid', 'cancelled', 'paid', 'completed', 'expired'),
    total DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_bookings_garage_id_garages FOREIGN KEY (garage_id) REFERENCES tb_garages(garage_id),
    CONSTRAINT fk_bookings_owner_id_users FOREIGN KEY (owner_id) REFERENCES tb_users(user_id)
);
