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
- pnpm (recommended) or npm

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

#### Filter Links by Tags
```http
GET /api/links?tag=example
```
Multiple tags can be provided in two ways:
- Comma-separated: `?tag=tag1,tag2,tag3`
- Multiple parameters: `?tag=tag1&tag=tag2&tag=tag3`

#### Delete a Link
```http
DELETE /api/links/:id
```

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:
```json
{
    "error": "Error message",
    "details": [
        {
            "field": "field_name",
            "message": "specific error message"
        }
    ]
}
```

## Development

