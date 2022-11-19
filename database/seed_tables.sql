INSERT INTO classes (type) values ('count');
INSERT INTO classes (type) values ('duration');

INSERT INTO behaviors (title, comment) VALUES ('drinking','# of glasses');
INSERT INTO behaviors (title, comment) VALUES ('drinking','amount of time');
INSERT INTO behaviors (title, comment) VALUES ('eating','# of glasses');
INSERT INTO behaviors (title, comment) VALUES ('eating','amount of time');

INSERT INTO templates (title, duration) VALUES ('classroom', 3600);
INSERT INTO templates (title, duration) VALUES ('workplace', 3600);
INSERT INTO templates (title, duration) VALUES ('classroom',3600);
INSERT INTO templates (title, duration) VALUES ('social experiment',3600);

INSERT INTO subjects (first_name, last_name, comment) VALUES ('John','Doe','Kindergarden');
INSERT INTO subjects (first_name, last_name, comment) VALUES ('Sarah','May','Kindergarden');
INSERT INTO subjects (first_name, last_name, comment) VALUES ('Scooby','Doo','Kindergarden');

INSERT INTO sessions (title, environment, comment) VALUES ('Behavior review #1','indoors','Sample review');
INSERT INTO sessions (title, environment, comment) VALUES ('Behavior review #2','indoors','Sample review');
INSERT INTO sessions (title, environment, comment) VALUES ('Behavior review #3','indoors','Sample review');

INSERT INTO bridge_behaviors_classes (behavior_id, class_id) VALUES (1,1);
INSERT INTO bridge_behaviors_classes (behavior_id, class_id) VALUES (2,2);
INSERT INTO bridge_behaviors_classes (behavior_id, class_id) VALUES (3,1);
INSERT INTO bridge_behaviors_classes (behavior_id, class_id) VALUES (4,2);

INSERT INTO bridge_sessions_behaviors_classes (session_id,behavior_class_id,count, start_time, stop_time) VALUES (1,1,5,null,null);
INSERT INTO bridge_sessions_behaviors_classes (session_id,behavior_class_id,count, start_time, stop_time) VALUES (1,2,null,now(),now());
INSERT INTO bridge_sessions_behaviors_classes (session_id,behavior_class_id,count, start_time, stop_time) VALUES (1,3,8,null,null);
INSERT INTO bridge_sessions_behaviors_classes (session_id,behavior_class_id,count, start_time, stop_time) VALUES (1,4,null,now(),now());

INSERT INTO bridge_templates_behaviors_classes (template_id, behavior_class_id) VALUES (1,1);
INSERT INTO bridge_templates_behaviors_classes (template_id, behavior_class_id) VALUES (1,2);
INSERT INTO bridge_templates_behaviors_classes (template_id, behavior_class_id) VALUES (1,3);
INSERT INTO bridge_templates_behaviors_classes (template_id, behavior_class_id) VALUES (1,4);
INSERT INTO bridge_templates_behaviors_classes (template_id, behavior_class_id) VALUES (2,3);
INSERT INTO bridge_templates_behaviors_classes (template_id, behavior_class_id) VALUES (2,4);
INSERT INTO bridge_templates_behaviors_classes (template_id, behavior_class_id) VALUES (3,2);


INSERT INTO bridge_sessions_subject (session_id, subject_id) VALUES (1,1);
INSERT INTO bridge_sessions_subject (session_id, subject_id) VALUES (2,1);
INSERT INTO bridge_sessions_subject (session_id, subject_id) VALUES (3,2);

