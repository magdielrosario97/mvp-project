-- DROP DATABASE IF EXISTS f1_blog;
DROP TABLE IF EXISTS forum;
DROP TABLE IF EXISTS poster;
DROP TABLE IF EXISTS comment;

-- CREATE DATABASE f1_blog;
-- \c f1_blog

CREATE TABLE forum(
    post_id SERIAL PRIMARY KEY,
    time TIMESTAMP,
    title VARCHAR(60),
    post TEXT
);

CREATE TABLE poster(
    poster_id SERIAL PRIMARY KEY,
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(80),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    userLocation VARCHAR(100),
    aboutMe TEXT
);

CREATE TABLE comment(
    comment_id SERIAL PRIMARY KEY,
    time TIMESTAMP,
    body TEXT NOT NULL
);

ALTER TABLE forum ADD poster_id INTEGER REFERENCES poster(poster_id) ON DELETE CASCADE;

ALTER TABLE poster ADD post_id INTEGER REFERENCES forum(post_id) ON DELETE CASCADE;
ALTER TABLE poster ADD comment_id INTEGER REFERENCES comment(comment_id) ON DELETE CASCADE;

ALTER TABLE comment ADD post_id INTEGER REFERENCES forum(post_id) ON DELETE CASCADE;

\i database/seed.sql