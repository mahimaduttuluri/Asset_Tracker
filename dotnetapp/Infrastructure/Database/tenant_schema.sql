-- =========================================================
-- TENANT DATABASE SCHEMA (Transactional)
-- =========================================================

-- -------------------------
-- 1. USERS
-- -------------------------
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password_hash TEXT NOT NULL,
    phone_number VARCHAR(20),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX ux_users_email ON users(email);
CREATE INDEX ix_users_active ON users(is_active);

-- -------------------------
-- 2. ROLES
-- -------------------------
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_code VARCHAR(50) NOT NULL,
    role_name VARCHAR(150) NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX ux_roles_code ON roles(role_code);

-- -------------------------
-- 3. USER ROLE MAPPING
-- -------------------------
CREATE TABLE user_role_mapping (
    user_role_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,

    assigned_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT ux_user_role UNIQUE (user_id, role_id),

    CONSTRAINT fk_urm_user
        FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_urm_role
        FOREIGN KEY (role_id)
        REFERENCES roles (role_id)
        ON DELETE CASCADE
);

-- -------------------------
-- 4. OEM
-- -------------------------
CREATE TABLE oem (
    oem_id SERIAL PRIMARY KEY,
    oem_code VARCHAR(100) NOT NULL,
    oem_name VARCHAR(150) NOT NULL,
    oem_description VARCHAR(255),

    asset_sub_category VARCHAR(100),

    is_solution BOOLEAN NOT NULL DEFAULT FALSE,
    is_live_tracking_supported BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX ux_oem_code ON oem(oem_code);
CREATE INDEX ix_oem_active ON oem(is_active);

-- -------------------------
-- 5. GATEWAY
-- -------------------------
CREATE TABLE gateway (
    gateway_id SERIAL PRIMARY KEY,
    gateway_code VARCHAR(100) NOT NULL,
    gateway_name VARCHAR(150),

    oem_id INTEGER,
    model VARCHAR(100),
    firmware_version VARCHAR(100),

    imei_number VARCHAR(50),
    serial_number VARCHAR(100),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    installed_at TIMESTAMPTZ,
    last_heartbeat_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_gateway_oem
        FOREIGN KEY (oem_id)
        REFERENCES oem (oem_id)
);

CREATE UNIQUE INDEX ux_gateway_code ON gateway(gateway_code);

-- -------------------------
-- 6. ASSET TYPE
-- -------------------------
CREATE TABLE asset_type (
    asset_type_id SERIAL PRIMARY KEY,
    asset_type_code VARCHAR(50) NOT NULL,
    asset_type_name VARCHAR(150) NOT NULL,

    fuel_type VARCHAR(50),
    capacity_unit VARCHAR(50),

    is_critical BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX ux_asset_type_code ON asset_type(asset_type_code);

-- -------------------------
-- 7. ASSET
-- -------------------------
CREATE TABLE asset (
    asset_id SERIAL PRIMARY KEY,
    asset_code VARCHAR(100) NOT NULL,
    asset_name VARCHAR(255),

    asset_type_id INTEGER NOT NULL,
    oem_id INTEGER,
    gateway_id INTEGER,

    serial_number VARCHAR(100),
    registration_number VARCHAR(100),

    manufacture_year INTEGER,
    onboarded_date DATE,

    status VARCHAR(50),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_owned BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ,

    CONSTRAINT fk_asset_type
        FOREIGN KEY (asset_type_id)
        REFERENCES asset_type (asset_type_id),

    CONSTRAINT fk_asset_oem
        FOREIGN KEY (oem_id)
        REFERENCES oem (oem_id),

    CONSTRAINT fk_asset_gateway
        FOREIGN KEY (gateway_id)
        REFERENCES gateway (gateway_id)
);

CREATE UNIQUE INDEX ux_asset_code ON asset(asset_code);
CREATE INDEX ix_asset_active ON asset(is_active);

-- -------------------------
-- 8. JOB
-- -------------------------
CREATE TABLE job (
    job_id SERIAL PRIMARY KEY,
    job_code VARCHAR(100) NOT NULL,
    job_name VARCHAR(200),

    start_date DATE,
    end_date DATE,

    expected_working_hours INTEGER,
    status VARCHAR(50),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX ux_job_code ON job(job_code);

-- -------------------------
-- 9. ASSET JOB MAPPING
-- -------------------------
CREATE TABLE asset_job_mapping (
    asset_job_id SERIAL PRIMARY KEY,

    asset_id INTEGER NOT NULL,
    job_id INTEGER NOT NULL,

    assigned_date DATE NOT NULL,
    unassigned_date DATE,

    is_current BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT ux_asset_job UNIQUE (asset_id, job_id),

    CONSTRAINT fk_aj_asset
        FOREIGN KEY (asset_id)
        REFERENCES asset (asset_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_aj_job
        FOREIGN KEY (job_id)
        REFERENCES job (job_id)
        ON DELETE CASCADE
);