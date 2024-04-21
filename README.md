# My Inventory Web Application Version 3
Welcome to the latest version of my inventory web application, built using HTML5, CSS3, JavaScript, and the Bootstrap Framework. This application allows users to efficiently manage their inventory by performing various operations such as viewing, adding, updating, and deleting products.

In this version, significant enhancements have been made, including the addition of unit tests for every API endpoint to ensure robustness and reliability.

This project is part of the Dev Init #2 initiative led by borntoDev, aimed at developing a comprehensive product management system using Node.js and Express.

## Features
- **View Products:** Browse through all products neatly organized in a table (GET request to "/products").
- **Add New Product:** Easily add a new product by clicking the designated button and entering the required details in a modal (POST request to "/products").
- **Update Product:** Update any existing product by clicking the edit (pencil) icon, which opens a modal to input updated data (PUT request to "/products/:id").
- **Delete Product:** Remove a product from the inventory by clicking the delete (trash can) icon (DELETE request to "/products/:id").
- **Search by Product ID:** Quickly find a specific product by searching with its unique ID (GET request to "/products/:id").

## Running the Project

### Prerequisites
- Node.js installed on your machine.
- Jest runner extension is installed in your VS Code.

### Getting Started

1. Clone this repository to your local machine:

```bash
git clone https://github.com/Awassanan/product-management-system-unit-test.git
```

2. Navigate into the project directory.

```bash
cd product-management-system-unit-test
```

3. Install the required dependencies using npm.

```bash
npm install
```

4. Start the server.
```bash
npm start
```

### To run unit test, you can't run with npm test, because it will cause "error: listen eaddrinuse: address already in use :::3000jest"
1. Click the Run button in each .test.js file
2. You can run all tests in 1 file or run each sub case in 1 file too

Now you're all set to manage your inventory seamlessly with this enhanced web application! If you have any questions or feedback, please feel free to reach out. Happy managing!

This version focuses on providing clear steps for setting up and running the project, along with concise descriptions of the features. Feel free to customize it further based on your specific project details and preferences.
