CREATE TABLE d_user_role_mapping (
    user_role_map_key SERIAL PRIMARY KEY,
    user_key INTEGER NOT NULL,
    client_role_key INTEGER NOT NULL,
    is_active VARCHAR(5) NOT NULL,

    record_created_user_key INTEGER,
    record_created_timestamp TIMESTAMP,
    record_modified_user_key INTEGER,
    record_modified_timestamp TIMESTAMP,

    CONSTRAINT uk_d_user_role_mapping UNIQUE (user_key, client_role_key)
);