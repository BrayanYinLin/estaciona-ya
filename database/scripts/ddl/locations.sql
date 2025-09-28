-- Responsable: Jeanpol

CREATE TABLE tb_locations (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    location_adress TEXT,
    location_latitude DECIMAL(9,6),
    location_longitude DECIMAL(9,6),
    district_id INT,

    CONSTRAINT fk_locations_district_id_districts FOREIGN KEY (district_id) REFERENCES tb_districts(district_id)
);
