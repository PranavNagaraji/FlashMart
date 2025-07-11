# E-Commerce Website

This project is a full-featured eCommerce web application built using React and Firebase. It includes user authentication (email/password and Google), profile management, product browsing, a shopping cart, and a wishlist system. Redux Toolkit is used for state management, and React Router DOM is used for seamless client-side routing.

The application handles both new and returning users efficiently. New users who sign in with Google are redirected to complete their profile details, while returning users with existing profiles are taken directly to the homepage. All user data is securely stored using Firebase services.

## Features

### Authentication
- Users can register using first name, last name, email, phone number, and password in user details page after signing in with a new account
- Google Sign-In is integrated through Firebase Authentication
- User details are stored in the firebase firestore
- First-time Google users are redirected to a profile completion form
- Existing users are routed directly to the homepage

### User Data Handling
- The user can login and logout with the login/signin button in navbar 
- User details are stored in Firebase Realtime Database or Firestore
- Conditional routing ensures users complete their profile before accessing the application

### Product Browsing
- All products are displayed in a clean, accessible UI
- Contains a home page to display the categories
- On accessing/clicking any category the product listing page appears with product pages which consists the dedicated images, title and pricings
- Made with the help of dummyJSON api and each product card navigates to a product details pagee on click
- Products can be added to the cart or wishlist directly from the product listing
- Each Product card contains addToWishList and addToCart buttons respectively

### Shopping Cart
- Cart functionality is implemented using Redux Toolkit
- Items can be added, removed, or updated
- Cart state is managed globally and persists during the session
- Product cards are displayed in the cart which can further be increased or decreased in quantityand removed from wishlist
- Clicking on a product card will navigate you to the product details page again
- Contains the product summary with sub-total, discount pricing, tax and Total
  
### Wishlist
- Users can add or remove products from their wishlist
- Wishlist items are managed in global state and optionally stored in Firebase
- Product cards are displayed in the wishlist which can further be added to the cart and removed from wishlist
- Clicking on a product card will navigate you to the product details page again
- Adding products to Wish List cannot be done without logging in or signing in which is taken care by firebase authentication and firebase firestore

### Routing
- Uses `react-router-dom` for all frontend routing
- Routes are managed with `BrowserRouter` for clean URLs and smooth navigation
- Conditional routes based on authentication and profile completion

  Wishlist and Cart is managed using 

## Technologies Used

- HTML, CSS, JavaScript
- React for building the user interface
- Redux Toolkit for managing state (cart, wishlist, etc.)
- Firebase for user authentication and data storage
- React Router DOM for routing and navigation
