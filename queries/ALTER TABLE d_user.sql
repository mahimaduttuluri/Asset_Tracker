ALTER TABLE d_user
ADD CONSTRAINT fk_d_user_client
FOREIGN KEY (client_key)
REFERENCES d_client (client_key)
ON DELETE CASCADE;