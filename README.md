# NextJS & Express Social Media Site

## Tech Stack

- Frontend: Next.js with App Router  
- Backend: Express.js  
- Styling: Tailwind CSS, NextUI, Shadcn  
- Charts: Chart.js  
- Icons: React Icons, Lucide React  
- Form Handling: Formik with Yup validation  
- AI-Assisted Development: V0.dev  
- Utilities: util  

---

# MERN Social Media App - Project Checklist

This is a structured checklist to guide the development of a MERN stack social media application. You can track progress by checking/unchecking items in your Markdown editor or on GitHub.

---

## **Phase 1: Essential Features (MVP)**

<details>
<summary>Click to expand Phase 1</summary>

- [ ] **User Authentication & Authorization**
  - [ ] Sign up / Log in / Log out
  - [ ] JWT-based authentication
  - [ ] Password hashing (bcrypt)
  
- [ ] **User Profiles**
  - [ ] View profile
  - [ ] Edit profile (name, bio, profile picture)
  - [ ] Follow / Unfollow users

- [ ] **Posts**
  - [ ] Create post (text + optional image)
  - [ ] Read posts (feed)
  - [ ] Update post
  - [ ] Delete post

- [ ] **Likes / Reactions**
  - [ ] Like / Unlike posts
  - [ ] Display number of likes

- [ ] **Comments**
  - [ ] Add comment
  - [ ] View comments
  - [ ] Delete comment (optional)

- [ ] **Feed / Timeline**
  - [ ] Display posts from followed users
  - [ ] Display all public posts (optional)

</details>

---

## **Phase 2: Intermediate Features**

<details>
<summary>Click to expand Phase 2</summary>

- [ ] **Search**
  - [ ] Search users by name/email
  - [ ] Search posts by content or hashtags

- [ ] **Notifications**
  - [ ] Notify when someone likes a post
  - [ ] Notify when someone comments
  - [ ] Notify when someone follows

- [ ] **Post Media**
  - [ ] Upload images with posts
  - [ ] Upload videos (optional)
  - [ ] Thumbnail preview in feed

- [ ] **Profile Customization**
  - [ ] Cover photo
  - [ ] Bio, website, social links

</details>

---

## **Phase 3: Advanced / Optional Features**

<details>
<summary>Click to expand Phase 3</summary>

- [ ] **Direct Messaging (DMs)**
  - [ ] Chat between users
  - [ ] Real-time using Socket.io

- [ ] **Stories**
  - [ ] Temporary posts (24-hour expiration)
  - [ ] Image/video stories

- [ ] **Hashtags & Trends**
  - [ ] Tag posts with hashtags
  - [ ] Show trending hashtags

- [ ] **Post Sharing / Repost**
  - [ ] Share other users’ posts
  - [ ] Repost to your feed

- [ ] **Reactions beyond Likes**
  - [ ] Multiple reactions (love, laugh, wow, etc.)

- [ ] **Real-time Feed Updates**
  - [ ] Live updates for posts
  - [ ] Live likes/comments count

</details>

> ✅ Use this checklist to track your project progress. You can mark items as complete directly in your Markdown editor or GitHub.

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

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

