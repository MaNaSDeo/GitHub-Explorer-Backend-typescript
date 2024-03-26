# GitHub-Explorer-Backend-typescript

## Objective
Create a backend service using Node.js and Express.js that interfaces with the GitHub API to fetch and persist user data.

## Features and Specifications

### 1. GitHub User Data Storage
- **Endpoint**: `/save-user/:username`
- **Method**: GET
- **Functionality**: Fetch and save user details from the GitHub API.

### 2. Mutual Followers as Friends
- **Endpoint**: `/find-mutual-followers/:username`
- **Method**: GET
- **Functionality**: Identify and save mutual followers as 'friends'.

### 3. Search Functionality
- **Endpoint**: `/search-users`
- **Method**: GET
- **Functionality**: Search for users in the database.

### 4. Soft Delete User Records
- **Endpoint**: `/delete-user/:username`
- **Method**: DELETE
- **Functionality**: Soft delete user records.

### 5. Update User Details
- **Endpoint**: `/update-user/:username`
- **Method**: PATCH
- **Functionality**: Update specific user details.

### 6. List Users with Sorting
- **Endpoint**: `/list-users`
- **Method**: GET
- **Functionality**: List and sort users from the database.

## Technical Requirements
- **Backend**: Node.js with Express.js framework.
- **Database**: MongoDB

## Submission
- **Repository Link**: [\[Git repository URL\]](https://github.com/MaNaSDeo/GitHub-Explorer-Backend-typescript)
- **Deployment URL**: [\[Render URL\]](https://github-explorer-backend-typescript.onrender.com/api/v1)

## Additional Notes
- TypeScript was used for this project instead of JavaScript.
