# MiniBlog

Basic application that simulates a blog using react and firebase

## Table of Contents

- [Description](#description)
- [Getting Started](#getting-started)
- [Installation](#installation)

---

## Description

This is a basic application that demonstrates the core features of React, react-routes, custom hooks, contextAPI, etc.

Feel free to fork or clone this repository to start your own blog project.

---

## Getting Started

### Prerequisites

Before you begin, ensure that you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) (Node Package Manager) – usually comes with Node.js
- [Firebase](https://firebase.google.com/)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JvDev2003/miniblog
   cd miniblog
   ```

2. Install packeges and fill the .env:

   ```bash
    npm install
   ```

   Fill in these variables in the .env file.

   ```bash
    VITE_APIKEY = {Your Firebase API key}
    VITE_AUTHDOMAIN = {Your Firebase Auth domain}
    VITE_PROJECTID = {Your Firebase project ID}
    VITE_STORAGEBUCKET = {Your Firebase storage bucket}
    VITE_MESSAGINGSENDERID = {Your Firebase messaging sender ID}
    VITE_APPID = {Your Firebase app ID}
   ```

3. Run the application:

   ```bash
    npm run dev
   ```
