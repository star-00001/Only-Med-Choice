CREATE TYPE volume_level AS ENUM (
    'LOW',
    'MODERATE',
    'HIGH'
);

CREATE TABLE hospital (
    hospital_id SERIAL PRIMARY KEY,
    hospital_name VARCHAR(150) NOT NULL,
    location VARCHAR(150)
);

CREATE TABLE patient_visit (
    visit_id UUID PRIMARY KEY,
    hospital_id INT NOT NULL,
    check_in_time TIMESTAMP NOT NULL,
    check_out_time TIMESTAMP,
    visit_date DATE NOT NULL,

    CONSTRAINT fk_patient_visit_hospital
        FOREIGN KEY (hospital_id)
        REFERENCES hospital(hospital_id)
        ON DELETE CASCADE
);

CREATE TABLE live_queue_status (
    hospital_id INT PRIMARY KEY,
    current_waiting_count INT NOT NULL,
    active_doctors INT NOT NULL,
    avg_consult_time_min INT NOT NULL,
    busyness_level volume_level NOT NULL,
    estimated_wait_time_min INT,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_live_queue_hospital
        FOREIGN KEY (hospital_id)
        REFERENCES hospital(hospital_id)
        ON DELETE CASCADE
);

CREATE INDEX idx_patient_visit_hospital
ON patient_visit (hospital_id);

CREATE INDEX idx_patient_visit_checkin_time
ON patient_visit (check_in_time);


SELECT
    TO_CHAR(visit_date, 'Dy') AS day,
    COUNT(*) AS patient_count
FROM patient_visit
GROUP BY day
ORDER BY patient_count DESC;

SELECT
    TO_CHAR(visit_date, 'Day') AS day_of_week,
    COUNT(*) AS patient_count
FROM patient_visit
GROUP BY day_of_week
ORDER BY patient_count DESC;


SELECT COUNT(DISTINCT check_in_time::date) AS sunday_count
FROM patient_visit
WHERE EXTRACT(DOW FROM check_in_time) = 0;


SELECT COUNT(DISTINCT DATE(check_in_time)) AS unique_days
FROM patient_visit;

SELECT
    EXTRACT(HOUR FROM check_in_time) AS hour,
    COUNT(*) AS patient_count
FROM patient_visit
WHERE hospital_id = 1
  AND check_in_time::date = '2025-12-08'
GROUP BY EXTRACT(HOUR FROM check_in_time)
ORDER BY hour;
