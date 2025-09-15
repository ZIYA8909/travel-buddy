CREATE DATABASE IF NOT EXISTS travel_buddy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE travel_buddy;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  email VARCHAR(200) UNIQUE,
  password_hash VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  preferences JSON,
  role ENUM('user','admin') DEFAULT 'user'
);

CREATE TABLE cities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  state VARCHAR(150),
  UNIQUE KEY (name,state)
);

CREATE TABLE universities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(300),
  aishe_code VARCHAR(50),
  type VARCHAR(50),
  city_id INT,
  state VARCHAR(150),
  district VARCHAR(150),
  website VARCHAR(300),
  latitude DOUBLE,
  longitude DOUBLE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL
);

CREATE TABLE places (
  id INT AUTO_INCREMENT PRIMARY KEY,
  university_id INT,
  name VARCHAR(250),
  category VARCHAR(100),
  avg_cost ENUM('Cheap','Moderate','Expensive'),
  description TEXT,
  lat DOUBLE,
  lng DOUBLE,
  address VARCHAR(500),
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (university_id) REFERENCES universities(id) ON DELETE CASCADE
);

CREATE TABLE safety_contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  university_id INT,
  name VARCHAR(200),
  category VARCHAR(100),
  phone VARCHAR(80),
  address VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (university_id) REFERENCES universities(id) ON DELETE CASCADE
);

CREATE TABLE trips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  university_id INT,
  trip_type ENUM('Friends','Family','Weekday','Weekend','Surprise'),
  cost_pref ENUM('Cheap','Moderate','Expensive'),
  places JSON,
  notes TEXT,
  is_day_trip BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (university_id) REFERENCES universities(id) ON DELETE SET NULL
);

CREATE TABLE feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  trip_id INT,
  rating TINYINT,
  comments TEXT,
  photos JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

CREATE TABLE expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_id INT,
  description VARCHAR(255),
  amount DECIMAL(10,2),
  paid_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);
