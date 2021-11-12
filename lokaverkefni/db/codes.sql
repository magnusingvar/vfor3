CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  userPrivilege TEXT NOT NULL DEFAULT 'User'
);

UPDATE users SET userPrivilege='Admin' WHERE id=1;

CREATE TABLE events (
  id INTEGER PRIMARY KEY, 
  name TEXT NOT NULL,
  description TEXT,
  imgLink TEXT DEFAULT 'imgNotFound.jpg'
);

INSERT INTO events (name, description) VALUES ('Event 1', 'Event 1 description');
INSERT INTO events (name, description) VALUES ('Event 2', 'Event 2 description');
INSERT INTO events (name, description) VALUES ('Event 3', 'Event 3 description');
INSERT INTO events (name, description) VALUES ('Event 4', 'Event 4 description');
INSERT INTO events (name, description) VALUES ('Event 5', 'Event 5 description');

DROP TABLE users;
DROP TABLE events;

SELECT * FROM users;
SELECT * FROM events;

.tables