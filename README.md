# ItinerAi
ItinerAi is an AI-powered date night planning app that generates personalized itineraries based on user preferences, including location, interests, and food choices, with options for premium features and seamless payment integration.

## User Story

As a user planning a date night,  
I want to answer a few questions about my preferences, such as location, date, celebrations, interests, and food preferences,  
so that I can receive personalized and multiple date night itinerary options that include links to locations, restaurant menus, directions, and be able to pay for premium features like additional itinerary suggestions.

---

### What:

The application will allow users to enter details about their ideal date night. Based on their input, the app will generate a personalized itinerary that includes multiple options for each part of the night (e.g., dinner, activities), complete with links to restaurants, menus, maps, and directions between locations. Users will also have the option to purchase premium features for more customized experiences.

---

### Why:

This app simplifies date night planning by generating customizable itineraries. Users won’t have to spend time searching for restaurants, activities, or coordinating logistics between stops. By providing the necessary information, the app creates a smooth experience, ensuring all elements of the date night are tailored to the user’s preferences and planned seamlessly. Additionally, users can access premium options for even more tailored suggestions and convenience.

---

### How:

- **Frontend (React):**  
  The user will interact with a polished React-based UI, where they can fill out forms to input their preferences. The interface will guide them through each question, presenting options for location, date, interests, celebrations, and food preferences. The UI will be styled professionally using either CSS-in-JS (like styled-components or Emotion) or a component library (such as Chakra UI or Ant Design) to ensure mobile responsiveness.

- **Backend (GraphQL, Node.js, Express.js):**  
  The server will handle requests via GraphQL, allowing users to query data (such as restaurant information and activity ideas) and process itinerary generation. The server will also handle mutations for saving user preferences, itineraries, and payment details.

- **Database (MongoDB + Mongoose):**  
  User data, preferences, itinerary information, and payment history will be stored and managed with MongoDB. The Mongoose ODM will handle schema definitions and database interactions.

- **AI (OpenAI Integration):**  
  User inputs will be processed through OpenAI to generate multiple itinerary options based on preferences, which the user can select from.

- **Payment Integration (Stripe):**  
  Users will be able to pay for premium features using Stripe. Payment processing will be integrated with Stripe’s API to securely handle transactions and unlock additional features for users.

- **Authentication (JWT):**  
  Users will be authenticated with JWT, allowing them to save itineraries for later, access personalized content, and unlock premium features.

- **Deployment (Render):**  
  The app, along with all user data and backend services, will be deployed on Render, ensuring it’s live and accessible to users at all times.

---

### Additional Features:

- **Responsive Design:**  
  The app will be fully responsive and mobile-friendly, ensuring users have a seamless experience on any device.

- **Interactivity:**  
  The app will be highly interactive, accepting and responding to user input in real time, making the date planning process engaging and easy to use.

# ItinerAi Development Outline

## 1. Planning and Setup

### Define Core Features:
- Ask users questions to generate itineraries.
- Use Stripe for payments (optional premium features, such as saving multiple itineraries or accessing premium restaurants/locations).
- Authentication (JWT) for user login/registration.
- Full interaction with user input and responses.
- Database CRUD functionality with GraphQL queries and mutations.

### Tech Stack:
- **Frontend**: React.
- **Backend**: Node.js, Express.js, GraphQL.
- **Database**: MongoDB with Mongoose.
- **Payment**: Stripe.
- **Authentication**: JWT.
- **Deployment**: Render.

## 2. Front-End Development (React)

### Set Up React Project:
- Initialize with `create-react-app` or Vite.
- Install necessary dependencies: Apollo Client, React Router, Stripe React SDK, CSS-in-JS library (e.g., styled-components or Emotion).

### Component Structure:
- **App.js**: Main container.
- **Header**: Navigation bar (Home, Itineraries, Profile, Login/Logout).
- **UserInputForm**: Components for input fields (location, date, preferences).
- **ItineraryList**: Display AI-generated itineraries.
- **ItineraryCard**: Show itinerary details and links (menus, directions).
- **AuthForms**: User login, registration, and Stripe payment form.

### Styling:
- Use CSS-in-JS (styled-components/Emotion), or a UI library like Chakra UI/Ant Design.
- Ensure the app is mobile-friendly with responsive design.
- Create polished and professional styling to enhance user experience.

