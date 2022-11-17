CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS behaviors (
    id serial PRIMARY KEY,
    title VARCHAR ( 100 ) NOT NULL,
    description VARCHAR ( 255 ),
    class VARCHAR ( 100 ),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS templates (
    id serial PRIMARY KEY,
    title VARCHAR ( 100 ) NOT NULL,
    description VARCHAR ( 255 ),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subjects (
    id serial PRIMARY KEY,
    first_name VARCHAR ( 100 ),
    last_name VARCHAR ( 100 ),
    comment VARCHAR ( 255 ),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
    id serial PRIMARY KEY,
    title VARCHAR ( 100 ),
    comment VARCHAR ( 255 ),
    time_start TIMESTAMP,
    time_stop TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS bridge_behaviors_templates (
    id serial PRIMARY KEY,
    behavior_id int REFERENCES behaviors (id) ON UPDATE CASCADE ON DELETE CASCADE,
    template_id int REFERENCES templates (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS bridge_behaviors_sessions (
    id serial PRIMARY KEY,
    behavior_id int REFERENCES behaviors (id) ON UPDATE CASCADE ON DELETE CASCADE,
    session_id int REFERENCES sessions (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS bridge_templates_sessions (
    id serial PRIMARY KEY,
    templates_id int REFERENCES templates (id) ON UPDATE CASCADE ON DELETE CASCADE,
    session_id int REFERENCES sessions (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bridge_sessions_subject (
    id serial PRIMARY KEY,
    session_id int REFERENCES sessions (id) ON UPDATE CASCADE ON DELETE CASCADE,
    subject_id int REFERENCES subjects (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(session_id)
);

CREATE TABLE IF NOT EXISTS behavior_values (
    id serial PRIMARY KEY,
    behavior_id int REFERENCES behaviors (id) ON UPDATE CASCADE ON DELETE CASCADE,
    session_id int REFERENCES sessions (id) ON UPDATE CASCADE ON DELETE CASCADE,
    subject_id int REFERENCES subjects (id) ON UPDATE CASCADE ON DELETE CASCADE,
    value int,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON behaviors
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON templates
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON subjects
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON sessions
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON bridge_behaviors_templates
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON bridge_behaviors_sessions
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON bridge_templates_sessions
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON bridge_sessions_subject
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON behavior_values
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();










