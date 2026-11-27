# AI Tool Assistant

An AI-powered conversational assistant built using **Node.js, Express.js, React.js, Groq LLM, and MySQL**.

The assistant understands natural-language questions, selects appropriate tools using LLM function calling, executes the selected functions, and generates responses based on actual tool results.

It also supports **conversational memory**, allowing users to maintain context across multiple messages within the same chat session.

---

## Project Overview

The AI Tool Assistant combines two important AI capabilities:

1. **Tool-Calling Agent:** Understands user requests and selects appropriate tools to perform tasks such as calculations, weather searches, database queries, and file searches.
2. **Conversational Agent:** Maintains conversation history using session-based memory and remembers previous messages within a conversation.

The LLM decides which tool is needed, while the backend is responsible for validating and executing the actual functions.

---

## Features

### 1. Calculator Tool

Performs mathematical calculations.

- Addition
- Subtraction
- Multiplication
- Division
- Supports multiple numbers in one operation
- Validates numerical inputs
- Handles division-by-zero errors
- Does not use `eval()`

### 2. Weather Tool

Retrieves current weather information using the OpenWeatherMap API.

- Search weather by city name
- Temperature
- Weather conditions
- Humidity
- Wind speed
- Handles invalid city names and API errors

### 3. Internet Search Tool

Searches the internet using the Tavily API.

- Search information using natural-language queries
- Retrieve relevant search results
- Display result titles
- Display descriptions
- Display source URLs
- Handles empty queries and API errors

### 4. MySQL Database Tools

Connects to a MySQL database and retrieves stored information.

**Available functions:**

- Get students above a specified mark
- Retrieve all products
- Retrieve products by category

**Database features:**

- MySQL database integration
- Parameterized queries
- Read-only database operations
- Input validation
- No arbitrary AI-generated SQL queries

### 5. JavaScript Utility Tools

Provides additional JavaScript-based functionalities.

**Available functions:**

- Get current date and time
- Calculate age from birth year
- Convert Celsius to Fahrenheit
- Convert Fahrenheit to Celsius
- Generate random numbers within a specified range
- Process arrays of numbers

The number-processing function provides:

- Total
- Average
- Minimum
- Maximum

### 6. File Search Tool

Searches local text files for relevant information.

- Search notes using keywords
- Read local `.txt` files
- Retrieve matching information
- Restricts file access to the `data/notes/` directory
- Handles missing files and invalid queries

### 7. Conversational Agent

Maintains conversation context using session-based memory.

**Features:**

- Stores separate conversations using session IDs
- Uses JavaScript `Map` for temporary memory storage
- Remembers previous user messages
- Remembers previous assistant responses
- Uses a sliding window to retain the latest 10 messages
- Supports multiple independent conversations
- Allows users to start a new chat
- Combines conversational memory with tool calling

**Example:**

User: My name is Anny.

Assistant: Nice to meet you, Anny!

User: What is my name?

Assistant: Your name is Anny.

**Memory limitation:** Conversation history is stored temporarily in server memory. It is cleared when the backend server restarts.

---

## Technologies Used

| Technology | Purpose |
|---|---|
| JavaScript (ES6+) | Main programming language |
| Node.js | Backend runtime |
| Express.js | Backend framework |
| React.js | Frontend development |
| Groq API | LLM integration and tool calling |
| MySQL | Database management |
| mysql2 | MySQL database connection |
| OpenWeatherMap API | Weather information |
| Tavily API | Internet search |
| Fetch API | API communication |
| dotenv | Environment variable management |
| fs | File system operations |
| path | File path management |
| Git | Version control |
| GitHub | Source code hosting |
| Vite | React development server |

---

## Project Architecture

The application follows a tool-calling and conversational workflow.

