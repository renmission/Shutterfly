# Shutterfly

Shutterfly is a full-stack web application built with the MERN stack that allows users to upload, view, and manage images using AWS S3 for storage.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [License](#license)

## Features

- User Registration & Authentication
  - Sign-up, log-in, and password recovery
  - JWT-based authentication for secure sessions

- Image Upload & Management
  - Upload images to AWS S3
  - View, rename, and delete images
  - Generate public/private URLs for image access

- Image Gallery
  - Display user images in a gallery format
  - Filtering and sorting options

- Responsive Design
  - Accessible on both desktop and mobile devices

## Technologies Used

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **AWS S3**: AWS SDK, multer-S3
- **Authentication**: JSON Web Tokens (JWT), bcrypt.js
- **Deployment**: AWS EC2, Render.com

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/renmission/Shutterfly.git
   cd Shutterfly
   ```

2. Install dependencies for both the client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Set up environment variables for both client and server (refer to the Configuration section).

## Configuration

Create a `.env` file in the `server` directory and add the following environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AWS_BUCKET_NAME=your_aws_bucket_name
AWS_BUCKET_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_aws_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

## Usage

1. Start the server:
   ```bash
   cd server
   npm dev
   ```

2. Start the client:
   ```bash
   cd client
   npm dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

Feel free to customize the README.md file according to your project's specific details and requirements.