# hiublue Frontend Recruitment

## Overview

This project is a functional admin portal built using **Next.js**, **TypeScript**, and **Material UI (MUI)**. It includes features such as authentication, data visualization, and onboarding functionalities, as outlined in the assessment provided by hiublue.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/TutulDevs/hiublue-frontend-recruitment-starter.git TEST_APP
   cd TEST_APP
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Variable Setup**

Before running the application, you need to set up the environment variables. Create a `.env` file in the root of your project and add the following line:

```bash
NEXT_PUBLIC_BASE_API_URL=https://dummy-1.hiublue.com/api
```

This variable is used to configure the base API URL for the application.

## Usage

To run the development server, use the following command:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to view the application.

## Building and Running

To build the application for production and run it, follow these steps:

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Start the production server:**

   ```bash
   npm start
   ```

After building, you can access the application at `http://localhost:3000`.

## Features

- **Authentication**: Secure login and access control using Context API and LocalStorage.
- **Admin Dashboard**: Real-time data fetching with pagination, searching, and filtering capabilities.
- **Onboarding Offers**: Admin can send onboarding offers to new users with validation.
- **Responsive Design**: The application is designed to be responsive across various devices.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: Material UI (MUI)
- **Form Handling**: React Hook Form
- **Charting**: ApexCharts
- **State Management**: Context API and LocalStorage
- **Version Control**: GitHub
- **Deployment**: Vercel

## Contributing

Contributions are welcome! Please follow the standard Git workflow (feature branches, meaningful commit messages).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Thanks to hiublue for the opportunity and the assessment challenge!
