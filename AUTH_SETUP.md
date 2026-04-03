# Clerk Authentication Setup

This portfolio uses Clerk to securely authenticate access to the `/admin` dashboard. Clerk handles the frontend user sessions and provides tokens that the Next.js frontend uses to authenticate requests to the FastAPI backend.

Follow these steps to set up Clerk.

## 1. Create a Clerk Account & Application
1. Go to [Clerk.com](https://clerk.com) and sign up for an account.
2. Create a new application in your Clerk dashboard.
3. Choose the authentication strategies you want (e.g., Email, Google). Since this is an admin panel for your portfolio, you might want to restrict sign-ups or only allow your personal email.

## 2. Get Your API Keys
In the Clerk dashboard for your application, go to the **API Keys** section. You will need:
- Publishable Key
- Secret Key

## 3. Configure the Next.js Frontend
Create a `.env.local` file in the root of your project (where `package.json` is located) and add the following keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Optional: Add routes for Clerk to redirect to
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

## 4. Configure the FastAPI Backend
The FastAPI backend verifies the Clerk tokens sent by the frontend when making updates (POST, DELETE, or file uploads).

Create a `.env` file inside the `backend/` directory and include the Clerk Secret Key:

```env
CLERK_SECRET_KEY=sk_test_...
# Keep your other existing env vars here (DATABASE_URL, etc.)
```

## 5. Security & Restricting Access
Because this is an admin dashboard for your portfolio, you want to ensure no one else can log in and change your data.

**Option A (Recommended): Disable Public Sign-ups**
1. Go to your Clerk dashboard.
2. Navigate to **User & Authentication > Email, Phone, Web3**.
3. Scroll down to **Sign-up settings** and disable "Public sign up".
4. To create your own admin account, you can manually create a user from the Clerk dashboard **Users** tab.

**Option B: Allowlist your email**
If you keep sign-ups open, you can create an allowlist so only your specific email address can create an account.
1. Go to **User & Authentication > Restrictions** in the Clerk dashboard.
2. Add your email address to the Allowlist.

---

Once these are set up, you can run the application locally (`npm run dev` in the root, and `uvicorn app.main:app --port 8080` in `backend/`) and navigate to `/admin`!