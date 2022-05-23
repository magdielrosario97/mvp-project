TRUNCATE poster RESTART IDENTITY;
TRUNCATE forum RESTART IDENTITY;

INSERT INTO poster (first_name, last_name, username, email) VALUES ('Magdiel', 'Rosario', 'magdielrosario97', 'magdielrosario97@gmail.com');

INSERT INTO forum (time, title, body) VALUES (now(), 'Lorem Ipsum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent venenatis mi sed velit volutpat, pellentesque gravida enim imperdiet. Vivamus vitae scelerisque quam. Maecenas ac rhoncus sem.')