CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  userPrivilege TEXT NOT NULL DEFAULT 'User'
);

UPDATE users SET userPrivilege='Admin' WHERE id=1;

CREATE TABLE events (
  id INTEGER PRIMARY KEY, 
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  day INTEGER,
  month TEXT,
  year INTEGER,
  image TEXT
);

CREATE TABLE userEvents (
  idUser INTEGER,
  idEvent INTEGER,
  PRIMARY KEY (idUser, idEvent),
  FOREIGN KEY (idUser) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (idEvent) REFERENCES events (id) ON DELETE CASCADE
)

INSERT INTO events (name, description) VALUES ('Event 1', 'Event 1 description');
INSERT INTO events (name, description) VALUES ('Event 2', 'Event 2 description');
INSERT INTO events (name, description) VALUES ('Event 3', 'Event 3 description');
INSERT INTO events (name, description) VALUES ('Event 4', 'Event 4 description');
INSERT INTO events (name, description) VALUES ('Event 5', 'Event 5 description');

DROP TABLE users;
DROP TABLE events;
DROP TABLE userEvents

DELETE FROM events WHERE id = 4;

SELECT * FROM users;
SELECT * FROM events;
SELECT * from userEvents;

INSERT INTO userEvents (idUser, idEvent) VALUES ('1', '4'), ('2', '1'), ('2', '3'), ('1', '2');

SELECT users.username, events.name FROM users
INNER JOIN userEvents ON userEvents.idUser = users.id
INNER JOIN events ON userEvents.idEvent = events.id
WHERE
users.id = 1;

DELETE FROM userEvents WHERE idUser = 1 and idEvent = 2;

PRAGMA TABLE_info(events);

.tables