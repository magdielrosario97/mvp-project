TRUNCATE poster RESTART IDENTITY;
TRUNCATE forum RESTART IDENTITY;

INSERT INTO poster (firstName, lastName, username, email, userLocation, aboutMe) 
VALUES 
    ('Magdiel', 'Rosario', 'magdielrosario97', 'magdielrosario97@gmail.com', 'Navarre, FL', 'SWE Student');

INSERT INTO forum (time, username, title, post) 
VALUES 
    (now(), 
    'magdielrosario97', 
    'Welcome to my Formula 1 Blog Page', 
    'Feel free to post anything you would like. This is currently the only 
    functional page as I have to migrate all of the other pages. Please refrain from editing other users posts. 
    I will be adding using user authentication in the near future to keep your posts safe.');