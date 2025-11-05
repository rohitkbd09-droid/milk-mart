# Deployment Guide

## Environment Variables Required

You need to set the following environment variables in your Netlify dashboard:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### How to Get Firebase Configuration:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click the gear icon ⚙️ → **Project settings**
4. Scroll down to **Your apps** section
5. If you haven't created a web app, click **Add app** → **Web** (</> icon)
6. Copy the configuration values from the `firebaseConfig` object

## Firebase Setup Requirements

### 1. Enable Authentication

1. In Firebase Console, go to **Authentication** → **Get started**
2. Enable **Email/Password** sign-in method
3. (Optional) Enable **Google** and **Phone** sign-in if you want those features

### 2. Create Firestore Database

1. In Firebase Console, go to **Firestore Database** → **Create database**
2. Start in **Test mode** for development (or **Production mode** with security rules)
3. Choose a location for your database

### 3. Set Firestore Security Rules

Add these rules to allow authenticated users to read/write their own orders:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own orders
    match /orders/{orderId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Allow authenticated users to create orders
    match /orders/{orderId} {
      allow create: if request.auth != null;
    }
  }
}
```

## After Setting Environment Variables

1. Redeploy your site in Netlify (or trigger a new deployment)
2. The site will now have working authentication and order functionality!

## Testing

After deployment:
1. Visit your live site
2. Try signing up with a new account
3. Try placing an order
4. Check your Firestore database to see the order was saved

