-- migrate:up
ALTER TABLE users ADD COLUMN phone_number VARCHAR(10) NOT NULL UNIQUE;

-- migrate:down
ALTER TABLE users DROP COLUMN phone_number;
