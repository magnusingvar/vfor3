CREATE TABLE users (
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE events (
  id INTEGER PRIMARY KEY, 
  name TEXT NOT NULL
);

DROP TABLE users;

SELECT * FROM users;
SELECT * FROM events;

.tables