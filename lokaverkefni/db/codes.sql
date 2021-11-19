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
  year INTEGER,
  month INTEGER,
  day INTEGER,
  image TEXT DEFAULT 'imgNotFound.jpg'
);

CREATE TABLE userEvents (
  idUser INTEGER,
  idEvent INTEGER,
  PRIMARY KEY (idUser, idEvent),
  FOREIGN KEY (idUser) REFERENCES users (id),
  FOREIGN KEY (idEvent) REFERENCES events (id)
)

INSERT INTO events (name, description) VALUES ('Event 1', 'Event 1 description');
INSERT INTO events (name, description) VALUES ('Event 2', 'Event 2 description');
INSERT INTO events (name, description) VALUES ('Event 3', 'Event 3 description');
INSERT INTO events (name, description) VALUES ('Event 4', 'Event 4 description');
INSERT INTO events (name, description) VALUES ('Event 5', 'Event 5 description');

DROP TABLE users;
DROP TABLE events;
DROP TABLE userEvents

SELECT * FROM users;
SELECT * FROM events;
SELECT * from userEvents;

PRAGMA TABLE_info(events);

.tables