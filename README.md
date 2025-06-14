# Link Vault

A Web app for managing and organizing links with tags, built with React, Tailwind CSS, TypeScript, Zustand, Zod, Express, and MongoDB.

## Features

- User authentication with JWT
- Create, read, and delete links
- Tag-based organization
- Filter links by tags 

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- pnpm

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/mokshanirugutti/LinkVault.git
cd LinkVault
```

2. Install dependencies
```bash
pnpm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your_database_name
JWT_SECRET=your_jwt_secret_key
```

4. Build the TypeScript code
```bash
pnpm build
```

5. Start the server
```bash
pnpm start
```

## frontend

1. cd to client directory
```bash
cd client
```

2. install dependencies
```bash
pnpm install
```

3. start the development server
```bash
pnpm run dev
```

4. Server will be running on http://localhost:5173





## API Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
    "username": "your_username", // required minimum 4 characters
    "email": "your_email@example.com", // required valid email
    "password": "your_password" // required minimum 8 characters
}
```

Response:
```json
{
    "message": "Registration successful",
    "token": "your_jwt_token",
    "user": {
        "id": "user_id",
        "username": "your_username",
        "email": "your_email@example.com"
    }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
    "username": "your_username",
    "password": "your_password"
}
```

Response: 

```json
{
    "message": "Login successful",
    "token": "your_jwt_token",
    "user": {
        "id": "user_id",
        "username": "your_username",
        "email": "your_email@example.com"
    }
}
```

### Authentication Required
All endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Links

#### Create a Link
```http
POST /api/links
Content-Type: application/json

{
    "title": "Example Link",
    "url": "https://example.com",
    "tags": ["example", "test"]
}
```

#### Get User's Links
```http
GET /api/links
```

Response:

```json
[
    {
        "_id": "684d723c8ea090316bc24da4",
        "title": "third one",
        "url": "https://third.com",
        "tags": [
            "one",
            "two"
        ],
        "createdBy": "684d68438ea090316bc24d93",
        "createdAt": "2025-06-14T12:59:40.985Z",
        "updatedAt": "2025-06-14T12:59:40.985Z",
        "__v": 0
    },
    {
        "_id": "684db1b1cdfdd6ea713ec986",
        "title": "youtube",
        "url": "https://youtube.com/",
        "tags": [
            "youtube",
            "yt"
        ],
        "createdBy": "684d68438ea090316bc24d93",
        "createdAt": "2025-06-14T17:30:25.737Z",
        "updatedAt": "2025-06-14T17:30:25.737Z",
        "__v": 0
    }
]
```

#### Filter Links by Tags
```http
GET /api/links?tag=example
```
Multiple tags can be provided in two ways:
- Comma-separated: `?tag=tag1,tag2,tag3`
- Multiple parameters: `?tag=tag1&tag=tag2&tag=tag3`


```http
GET /api/links?tag=yt
```

Response:
```json
[
    {
        "_id": "684db1b1cdfdd6ea713ec986",
        "title": "youtube",
        "url": "https://youtube.com/",
        "tags": [
            "youtube",
            "yt"
        ],
        "createdBy": "684d68438ea090316bc24d93",
        "createdAt": "2025-06-14T17:30:25.737Z",
        "updatedAt": "2025-06-14T17:30:25.737Z",
        "__v": 0
    }
]

```


#### Delete a Link
```http
DELETE /api/links/:id
```

Response:

```json
{
    "message": "Link deleted successfully"
}
```

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:
```json
  {
    "error": "Error message"
  }
```