## 3. Payment Integration (Stripe)

### Set Up Stripe:
- Register for Stripe and obtain API keys.
- Install the `react-stripe-js` and `stripe-js` libraries.

### Implement a Payment Component:
- Users will pay to access premium itineraries or unlock additional features.
- Implement Stripe Checkout or PaymentIntents API for processing payments.

### Payment Flow:
- Users sign up/log in.
- Users can pay to unlock premium features (e.g., saving unlimited itineraries, premium restaurant suggestions).
- After payment, the itinerary will be saved in the database for future retrieval.

## 4. Back-End Development (Node.js, GraphQL, Express.js)

### Set Up Node.js Server:
- Install dependencies: Express.js, Apollo Server, GraphQL, Stripe Node.js SDK, `jsonwebtoken` for JWT authentication.

### GraphQL Schema:
Define schema with types:
- **User**: id, name, email, saved itineraries, payment status (if using premium features).
- **Itinerary**: id, date, locations, restaurants, directions.
- **Payment**: id, amount, user, date of payment.
- **Query**: Retrieve itineraries, user data, payment data.
- **Mutation**: Create/update itineraries, handle payments, register/login users.

### Resolvers:
- Implement GraphQL resolvers for:
  - Retrieving and saving itineraries.
  - Registering/logging in users.
  - Managing Stripe payments (creating payment intents, handling webhook responses).

### Stripe Webhooks:
- Set up Stripe webhooks to verify payment completion.
- Update the user’s account in MongoDB to reflect premium status upon successful payment.

## 5. Database (MongoDB + Mongoose)

### Define MongoDB Schemas:
- **User Schema**: Store user data, including name, email, hashed password, saved itineraries, and payment status.
- **Itinerary Schema**: Date, locations, restaurants, and other itinerary details.
- **Payment Schema**: Stripe payment data associated with each user.

### Queries and Mutations:
- Use MongoDB queries to:
  - Retrieve itineraries.
  - Save new or updated itineraries.
  - Manage user accounts and payments.

## 6. Authentication (JWT)

### JWT Setup:
- Implement JWT-based authentication in the backend:
  - Register users and issue JWT tokens upon login.
  - Protect GraphQL queries/mutations (e.g., saving an itinerary or accessing premium content) using JWT verification.
  - Store the JWT in local storage or cookies for session persistence.

### Frontend Authentication:
- Create login and registration forms in React.
- On successful login, store the JWT token and use it for protected routes.

## 7. AI Integration (OpenAI)

### OpenAI API:
- Use OpenAI to process user inputs and generate itineraries.
- Parse the OpenAI response into user-friendly itinerary options (e.g., locations, restaurants, and activities).

### Integrate with Frontend:
- Display generated itineraries in `ItineraryList` and allow users to select and save options.

## 8. UI and Interactivity

### Polished UI:
- Implement a modern and clean interface.
- Ensure all elements (forms, itinerary displays, etc.) are styled professionally.
- Make the app mobile-responsive using CSS Grid or Flexbox.

### User Interactions:
- Create smooth transitions between forms and generated itineraries.
- Use form validation for user inputs (location, date, preferences).
- Provide real-time feedback (loading spinners, success/failure messages).

## 9. Deployment (Render)

### Prepare for Deployment:
- Create production builds of the React app.
- Ensure environment variables for Stripe, OpenAI, MongoDB, and JWT are properly configured.

### Deploy Backend and Frontend:
- Deploy both the frontend and backend services on Render.
- Set up continuous deployment if possible.

### Test Post-Deployment:
- Test the app in production, including payment processing, JWT authentication, itinerary generation, and user interaction.

## 10. Testing

### Unit Testing:
- Write unit tests for React components and backend GraphQL resolvers.
- Test payments using Stripe’s test mode.

### End-to-End Testing:
- Perform e2e tests of the user flow: registration, itinerary generation, payments, and saving itineraries.

## 11. Future Enhancements

### Premium Features:
- Introduce more premium options such as personalized restaurant reservations.

### User Reviews:
- Allow users to rate and review restaurants/itineraries after the date night.

### Social Sharing:
- Add social sharing buttons for itineraries.
