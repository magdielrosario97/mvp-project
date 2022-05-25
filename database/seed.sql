TRUNCATE poster RESTART IDENTITY;
TRUNCATE forum RESTART IDENTITY;

INSERT INTO poster (firstName, lastName, username, email, userLocation, aboutMe) 
VALUES 
    ('Magdiel', 'Rosario', 'magdielrosario97', 'magdielrosario97@gmail.com', 'Navarre, FL', 'SWE Student'),
    ('Rafael','Floyd','OdessaMann','enim.consequat@yahoo.ca','Kozhikode','dictum eu,'),
    ('Ralph','Mcmillan','DahliaMonroe','nec.ligula@outlook.com','Gebze','id magna et ipsum cursus vestibulum. Mauris magna. Duis'),
    ('Aretha','Juarez','IvanTate','penatibus.et.magnis@aol.org','Kimberley','a feugiat tellus lorem'),
    ('Hope','Pate','HannaAdkins','lectus.rutrum.urna@icloud.ca','Araban','blandit viverra. Donec tempus, lorem fringilla ornare placerat, orci lacus'),
    ('Kamal','Maddox','SummerPowers','quam.curabitur@aol.org','Rovereto','elit, pretium et,');

INSERT INTO forum (time, title, post) 
VALUES 
    (now(), 'Lorem Ipsum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent venenatis mi sed velit volutpat, pellentesque gravida enim imperdiet. Vivamus vitae scelerisque quam. Maecenas ac rhoncus sem.'),
    ('2022-08-27 01:45:06','sagittis semper. Nam tempor diam','dui, semper et, lacinia vitae, sodales at, velit. Pellentesque ultricies'),
    ('2022-10-17 09:51:58','Fusce diam nunc, ullamcorper eu,','sit amet lorem semper auctor. Mauris vel turpis.'),
    ('2021-10-16 17:10:59','Quisque fringilla euismod enim. Etiam','metus. In lorem. Donec elementum, lorem ut'),
    ('2022-03-07 11:24:47','fringilla ornare placerat, orci lacus','auctor odio a purus. Duis elementum, dui quis accumsan convallis,'),
    ('2021-08-28 00:03:04','Phasellus nulla. Integer vulputate, risus','elit elit fermentum risus, at fringilla purus mauris a nunc. In at pede. Cras vulputate velit eu');
