# File Reader Web Challenge

This is a simple Node.js web application that reads and displays the contents of text files from a specified directory. The application was built using Express.js and is designed to serve as a basic web challenge to showcase fundamental web security concepts.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Challenge Walkthrough](#challenge-walkthrough)

---

## Overview

The goal of this challenge was to build a web application that can read and display the contents of files. However, to add a bit of security to the challenge, the files can only be read from a specified folder. The application also makes sure that the user cannot access files outside this directory.

---

## Technologies Used

- **Node.js** – Server-side JavaScript runtime environment.
- **Express.js** – Web framework for Node.js to handle routing.
- **HTML & CSS** – For the user interface and styling.
- **File System (fs module)** – Used to interact with the file system to read files.

---

## Installation

Follow these steps to run the application locally:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Mariom696/file-reader-web-challenge.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd file-reader-web-challenge
    ```

3. **Install the dependencies:**

    ```bash
    npm install
    ```

4. **Start the application:**

    ```bash
    node app.js
    ```

    The application will be running at `http://localhost:3000`.

---

## Challenge Walkthrough

### 1. **Project Setup**

The first step was to set up a basic Node.js environment using Express. Express was chosen because of its simplicity and flexibility in handling routing.

### 2. **Serving HTML**

I created a route (`/`) that serves an HTML form where users can enter the filename they want to read. The form uses a simple `GET` request to submit the filename to the server.

### 3. **File Handling**

I used Node.js's built-in `fs` module to read the contents of files. The filename is retrieved from the query parameter `file` in the URL, and it is decoded using `decodeURIComponent()` to prevent issues with URL encoding.

### 4. **Securing File Access**

To ensure security, I restricted file access to a specific directory (`files/`). This was done by sanitizing the file path and ensuring that only files within this directory could be accessed.

```js
const FILES_DIR = path.join(__dirname, 'files');
```
### 5. **Flag**

The main objective of this challenge is to access a special file named flag.txt. Once the user enters flag.txt in the input field and submits the form, the contents of the file are displayed, revealing the flag.