```text
                 USER
                   |
                   v
             REACT FRONTEND
                   |
          Message + Session ID
                   |
                   v
             EXPRESS SERVER
                   |
                   v
             CHAT CONTROLLER
                   |
          Retrieve Conversation
                 History
                   |
                   v
               AI SERVICE
                   |
                   v
                GROQ LLM
                   |
          Understands the Request
                   |
          Selects Appropriate Tool
                   |
                   v
              TOOL REGISTRY
                   |
       +-----------+-----------+
       |           |           |
       v           v           v
   Calculator   Weather     Internet
                 Search      Search

       +-----------+-----------+
       |           |           |
       v           v           v
    MySQL DB   JavaScript   File Search
                 Tools
                   |
                   v
             TOOL EXECUTION
                   |
                   v
              TOOL RESULT
                   |
                   v
                GROQ LLM
                   |
                   v
             FINAL RESPONSE
                   |
                   v
             REACT FRONTEND
                   |
                   v
                 USER
```

---

## How the Application Works

### Tool-Calling Workflow

1. The user enters a question through the React frontend.
2. React sends the message to the Express backend.
3. The chat controller validates the incoming request.
4. The AI service sends the user message and available tool definitions to the Groq LLM.
5. The LLM understands the request and decides whether a tool is required.
6. If a tool is required, the LLM returns a tool call with its name and arguments.
7. The backend identifies the requested function through the tool registry.
8. The selected function is executed.
9. The tool result is sent back to the LLM.
10. The LLM generates a final response using the actual result.
11. The backend sends the response to the frontend.

### Conversational Memory Workflow

1. The frontend generates a unique session ID.
2. The session ID is sent with every chat request.
3. The backend retrieves the conversation history associated with that session.
4. The previous messages and current question are sent to the LLM.
5. The LLM uses the conversation context to understand follow-up questions.
6. The user's message and assistant's response are saved in session memory.
7. The latest 10 messages are retained using a sliding window.

---

## Project Folder Structure

```text
ai-tool-assistant/
│
├── src/
│   │
│   ├── config/
│   │   ├── aiConfig.js
│   │   └── database.js
│   │
│   ├── controllers/
│   │   └── chatController.js
│   │
│   ├── routes/
│   │   └── chatRoutes.js
│   │
│   ├── services/
│   │   └── aiService.js
│   │
│   ├── tools/
│   │   ├── calculator.tool.js
│   │   ├── weather.tool.js
│   │   ├── search.tool.js
│   │   ├── database.tool.js
│   │   ├── javascript.tool.js
│   │   └── fileSearch.tool.js
│   │
│   ├── utils/
│   │   ├── toolRegistry.js
│   │   ├── sessionManager.js
│   │   └── errorHandler.js
│   │
│   ├── app.js
│   └── server.js
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── database/
│   └── schema.sql
│
├── data/
│   └── notes/
│       └── javascript.txt
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Installation and Setup

### Prerequisites

Install the following before running the application:

- Node.js
- npm
- MySQL
- Git
- VS Code (recommended)

You will also need API keys for:

- Groq
- OpenWeatherMap
- Tavily

### 1. Clone the Repository

```bash
git clone git clone https://github.com/daniyamuhammedp/AI-ToolAssistant.git
```

### 2. Navigate to the Project

```bash
cd ai-tool-assistant
```

### 3. Install Backend Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root project directory.

Add the following configuration:

```env
PORT=5000

AI_API_KEY=your_groq_api_key
AI_MODEL=openai/gpt-oss-120b

WEATHER_API_KEY=your_openweathermap_api_key
SEARCH_API_KEY=your_tavily_api_key

