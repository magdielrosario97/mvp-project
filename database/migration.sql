DROP DATABASE IF EXISTS f1_blog;

CREATE DATABASE f1_blog;
c\ f1_blog
DROP TABLE IF EXISTS forum;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS comment;

CREATE TABLE forum(
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    time DATETIME,
    title VARCHAR(60),
    body TEXT
);

CREATE TABLE user(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(80),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    post_id REFERENCES forum(post_id) ON DELETE CASCADE
    comment_id REFERENCES comment(comment_id) ON DELETE CASCADE
);

CREATE TABLE comment(
    comment_id SERIAL PRIMARY KEY,
    time DATETIME,
    user_id REFERENCES user(user_id) ON DELETE CASCADE,
    body TEXT,
    post_id REFERENCES forum(post_id) ON DELETE CASCADE,
);