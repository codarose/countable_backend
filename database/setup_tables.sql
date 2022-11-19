CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS classes (
    id serial PRIMARY KEY,
    type VARCHAR ( 100 ),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS behaviors (
    id serial PRIMARY KEY,
    title VARCHAR ( 100 ) NOT NULL,
    comment VARCHAR ( 255 ),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS templates (
    id serial PRIMARY KEY,
    title VARCHAR ( 100 ) NOT NULL,
    duration int,
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
    environment VARCHAR ( 100 ),
    comment VARCHAR ( 255 ),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bridge_behaviors_classes (
    id serial PRIMARY KEY,
    behavior_id int REFERENCES behaviors (id) ON UPDATE CASCADE ON DELETE CASCADE,
    class_id int REFERENCES classes (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bridge_sessions_behaviors_classes (
    id serial PRIMARY KEY,
    session_id int REFERENCES sessions (id) ON UPDATE CASCADE ON DELETE CASCADE,
    behavior_class_id int REFERENCES bridge_behaviors_classes (id) ON UPDATE CASCADE ON DELETE CASCADE,
    count int,
    start_time TIMESTAMP,
    stop_time TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
	
CREATE TABLE IF NOT EXISTS bridge_templates_behaviors_classes (
    id serial PRIMARY KEY,
    template_id int REFERENCES templates (id) ON UPDATE CASCADE ON DELETE CASCADE,
    behavior_class_id int REFERENCES bridge_behaviors_classes (id) ON UPDATE CASCADE ON DELETE CASCADE,
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


CREATE TRIGGER set_timestamp
BEFORE UPDATE ON classes 
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

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
BEFORE UPDATE ON bridge_behaviors_classes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON bridge_sessions_behaviors_classes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON bridge_templates_behaviors_classes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON bridge_sessions_subject
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
