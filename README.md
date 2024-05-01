## About the Project

**Project Case:** User Management Simplified

**User Story:** As the administrator of a corporate account within SmartCraft Electro, I need a seamless way to manage user access and permissions related to our company's data. This capability is crucial for efficiently overseeing and controlling the distribution of responsibilities and access rights within our system. By doing so, we can ensure the integrity of our data and facilitate optimal operational workflows.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Installed the latest version of [Node.js](https://nodejs.org/en/download/).
- Installed the latest version of [npm](https://www.npmjs.com/get-npm).

## Cloning the Project

To clone this project, follow these steps:

1. Open your terminal and navigate to the directory where you want to clone the project.
2. Run the following command:

```bash
git clone https://github.com/SoroushGhodrat/user-management.git
```

## Installation

Once you have cloned the project, follow these steps to install its dependencies:

1. Open your terminal and navigate to the project directory:

```bash
cd user-management
```

1. Install the project dependencies:

```bash
npm install
```

### Running the Project

To run the project, use the following command:

```bash
npm start
```

This command will concurrently start both the JSON Server and the application. This allows the server and the application to run simultaneously, streamlining your development process.

## About User Data

The user data used in this project is mock data served by a JSON Server. This server supports both DELETE and UPDATE actions.

When a DELETE action is performed, the corresponding user will be removed from the `db.json` file. If you need to restore the data, you can simply copy the user data from the `backup.json` file and replace the contents of the `db.json` file.

## Dependencies

This project uses the following dependencies:

- `React`: Version 18.2.0
- `React Redux`: Version 9.1.0
- `Joy UI`: Version 5.0.0-beta.32
- `Material Icons`: Version 5.15.15
- `Typescript`: Version 5.2.2
- `Vite`: Version 5.2.0
- `React query`: Version 5.29.0

## Testing Libraries

This project uses the following testing libraries:

- **Vitest**: A high-performance test runner for Vite projects. It natively supports ESM, TypeScript, and JSX, providing a seamless testing experience.
- **React Testing Library**: This library offers a lightweight, yet powerful solution for testing React components. It builds on `react-dom` and `react-dom/test-utils` to encourage good testing practices.
- **jsdom**: Jsdom is a pure JavaScript implementation of various web standards. It's used in this project to simulate a web browser environment for more realistic testing in Node.js.
- **jest-dom**: This library provides a set of custom matchers that allow you to write more expressive and effective assertions against the DOM. For instance, you can verify if an element is present in the DOM or if it contains the expected content.

## Running Tests

You can run tests either via the terminal or a user interface.

### Terminal

To run tests in the terminal, use the following command:

```bash
npm run test
```

To run tests in via UI, use the following command:

```bash
npm run test:ui
```
