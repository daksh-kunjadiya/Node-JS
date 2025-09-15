# Node.js API Project

A RESTful API built with Node.js and Express.js featuring a clean, modular architecture.

## Features

- ✅ Express.js server with middleware
- ✅ RESTful API endpoints
- ✅ Error handling middleware
- ✅ Request logging
- ✅ CORS support
- ✅ Security headers with Helmet
- ✅ Environment configuration
- ✅ Modular architecture (MVC pattern)

## Project Structure

```
src/
├── controllers/     # Request handlers
├── services/        # Business logic
├── routes/          # API routes
├── middleware/      # Custom middleware
└── server.js        # Main server file
```

## API Endpoints

### Users
- `GET /api/users` - Get all users (with pagination and search)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Health Check
- `GET /health` - Server health status

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Start production server:
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
NODE_ENV=development
```

## Example Requests

### Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Johnson", "email": "alice@example.com", "age": 28}'
```

### Get Users with Search
```bash
curl "http://localhost:3000/api/users?search=john&page=1&limit=5"
```

### Create Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Smartphone", "description": "Latest model", "price": 699.99, "category": "Electronics", "stock": 25}'
```

### Filter Products
```bash
curl "http://localhost:3000/api/products?category=Electronics&minPrice=100&maxPrice=1000"
```