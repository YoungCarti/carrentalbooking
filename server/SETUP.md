# XAMPP MySQL Database Setup Guide

## Prerequisites
- XAMPP installed on your system
- Node.js installed

## Step 1: Start XAMPP Services

1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** services
3. Wait until both services show "Running" status

## Step 2: Create the Database

### Option A: Using phpMyAdmin (Recommended for beginners)

1. Click **Admin** button next to MySQL in XAMPP Control Panel
2. This opens phpMyAdmin in your browser (http://localhost/phpmyadmin)
3. Click on **SQL** tab at the top
4. Open the `database.sql` file from the server folder
5. Copy all the SQL content and paste it into the SQL query box
6. Click **Go** button to execute
7. You should see the database `car_rental_db` created in the left sidebar

### Option B: Using MySQL Command Line

1. In XAMPP Control Panel, click **Shell** button
2. Run the following command:
   ```bash
   mysql -u root -p < "C:\Users\User\Documents\GitHub\carrentalbooking\server\database.sql"
   ```
3. Press Enter when prompted for password (default XAMPP has no password)

## Step 3: Configure Environment Variables

1. Navigate to the server folder:
   ```
   C:\Users\User\Documents\GitHub\carrentalbooking\server
   ```

2. The `.env` file is already created with default XAMPP settings:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=car_rental_db
   DB_PORT=3306
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   PORT=3000
   ```

3. **IMPORTANT**: If you set a password for MySQL in XAMPP, update `DB_PASSWORD` in `.env`

4. **SECURITY**: Change `JWT_SECRET` to a random secure string for production

## Step 4: Install Dependencies

Open terminal/PowerShell in the server folder and run:

```powershell
cd C:\Users\User\Documents\GitHub\carrentalbooking\server
npm install
```

This will install:
- express - Web server framework
- mysql2 - MySQL database driver
- cors - Cross-origin resource sharing
- bcrypt - Password hashing
- jsonwebtoken - JWT authentication
- dotenv - Environment variable management

## Step 5: Start the Server

```powershell
npm start
```

You should see:
```
✓ Database connected successfully
✓ Server is running on http://localhost:3000
```

## Step 6: Verify Database Setup

### Check Tables in phpMyAdmin:
1. Go to http://localhost/phpmyadmin
2. Click on `car_rental_db` database
3. You should see 3 tables: `users`, `cars`, `bookings`
4. Click on each table and browse to see sample data

### Test API Endpoints:

You can use a tool like Postman or your browser:

- **Get all cars**: http://localhost:3000/cars
- **Test login**: POST to http://localhost:3000/login with JSON body:
  ```json
  {
    "email": "lewis@gmail.com",
    "password": "password123"
  }
  ```

## Database Structure

### Users Table
- id (Primary Key)
- email (Unique)
- password (Hashed)
- name
- age
- created_at

### Cars Table
- id (Primary Key)
- name
- category
- price
- old_price
- passengers
- transmission
- fuel
- image_url
- rating
- seats
- type
- capacity
- is_electric
- is_featured
- description
- created_at

### Bookings Table
- id (Primary Key)
- user_id (Foreign Key → users.id)
- car_id (Foreign Key → cars.id)
- pickup_date
- return_date
- pickup_location
- return_location
- total_price
- status
- created_at

## API Endpoints

### Public Endpoints
- `GET /cars` - Get all cars
- `GET /cars/:id` - Get single car
- `POST /register` - Register new user
- `POST /login` - Login user

### Protected Endpoints (Requires JWT token in Authorization header)
- `POST /cars` - Add new car
- `PUT /cars/:id` - Update car
- `DELETE /cars/:id` - Delete car
- `GET /bookings` - Get all bookings
- `GET /bookings/user/:userId` - Get user's bookings
- `POST /bookings` - Create booking
- `PATCH /bookings/:id` - Update booking status
- `DELETE /bookings/:id` - Delete booking
- `GET /users` - Get all users
- `GET /users/:id` - Get single user

## Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"
- Check if MySQL is running in XAMPP Control Panel
- Verify DB_PASSWORD in .env matches your MySQL password
- Default XAMPP MySQL has no password (empty string)

### Error: "Database connection failed"
- Ensure XAMPP MySQL service is running
- Check if port 3306 is available (not used by another application)
- Verify database name in .env matches the created database

### Error: "Unknown database 'car_rental_db'"
- Run the database.sql script again to create the database
- Make sure you're using the correct database name

### Port 3000 already in use
- Change PORT in .env to another port (e.g., 3001)
- Or stop the application using port 3000

## Sample Users (for testing)

Email: lewis@gmail.com  
Password: password123

Email: example@example.com  
Password: password123

## Next Steps

1. Update the client/admin applications to use the new API endpoints
2. Test all CRUD operations
3. Update JWT_SECRET for production deployment
4. Consider adding more security features (rate limiting, input validation, etc.)
