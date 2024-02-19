
# Rocket Games - WinHacks 2024 Winner (Rocket: Shopping Cart App)

## Introduction

Welcome to the official repository for Rocket Games, the one-stop e-commerce platform for purchasing your favorite game licenses. Developed by Team GIT PULLERS, this project was the winner in the 'Rocket: Shopping Cart App' category at WinHacks 2024.

## Features

- **User Authentication:** SignIn, SignUp, Forget Password, and Logout functionalities.
- **Game Discovery:** Enhanced search with filters and a "Featured Games" section.
- **E-commerce Capabilities:** Integrated wallet with Stripe, comprehensive shopping cart, and order receipts.
- **Tech Stack:** Utilizes React (with Vite) and Tailwind CSS on the frontend; Node.js, Express.js, and MongoDB for the backend.

## Application Hosting

The application is hosted on Render, which may have limitations due to the free tier. For the best experience, we recommend running the project locally.

## Local Setup

### Frontend (`client` directory)

1. Create a `.env` file in the `client` directory.
2. Add the following environment variables from your Firebase config:
   ```
   VITE_REACT_APP_FIREBASE_API_KEY=""
   VITE_REACT_APP_FIREBASE_AUTH_DOMAIN=""
   VITE_REACT_APP_FIREBASE_PROJECT_ID=""
   VITE_REACT_APP_FIREBASE_STORAGE_BUCKET=""
   VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID=""
   VITE_REACT_APP_FIREBASE_APP_ID=""
   VITE_REACT_APP_FIREBASE_MEASUREMENT_ID=""

   VITE_REACT_APP_BASE_URL="" # Backend server base URL
   ```
3. Run `npm install` and `npm run dev` to start the frontend.

### Backend (`server` directory)

1. Create a `.env` file in the `server` directory.
2. Configure the following variables:
   ```
   STRIPE_SUCCESS_URL="" # Frontend_BaseUrl/success-payment
   STRIPE_CANCEL_URL="" # Frontend_BaseUrl/failure-payment

   STRIPE_SECRET_KEY=""
   MONGODB_URI=""
   STRIPE_WEBHOOK_SECRET=""
   ```
3. Run `npm install` and `npm run start` to launch the backend.

## Acknowledgments

Thank you to the WinHacks 2024 team, our peers, and everyone who supported us. Special thanks to the organizers, sponsors, and judges for enabling a platform where creativity and technology meet.

## License

This project is licensed under the MIT License. For more information, see the [MIT License](https://opensource.org/licenses/MIT) on the Open Source Initiative website.


## Stay Connected

For more updates, follow us on [GitHub](https://github.com/akshatnehra/). Let's continue innovating and exploring the boundaries of technology together.

Team GIT PULLERS - Proud to innovate and excel beyond the limits.