DB_HOST=localhost
DB_PORT=3308
DB_USER=root
DB_PASSWORD=
DB_NAME=ai_assistant_db
```

Replace the example API keys and database credentials with your own values.

**Security:** Never upload your `.env` file or expose API keys on GitHub.

### 5. Set Up MySQL Database

Open MySQL and create the database:

```sql
CREATE DATABASE ai_assistant_db;
```

Import the database structure from:

```text
database/schema.sql
```

The database contains the following tables:

- `students`
- `products`

Make sure your MySQL configuration matches the values in your `.env` file.

### 6. Start the Backend Server

From the main project directory, run:

```bash
npm run dev
```

The backend server will run at:

```text
http://localhost:5000
```

### 7. Install Frontend Dependencies

Open another terminal:

```bash
cd client
npm install
```

### 8. Start the React Frontend

```bash
npm run dev
```

Vite will display the frontend development URL, usually:

```text
http://localhost:5173
```

Open that URL in your browser to use the AI Tool Assistant.

**Note:** Run the backend and frontend in separate terminals.

---

## API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Welcome message |
| GET | `/api/health` | Check backend server health |
| GET | `/api/tools` | Retrieve available tools |
| POST | `/api/chat` | Send messages to the AI assistant |

### Example: Chat Request

**Endpoint:**

```text
POST /api/chat
```

**Request body:**

```json
{
  "sessionId": "test-session-001",
  "message": "What is 250 multiplied by 12?"
}
```

**Example response:**

```json
{
  "success": true,
  "sessionId": "test-session-001",
  "userMessage": "What is 250 multiplied by 12?",
  "answer": "250 multiplied by 12 is 3000."
}
```

### Example: Health Check

**Endpoint:**

```text
GET /api/health
```

**Example response:**

```json
{
  "success": true,
  "message": "AI Tool Assistant server is healthy"
}
```

---

## Testing

The following functionalities can be tested through the API or frontend.

| No. | Test | Example Request |
|---|---|---|
| 1 | Calculator | Calculate 250 × 12 |
| 2 | Weather | What is the weather in Kochi? |
| 3 | Internet Search | Search for recent AI developments |
| 4 | Students Database | Show students scoring above 80 |
| 5 | All Products | Show all products |
| 6 | Products by Category | Show Electronics products |
| 7 | Date and Time | What is the current date and time? |
| 8 | Age Calculator | Calculate age from birth year 2003 |
| 9 | Celsius Conversion | Convert 30°C to Fahrenheit |
| 10 | Fahrenheit Conversion | Convert 86°F to Celsius |
| 11 | Random Number | Generate a random number from 1 to 100 |
| 12 | Number Processing | Find total and average of 10, 20, 30, 40 |
| 13 | File Search | Search my JavaScript notes |
| 14 | Conversation Memory | My name is Anny. What is my name? |
| 15 | Memory with Tools | Calculate 250 × 12. What was my previous answer? |
| 16 | New Conversation | Start a new chat and test memory isolation |

---

## Security and Error Handling

The application includes several validation and security measures:

- API keys are stored in environment variables.
- User input is validated before processing.
- Database queries use parameterized statements.
- The AI cannot execute arbitrary SQL queries.
- Database tools are restricted to approved read operations.
- Calculator operations do not use `eval()`.
- File search is restricted to the notes directory.
- Invalid tool arguments are handled.
- Division by zero is handled.
- Centralized error-handling middleware manages backend errors.

---

## Current Limitations

- Conversational memory is temporary and stored in server memory.
- Conversation history is cleared when the backend restarts.
- The application currently uses a sliding window of the latest 10 messages.
- Persistent conversation storage is not implemented.
- The frontend and backend are currently configured for local development.

---

## Future Improvements

- Store conversation history permanently using MySQL.
- Add user authentication.
- Add conversation history and chat management.
- Improve the user interface.
- Add more tools and external API integrations.
- Add persistent user-specific memory.
- Improve error handling and logging.
- Deploy the application to a cloud platform.

---

## Author

**Daniya Muhammed**

GitHub: [Your GitHub Profile](https://github.com/)

---

## Project Goal

This project was developed to gain practical experience in:

- Large Language Models (LLMs)
- LLM tool calling and function execution
- AI agent development
- Conversational memory
- Backend development using Node.js and Express
- REST API development
- React frontend development
- MySQL database integration
- External API integration
- JavaScript programming

**Built as a practical learning project to understand how LLM-powered tool-using and conversational agents work together.**
