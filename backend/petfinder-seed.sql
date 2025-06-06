-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        TRUE);



INSERT INTO pets (name, age, breed, species,image, username)
VALUES ('Fido', 1, 'Golden Lab', 'Dog', 
'https://www.dogstrust.org.uk/images/800x600/assets/2024-11/labrador-puppy-running-2022.jpg', 'testuser'),
       ('Nubs', 5, 'Pug','Dog', 
       'https://images.aeonmedia.co/images/acd6897d-9849-4188-92c6-79dabcbcd518/essay-final-gettyimages-685469924.jpg?width=3840&quality=75&format=auto', 'testuser'),
       ('Grey', 10, 'German Shepherd','Dog', 
       'https://image.petmd.com/files/styles/863x625/public/2024-06/hip-dysplasia-in-dogs.jpg', 'testuser'),
       ('Fraggles', 6, 'Boxer', 'Dog', 
       'https://cdn.britannica.com/46/233846-050-8D30A43B/Boxer-dog.jpg', 'testuser' ),       
       ('Sparky', 8, 'Black Lab', 'Dog', 
       'https://dogtime.com/wp-content/uploads/sites/12/2024/01/GettyImages-590608307-e1706029609404.jpg?w=1024', 'testuser'),
       ('Grumples', 3, 'Tabby', 'Cat', 
       'https://plus.unsplash.com/premium_photo-1667030474693-6d0632f97029?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fHww',
       'testuser'),
       ('Mr Mittens', 1, 'tabby', 'Cat', 
       'https://burst.shopifycdn.com/photos/cute-curious-cat.jpg?width=1000&format=pjpg&exif=0&iptc=0', 'testuser'),
       ('Rascal', 4, 'Guinea Pig', 'Other Animals', 
       'https://oxbowanimalhealth.com/wp-content/uploads/2024/08/shutterstock_1715248687-american.jpg', 'testuser'),
       ('Fluffles', 5, 'Rabbit', 'Other Animals', 
       'https://rabbit.org/wp-content/uploads/2024/01/rew-keithus-4x6-Keithius-2725203756-gus_closeup-2008-08-02-pet-rabbit-bunny-houserabbit-1024x683.jpg', 'testuser'),
       ('Flandre', 1,  'Rabbit', 'Other Animals', 
       'https://www.caldervets.co.uk/images/pet-care/rabbits/rabbits-how-to-care-for-a-new-pet-rabbit-01.jpg', 'testuser'),
       ('Scales', 6,  'Bearded Dragon', 'Other Animals', 
       'https://www.bushheritage.org.au/cdn-cgi/image/quality=90,format=auto,width=400,gravity=0.5x0.5,fit=scale-down/https://www.bushheritage.org.au/uploads/main/Images/Places/Qld/ethabuka/RS2561-bearded-dragon-lawler.jpg',
       'testuser'),
       ('Gills', 3, 'Fish', 'Other Animals', 'https://www.aqueon.com/-/media/project/oneweb/aqueon/us/blog/10-best-pet-fish/shutterstock_388323586.jpg?h=333&w=500&hash=85C0169EA1B8C41BD6B306501D282D6A',
       'testuser');
       
      