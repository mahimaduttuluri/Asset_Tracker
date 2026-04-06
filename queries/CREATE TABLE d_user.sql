CREATE TABLE d_user (
    user_key SERIAL PRIMARY KEY,
    user_id VARCHAR(25),
    user_name VARCHAR(255) NOT NULL,
    email_id VARCHAR(100) NOT NULL,
    phone_number VARCHAR(12),
    pwd BYTEA,
    client_key INTEGER,
    is_active VARCHAR(5) NOT NULL,

    record_created_user_key INTEGER,
    record_created_timestamp TIMESTAMP,
    record_modified_user_key INTEGER,
    record_modified_timestamp TIMESTAMP,

    CONSTRAINT uk_d_user_email UNIQUE (email_id)
);