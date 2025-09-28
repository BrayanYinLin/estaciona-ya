-- Responsable: Jeanpol

CREATE TABLE tb_garage_photos (
    garage_photo_id INT AUTO_INCREMENT PRIMARY KEY,
    garage_id INT,
    garage_url VARCHAR(255),

    CONSTRAINT fk_garage_photos_garage_id_garages FOREIGN KEY (garage_id) REFERENCES tb_garages(garage_id)
);
