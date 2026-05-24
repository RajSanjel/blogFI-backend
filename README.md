# blogFI Backend

Node.js/Express backend for the blogFI app. It provides authentication, user data, and blog post APIs backed by MongoDB.

## Features

- JWT-based auth with HTTP-only cookies
- Create, fetch, and delete blog posts
- User profile lookup
- MongoDB + Mongoose data layer
- Cloudinary image upload helper

## Requirements

- Node.js
- MongoDB connection string
- RSA private/public key pair for JWT signing and verification
- Cloudinary credentials for image uploads

## Environment variables

Create a `.env` file with:

```bash
PORT=3000
MONGO_DB_URI=your_mongodb_connection_string
PRIVATE_KEY=your_rsa_private_key
PUBLIC_KEY=your_rsa_public_key
API_KEY=your_cloudinary_api_key
API_KEY_SECRET_KEY=your_cloudinary_api_secret
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Generate RSA keys:

```bash
openssl genrsa -out ./private.key 4096
openssl rsa -in private.key -pubout -outform PEM -out public.key
```

3. Start the server:

```bash
npm run dev
```

## Scripts

- `npm run dev` - start the app with `ts-node-dev`

## API routes

Base path: `/api`

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/verify`

### Users

- `GET /users/user`

### Blogs

- `POST /blog/post`
- `GET /blog/getBlog/:url`
- `GET /blog/getBlogs`
- `POST /blog/delete`

## Root endpoint

- `GET /` returns `{"message":"Ready...."}`
