DO $$ 
  DECLARE 
    r RECORD;
BEGIN
  FOR r IN 
    (
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema=current_schema()
    ) 
  LOOP
     EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.table_name) || ' CASCADE';
  END LOOP;
END $$ ;
