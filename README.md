
This is an API in which  a user can create, delete, update  profiles. 
A user can have multiple profiles, the profile contains three parameters i.e  
1. Game
2. Title
3. Discription.



Authentication


Route to crete user : http://localhost:3000/api/auth/create   // gives back jwt token

Route to login user : http://localhost:3000/api/auth/login     


Profiles CRUD  __ Login requrired 


Route to createprofile : http://localhost:3000/api/profiles/createprofile

Route to fetch all profiles of a user :http://localhost:3000/api/profiles/fetchprofiles           

Route to update profile :http://localhost:3000/api/profiles/updateprofile/:id

Route to delete profile : http://localhost:3000/api/profiles/deleteprofile/:id


