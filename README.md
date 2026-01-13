# Quiz Builder

Full-stack web application for creating and managing custom quizzes with various question types.

## Tech Stack

### Backend

- **Node.js** with **Nest.js** framework
- **TypeScript**
- **Prisma** ORM with **PostgreSQL** database
- **ESLint** & **Prettier** for code quality

### Frontend

- **Next.js** 14 with **React** (App Router)
- **TypeScript**
- **Tailwind CSS** for styling
- **React Hook Form** for form management
- **Zod** for schema validation
- **TanStack Query** (React Query) for data fetching
- **React Hot Toast** for notifications

## Project Structure

```
quiz-builder/
├── backend/                    # Nest.js backend API
│   ├── src/
│   │   ├── modules/
│   │   │   └── quizzes/        # Quiz module
│   │   │       ├── dto/        # Data Transfer Objects
│   │   │       ├── quizzes.controller.ts
│   │   │       ├── quizzes.service.ts
│   │   │       └── quizzes.module.ts
│   │   ├── prisma/             # Prisma service and module
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── migrations/         # Database migrations
│   └── package.json
├── frontend/                   # Next.js frontend (App Router)
│   ├── app/                    # Next.js App Router pages
│   │   ├── create/             # Quiz creation page
│   │   │   ├── hooks/          # Custom hooks
│   │   │   ├── schemas/        # Zod validation schemas
│   │   │   └── page.tsx
│   │   ├── quizzes/            # Quiz pages
│   │   │   ├── [id]/          # Dynamic quiz detail page
│   │   │   └── page.tsx        # Quiz list page
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── question-form/      # Question form components
│   │   ├── quiz-card/          # Quiz card component
│   │   ├── empty-state/        # Empty state component
│   │   ├── loading-state/      # Loading state component
│   │   └── providers/          # Context providers
│   ├── shared/                 # Shared utilities and UI
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── button/
│   │   │   ├── link-button/
│   │   │   └── back-link/
│   │   └── query-keys/         # React Query keys
│   ├── services/               # API services
│   │   ├── quizzes.service.ts
│   │   ├── types/
│   │   └── utils/
│   ├── styles/
│   │   └── globals.css         # Global styles with Tailwind
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- yarn
- PostgreSQL (v12 or higher)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

The `.env` file should contain:

```
DATABASE_URL="postgresql://user:password@localhost:5432/quiz_builder?schema=public"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

**Note:** Replace `user`, `password`, and `quiz_builder` with your PostgreSQL credentials and database name.

4. Create PostgreSQL database:

```bash
# Using psql
createdb quiz_builder

# Or using SQL
psql -U postgres
CREATE DATABASE quiz_builder;
```

5. Generate Prisma client and run migrations:

```bash
yarn prisma:generate
yarn prisma:migrate
```

6. Start the development server:

```bash
yarn start:dev
```

The backend will be running on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env.local` file in the `frontend` directory:

```bash
cp .env.example .env.local
```

The `.env.local` file should contain:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Start the development server:

```bash
yarn dev
```

The frontend will be running on `http://localhost:3000`

## API Endpoints

### `POST /quizzes`

Create a new quiz with questions.

**Request Body:**

```json
{
  "title": "My Quiz",
  "questions": [
    {
      "type": "boolean",
      "text": "Is TypeScript a programming language?",
      "correctAnswer": "true"
    },
    {
      "type": "input",
      "text": "What is the capital of France?",
      "correctAnswer": "Paris"
    },
    {
      "type": "checkbox",
      "text": "Select all programming languages",
      "options": "[\"JavaScript\", \"HTML\", \"Python\", \"CSS\"]",
      "correctAnswer": "[\"JavaScript\", \"Python\"]"
    }
  ]
}
```

### `GET /quizzes`

Get a list of all quizzes with titles and question counts.

**Response:**

```json
[
  {
    "id": "uuid",
    "title": "My Quiz",
    "questionCount": 3,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### `GET /quizzes/:id`

Get full details of a specific quiz including all questions.

### `DELETE /quizzes/:id`

Delete a quiz by ID.

## Question Types

### Boolean (True/False)

- Simple true/false questions
- Correct answer: `"true"` or `"false"`

### Input (Short Text Answer)

- Text input questions
- Correct answer: exact string match

### Checkbox (Multiple Choice)

- Multiple correct answers
- Options: JSON array of strings
- Correct answer: JSON array of selected options

## Creating a Sample Quiz

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Click "Create Quiz"
4. Fill in the quiz title
5. Add questions using the form
6. Select question types and provide correct answers
7. Click "Create Quiz" to save

## Validation

The project uses different validation approaches for backend and frontend:

- **Backend**: Uses `class-validator` with NestJS DTOs for request validation
- **Frontend**: Uses **Zod** schemas with React Hook Form for form validation

Zod schemas are located in `frontend/app/create/schemas/quiz.schema.ts` and provide:

- Type-safe form validation
- Custom validation rules for different question types
- Automatic TypeScript type inference

## Code Quality

### Linting and Formatting

**Backend:**

```bash
cd backend
yarn lint      # Run ESLint
yarn format    # Format with Prettier
```

**Frontend:**

```bash
cd frontend
yarn lint      # Run ESLint
yarn format    # Format with Prettier
```

## Database

The application uses PostgreSQL. Make sure PostgreSQL is installed and running on your system.

### Setting up PostgreSQL

1. **Install PostgreSQL** (if not already installed):

   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - macOS: `brew install postgresql` or download from postgresql.org
   - Linux: `sudo apt-get install postgresql` (Ubuntu/Debian)

2. **Start PostgreSQL service**:

   - Windows: PostgreSQL service should start automatically
   - macOS: `brew services start postgresql`
   - Linux: `sudo systemctl start postgresql`

3. **Create database**:

   ```bash
   createdb quiz_builder
   # Or using psql:
   psql -U postgres
   CREATE DATABASE quiz_builder;
   ```

4. **Update `.env` file** with your PostgreSQL connection string:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/quiz_builder?schema=public"
   ```

### Database Management

To view and edit data using Prisma Studio:

```bash
cd backend
yarn prisma:studio
```

This will open Prisma Studio in your browser where you can view and edit data.

## Features

- ✅ Create quizzes with multiple question types (Boolean, Input, Checkbox)
- ✅ View all quizzes in a dashboard
- ✅ View individual quiz details
- ✅ Delete quizzes
- ✅ Responsive design with Tailwind CSS
- ✅ Form validation with Zod schemas
- ✅ Type-safe API with TypeScript
- ✅ Client-side state management with React Query

## License

MIT
