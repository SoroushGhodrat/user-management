## About the Project

**Project Case:** User Management Simplified

**User Story:** As the administrator of a corporate account within SmartCraft Electro, I need a seamless way to manage user access and permissions related to our company's data. This capability is crucial for efficiently overseeing and controlling the distribution of responsibilities and access rights within our system. By doing so, we can ensure the integrity of our data and facilitate optimal operational workflows.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/).

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

To run this project, follow these steps:

1. Start the JSON Server:

```bash
npm run server
```

2. In a new terminal window, navigate back to the project directory and start the app:

```bash
npm run dev
```

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
