# TypeScript Next.js Boilerplate

This project is a boilerplate for building web applications using **Next.js 15** and **React 19**. It incorporates a full-stack architecture with **PostgreSQL** for the database, **Redis** for session storage, and **Prisma** as the ORM. The UI is built using **ShadCN** with **Tailwind CSS**.

## Features

- **Authentication**: Boilerplate login and signup flows with authentication & authorization handling.
- **Database**: PostgreSQL for structured data storage.
- **Session Management**: Redis for efficient session storage.
- **ORM**: Prisma for easy database interactions.
- **UI Components**: ShadCN for a customizable UI with Tailwind CSS.
- **Docker**: Docker Compose setup for easy deployment and development.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your machine.
- Node.js (v16 or later) installed on your machine (for development).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/alexmgriffiths/next15-starter.git
   cd next15-starter
   ```

2. **Configure environment variables**:

   Create a `.env` file in the root directory and set up your environment variables. Use the provided `.env.example` as a reference.

3. **Build and run the development environment**:

   Run the following command to start the services:

   ```bash
   make br-development
   ```

4. **Run the application**:

   The Next.js application will be running on [http://localhost:3001](http://localhost:3001).

   You can access it directly from your browser.


## Technologies Used

- **Next.js**: A React framework for server-rendered applications.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript.
- **PostgreSQL**: A powerful, open-source relational database.
- **Redis**: An in-memory data structure store for session management.
- **Prisma**: A modern ORM for Node.js and TypeScript.
- **ShadCN**: A UI component library.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Zod**: For input schema checking
- **eslint**: For linting

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Redis](https://redis.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [ShadCN](https://shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Screenshots
![Screenshot 2024-11-04 at 2 50 24 AM](https://github.com/user-attachments/assets/d0422601-a9c2-4ee8-ba63-04863474aa3c)
![Screenshot 2024-11-04 at 2 50 31 AM](https://github.com/user-attachments/assets/76dfbb48-1c28-49d5-b42f-6051bdf7d8d5)
![Screenshot 2024-11-04 at 2 50 47 AM](https://github.com/user-attachments/assets/fddb2138-eee8-4f31-b51c-c1deb5547e3f)


