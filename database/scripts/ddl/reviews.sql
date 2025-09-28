-- Responsable: Jeanpol

CREATE TABLE tb_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    renter_id INT,
    rating INT,
    comment TEXT,

    CONSTRAINT fk_reviews_booking_id_bookings FOREIGN KEY (booking_id) REFERENCES tb_bookings(booking_id),
    CONSTRAINT fk_reviews_renter_id_users FOREIGN KEY (renter_id) REFERENCES tb_users(user_id)
);
