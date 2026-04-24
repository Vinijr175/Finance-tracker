# Personal Finance Tracker 

A full-stack solution for personal finance management, built with a focus on clean architecture and efficient data flow.

##  Project Structure & Architecture
- **Frontend (`/personal-finance-tracker`)**: Built with React and TypeScript. I chose a **Modular Directory Structure** to separate concerns:
  - `core/`: Centralized types and constants to ensure data consistency.
  - `hooks/`: Isolated business logic from UI components using Custom Hooks.
  - `services/`: Abstracted API logic to make the app easier to maintain.
- **Backend (`/finance-server`)**: A lightweight Node.js/Express REST API.
  - `data.json`: Used for persistence to ensure user data survives browser refreshes.

##  Design Choices & Engineering Judgment

### 1. State Management via Custom Hooks
Instead of cluttering components with logic, I used a centralized `useTransactions` hook. This makes the code **reusable** and **testable**, satisfying the requirement for "Sound State Management."

### 2. Optimistic UI Updates
When a user adds a transaction, the UI updates **instantly** before the server responds. 
- **Reasoning**: This provides a superior User Experience (UX) by removing perceived network lag.
- **Error Handling**: I implemented a rollback mechanism; if the server fails, the UI reverts to its previous state.

### 3. CSS Modules for Styling
I chose **CSS Modules** over global CSS to prevent "style bleeding." This ensures that styles remain scoped to their specific components, making the UI more robust and scalable.

### 4. Data Visualization (Stretch Goal)
Integrated **Recharts** to provide "Spending Patterns" as requested. I specifically filtered data into separate "Expense" and "Income" sets to give the user high-signal financial insights.

##  Setup Instructions
1. **Start Backend**: `cd finance-server` -> `node server.js`
2. **Start Frontend**: `cd personal-finance-tracker` -> `npm run dev`


##  Dependencies
- **Recharts**: For high-quality, responsive data visualization.
- **UUID**: To ensure every transaction has a unique identifier for safe data manipulation.
- **Express/CORS**: To build the backend API and handle cross-origin security.


### My Approach
I focused on building a "Frontend-First" architecture that communicates with a lightweight REST API. I prioritized data integrity and user experience by using TypeScript and "Optimistic UI" updates.

### Tradeoffs
- **Persistence**: I chose a JSON file-based database for the backend. While a full Database (like MongoDB) would be more scalable, the JSON file allowed for faster setup and easier portability for this submission while still proving I can handle API data flows.
- **Testing**: Due to time constraints, I focused on manual edge-case testing and UI validation rather than an automated test suite (Jest).

### Future Improvements 
- **User Authentication**: I would add a login system to allow multiple users to have private accounts.
- **Advanced Filtering**: I'd implement date-range filtering (e.g., "Show me last month's spending").
- **Cloud Hosting**: I would deploy the backend to a platform like Render or Heroku.

