# NextJS & Express Social Media Site

## Tech Stack

- Frontend: Next js App Router with Javascript & Tailwind CSS
- Backend: Express.js with Mongodb
- Styling: Tailwind CSS, NextUI, Shadcn  
- Icons: React Icons, Lucide React  
- Form Handling: Formik with Yup validation  
- AI-Assisted Development: V0.dev, ChatGPT, Gemini 
- Utilities: util  

---

# MERN Social Media App - Project Checklist

---

## **Phase 1: Essential Features (MVP)**

<details>
<summary>Click to expand Phase 1</summary>

- [x] **User Authentication & Authorization**
  - [x] Sign up / Log in / Log out
  - [x] JWT-based authentication
  - [x] Password hashing (bcrypt)
  
- [x] **User Profiles**
  - [x] View profile
  - [x] Edit profile (name, bio, address, education, work etc)
  - [x] Follow / Unfollow users

- [x] **Posts**
  - [x] Create post (text)
  - [x] Read posts (feed)
  - [x] Update post
  - [x] Delete post

- [x] **Likes / Reactions**
  - [x] Like / Unlike posts
  - [x] Display number of likes

- [x] **Comments**
  - [x] Add comment
  - [x] Edit comment
  - [x] Delete comment 

- [x] **Feed / Timeline**
  - [x] Display posts from followed users
  - [x] Display all public posts (optional)

</details>

---

## **Phase 2: Intermediate Features**

<details>
<summary>Click to expand Phase 2</summary>

- [x] **Search**
  - [x] Search users by name/email

- [x] **Notifications**
  - [x] Notify when someone likes a post
  - [x] Notify when someone comments
  - [x] Notify when someone follows

- [ ] **Post Media**
  - [ ] Upload images with posts

- [x] **Profile Customization**
  - [x] Edit name, bio, address, education, work etc

</details>

---

## **Phase 3: Advanced / Optional Features**

<details>
<summary>Click to expand Phase 3</summary>

- [ ] **Direct Messaging (DMs)**
  - [ ] Chat between users
  - [ ] Real-time using Socket.io

- [x] **Real-time Feed Updates**
  - [x] Live updates for posts
  - [x] Live likes/comments count

</details>

---

## Getting Started

1. Clone the repository

   ```
   git clone https://github.com/adityaspaudel/socialmedia.git
   ```

2. Install dependencies for both the client and server

   ```
   cd client
   npm install

   cd ../server
   npm install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory of both the client and server and add necessary variables.

4. Run the development server

   ```
   cd socialmedia/client
   npm run dev
   ```

   For the backend server:

   ```
   cd ../server
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend.

6. Backend server will run on [http://localhost:8000](http://localhost:8000) by default.

<!-- ## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
 -->
