CREATE TABLE d_client (
    client_key INTEGER NOT NULL,
    client_code VARCHAR(50) NOT NULL,
    client_name VARCHAR(255) NOT NULL,

    ctr_hh INTEGER,
    ctr_min INTEGER,

    server_name VARCHAR(255),
    db_server_name VARCHAR(255),
    db_user_name VARCHAR(50),
    db_password BYTEA,

    db_name VARCHAR(255) NOT NULL,
    db_con_str VARCHAR(3000),

    client_logo TEXT,
    application_name VARCHAR(255),

    is_active VARCHAR(5) NOT NULL,

    record_created_user_key INTEGER,
    record_created_timestamp TIMESTAMP,
    record_modified_user_key INTEGER,
    record_modified_timestamp TIMESTAMP,

    CONSTRAINT pk_d_client PRIMARY KEY (client_key),
    CONSTRAINT uk_d_client UNIQUE (client_code)
);