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

## Features

### User Authentication & Profiles

- Email/password and social media login
- Customizable user profiles
- Profile picture and cover photo upload
- Bio and personal details

### Posts & Content

- Create, edit, and delete posts
- Support for text, images, and videos
- Hashtag functionality
- Like, comment, and share posts

### Social Interactions

- Follow/unfollow users
- Real-time notifications
- Direct messaging system
- @mentions in posts and comments

### Feed & Discovery

- Personalized news feed
- Explore page for trending content
- Search functionality for users and posts
- Suggested users to follow

### Analytics & Insights

- Personal post performance metrics
- Account growth statistics
- Interactive charts for engagement data

### Privacy & Security

- Private/public account settings
- Two-factor authentication
- Report and block functionalities

## Development Phases

### Phase 1: Setup & Basic Functionality (Weeks 1-3)

- Set up Next.js project with App Router
- Configure Express.js backend
- Implement Tailwind CSS and NextUI for styling
- Create basic page layouts and navigation
- Set up user authentication system

### Phase 2: Core Features Development (Weeks 4-7)

- Develop user profile functionality
- Implement post creation and display
- Add like and comment features
- Create follow/unfollow system
- Set up basic news feed

### Phase 3: Advanced Features & Interactions (Weeks 8-11)

- Implement direct messaging system
- Add notifications functionality
- Develop hashtag system and search feature
- Create explore page for content discovery
- Implement @mentions in posts and comments

### Phase 4: Analytics & Insights (Weeks 12-14)

- Integrate Chart.js for data visualization
- Implement personal analytics dashboard
- Create account growth and engagement charts
- Add post performance metrics

### Phase 5: Enhancement & Optimization (Weeks 15-17)

- Implement advanced privacy settings
- Add two-factor authentication
- Optimize performance and loading times
- Enhance UI/UX with Shadcn components
- Implement lazy loading and infinite scroll

### Phase 6: Testing & Deployment (Weeks 18-20)

- Conduct thorough testing (unit, integration, e2e)
- Perform security audits
- Optimize for SEO
- Prepare deployment pipeline
- Launch beta version for user testing

## Getting Started

1. Clone the repository

   ```
   git clone https://github.com/adityaspaudel/socialmedia.git
   ```

2. Install dependencies for both the client and server

   ```
   cd socialmedia/client
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

