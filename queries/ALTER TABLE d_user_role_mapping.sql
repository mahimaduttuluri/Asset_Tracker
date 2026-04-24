ALTER TABLE d_user_role_mapping
ADD CONSTRAINT fk_urm_user
FOREIGN KEY (user_key)
REFERENCES d_user (user_key)
ON DELETE CASCADE;

ALTER TABLE d_user_role_mapping
ADD CONSTRAINT fk_urm_client_role
FOREIGN KEY (client_role_key)
REFERENCES d_client_role (client_role_key)
ON DELETE CASCADE;