INSERT INTO behaviors (title, description, class) VALUES ('drinking','# of glasses','count');
INSERT INTO behaviors (title, description, class) VALUES ('drinking','amount of time','duration');
INSERT INTO behaviors (title, description, class) VALUES ('eating','# of apples','count');
INSERT INTO behaviors (title, description, class) VALUES ('eating','amount of time','duration');

INSERT INTO templates (title, description) VALUES ('classroom','normal behaviors');
INSERT INTO templates (title, description) VALUES ('workplace','normal behaviors');
INSERT INTO templates (title, description) VALUES ('classroom','bad behaviors');
INSERT INTO templates (title, description) VALUES ('social experiment','nervous reactions');

INSERT INTO subjects (first_name, last_name, comment) VALUES ('John','Doe','Kindergarden');
INSERT INTO subjects (first_name, last_name, comment) VALUES ('Sarah','May','Kindergarden');
INSERT INTO subjects (first_name, last_name, comment) VALUES ('Scooby','Doo','Kindergarden');

INSERT INTO sessions (title, comment, time_start, time_stop) VALUES ('Behavior review #1','Sample review', now(), now());
INSERT INTO sessions (title, comment, time_start, time_stop) VALUES ('Behavior review #2','Sample review', now(), now());
INSERT INTO sessions (title, comment, time_start, time_stop) VALUES ('Behavior review #3','Sample review', now(), now());

INSERT INTO bridge_behaviors_templates (behavior_id, template_id) VALUES (1,1);
INSERT INTO bridge_behaviors_templates (behavior_id, template_id) VALUES (2,1);
INSERT INTO bridge_behaviors_templates (behavior_id, template_id) VALUES (3,1);
INSERT INTO bridge_behaviors_templates (behavior_id, template_id) VALUES (4,1);
INSERT INTO bridge_behaviors_templates (behavior_id, template_id) VALUES (1,2);
INSERT INTO bridge_behaviors_templates (behavior_id, template_id) VALUES (2,2);
INSERT INTO bridge_behaviors_templates (behavior_id, template_id) VALUES (3,2);
INSERT INTO bridge_behaviors_templates (behavior_id, template_id) VALUES (4,2);

INSERT INTO bridge_behaviors_sessions (behavior_id, session_id) VALUES (1,1);
INSERT INTO bridge_behaviors_sessions (behavior_id, session_id) VALUES (2,1);
INSERT INTO bridge_behaviors_sessions (behavior_id, session_id) VALUES (3,1);
INSERT INTO bridge_behaviors_sessions (behavior_id, session_id) VALUES (1,2);
INSERT INTO bridge_behaviors_sessions (behavior_id, session_id) VALUES (2,2);
INSERT INTO bridge_behaviors_sessions (behavior_id, session_id) VALUES (3,2);

INSERT INTO bridge_templates_sessions (templates_id, session_id) VALUES (2,3);

INSERT INTO bridge_sessions_subject (session_id, subject_id) VALUES (1,1);
INSERT INTO bridge_sessions_subject (session_id, subject_id) VALUES (2,1);
INSERT INTO bridge_sessions_subject (session_id, subject_id) VALUES (3,2);

INSERT INTO behavior_values (behavior_id, session_id, subject_id, value) VALUES (1,1,1,5);
INSERT INTO behavior_values (behavior_id, session_id, subject_id, value) VALUES (2,1,1,6);
INSERT INTO behavior_values (behavior_id, session_id, subject_id, value) VALUES (3,1,1,10);

INSERT INTO behavior_values (behavior_id, session_id, subject_id, value) VALUES (1,2,1,2);
INSERT INTO behavior_values (behavior_id, session_id, subject_id, value) VALUES (2,2,1,3);
INSERT INTO behavior_values (behavior_id, session_id, subject_id, value) VALUES (3,2,1,5);

