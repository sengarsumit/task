GitHub API Integration - Setup Guide

Install Dependencies

To get started, initialize your project and install the necessary dependencies.

npm init -y
npm install express axios dotenv cors

Create a .env File

To securely store your GitHub credentials, create a .env file in your project root and add the following:

GITHUB_USERNAME=your_github_username
GITHUB_TOKEN=your_personal_access_token

Replace your_github_username with your actual GitHub username and your_personal_access_token with a valid GitHub personal access token.

Notes:

Ensure that your .env file is added to .gitignore to prevent exposing your credentials.

Your GitHub token should have the necessary permissions to access repositories and create issues if needed.

