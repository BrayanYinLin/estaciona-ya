---- RESPONSABLE:JUAN
CREATE TABLE tb_payments(
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    method_payment ENUM('cash', 'credit_card', 'debit_card', 'transfer') NOT NULL,
    payment_status VARCHAR(20) NOT NULL,
    boucher VARCHAR(100),
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payments_booking_bookings_id  FOREIGN KEY (booking_id) REFERENCES tb_bookings(booking_id)
)