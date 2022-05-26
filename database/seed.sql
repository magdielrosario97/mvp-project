TRUNCATE poster RESTART IDENTITY;
TRUNCATE forum RESTART IDENTITY;

INSERT INTO poster (firstName, lastName, username, email, userLocation, aboutMe) 
VALUES 
    ('Magdiel', 'Rosario', 'magdielrosario97', 'magdielrosario97@gmail.com', 'Navarre, FL', 'SWE Student');

INSERT INTO forum (time, username, title, post) 
VALUES 
    (now(), 'magdielrosario97', 'Lorem Ipsum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent venenatis mi sed velit volutpat, pellentesque gravida enim imperdiet. Vivamus vitae scelerisque quam. Maecenas ac rhoncus sem.');