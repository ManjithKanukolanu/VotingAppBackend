➡ Live Link :
https://votingapp-e209.onrender.com

➡ Voting Application - Backend
This is a backend application for a voting system built with Node.js, Express.js, and MongoDB. It enables users to vote for candidates, manage candidates, and authenticate securely using JWT (JSON Web Tokens). The application includes roles for users and admins, with different access controls for each.

➡ Features


· User Authentication:
     ‣ Users can sign up and log in using their Aadhar Card Number and password.
     ‣ Secure login and session management with JSON Web Tokens (JWT).
     
· Voting System:
     ‣ Users can view the list of candidates and vote for them (only once).
     ‣ Only one Admin can manage the candidate list (add, update, delete).
     ‣ Admin are restricted from voting.
     
· Candidate Management:
     ‣ Users can view and update their profile information.
     ‣ Users can change their password.
    
➡ Technologies Used

· Node.js: JavaScript runtime for building server-side applications.
· Express.js: Web framework for Node.js to handle HTTP requests and routing.
· MongoDB: NoSQL database for storing user and candidate data.
· JSON Web Tokens (JWT): Secure user authentication with token-based login.

➡ API Endpoints

 ‣ Authentication
   · Sign Up
      ‣ POST /signup: Sign up a user.
   · Login
       ‣ POST /login: Log in a user.
       
 ‣ Candidates
   · Get Candidates
       ‣ GET /candidates: Retrieve the list of candidates.
   · Add Candidate
       ‣ POST /candidates: Add a new candidate (Admin only).
   · Update Candidate
       ‣ PUT /candidates/:id: Update a candidate by ID (Admin only).
   · Delete Candidate
       ‣ DELETE /candidates/:id: Delete a candidate by ID (Admin only).
       
‣ Voting
   · Get Vote Count
      ‣ GET /candidates/vote/count: Get the vote count for each candidate.
   · Vote for Candidate
      ‣ POST /candidates/vote/:id: Vote for a candidate (User only).
      
‣ User Profile
   · Get Profile
      ‣ GET /users/profile: Retrieve user profile information.
   · Change Password
      ‣ PUT /users/profile/password: Change the user's password.
