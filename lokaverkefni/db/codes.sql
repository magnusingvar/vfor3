CREATE TABLE users (
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE events (
  id INTEGER PRIMARY KEY, 
  name TEXT NOT NULL,
  description TEXT,
  imgLink TEXT DEFAULT 'imgNotFound.jpg'
);

INSERT INTO events (name, description) VALUES ('Event 5', 'Event 5 description');

DROP TABLE users;
DROP TABLE events;

SELECT * FROM users;
SELECT * FROM events;

.tables