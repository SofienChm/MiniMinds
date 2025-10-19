USE DaycareDB;

-- Create Teachers table
CREATE TABLE IF NOT EXISTS Teachers (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Phone VARCHAR(20),
    Address TEXT,
    DateOfBirth DATE NOT NULL,
    HireDate DATE NOT NULL,
    Specialization VARCHAR(100),
    Salary DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    ProfilePicture TEXT,
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME,
    UserId VARCHAR(450),
    INDEX IX_Teachers_Email (Email),
    FOREIGN KEY (UserId) REFERENCES AspNetUsers(Id) ON DELETE SET NULL
);

-- Add UserId column to Parents table if it doesn't exist
ALTER TABLE Parents ADD COLUMN IF NOT EXISTS UserId VARCHAR(450);

-- Add foreign key constraint for Parents.UserId if it doesn't exist
ALTER TABLE Parents ADD CONSTRAINT FK_Parents_AspNetUsers_UserId 
FOREIGN KEY (UserId) REFERENCES AspNetUsers(Id) ON DELETE SET NULL;