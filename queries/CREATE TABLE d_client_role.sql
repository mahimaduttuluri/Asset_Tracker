CREATE TABLE d_client_role (
    client_role_key SERIAL PRIMARY KEY,
    client_key INTEGER,
    role_code VARCHAR(50) NOT NULL,
    role_name VARCHAR(255) NOT NULL,
    is_active VARCHAR(5) NOT NULL,

    record_created_user_key INTEGER,
    record_created_timestamp TIMESTAMP,
    record_modified_user_key INTEGER,
    record_modified_timestamp TIMESTAMP,

    CONSTRAINT uk_d_client_role UNIQUE (client_key, role_code)
);