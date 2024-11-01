# To-Do List

This is a simple To-Do List application with an Express.js backend and a HTML5/CSS/JavaScript frontend. Users can do basic CUDA actions, like add, edit, complete, and delete tasks. Open tasks appear at the top of the list in oldest-first order, while completed tasks are moved to the bottom in oldest-first order.

## Features (CUDA)

- **Create Tasks**: Create new tasks, which appear at the top of the list.
- **Update Tasks**: Edit existing tasks directly within the list.
- **Delete Tasks**: Remove tasks from the list.
- **Complete Tasks**: Mark tasks as completed, which automatically moves them to the bottom.

## Technologies

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript
- **Icons**: Font Awesome (for action buttons)

## Project Structure

```bash
todo-app/
│
├── backend/
│   └── server.js        # Backend server with Express API routes
│
├── docs/                # Frontend
│   ├── index.html       # Main HTML file for the frontend
│   ├── script.js        # JavaScript file for frontend functionality
│   └── style.css        # CSS file for frontend styling
│
└── package.json         # Node.js dependencies
```

## Getting Started

1. **Clone the Repository**:
 ```bash
  git clone https://github.com/your-username/todo-app.git
  cd todo-app
 ```
2. **Install Dependencies**:
 ```bash
  cd backend
  npm install 
```

3. **Run the Application**:
   
   - **Start the backend server:**
     ```bash
      node server.js
      ```
   
  - Open`docs/index.html`in your browser.


## Usage

- **Add** a task in the input field and click "Add Task."
- **Edit** a task by clicking "Edit" next to it.
- **Complete** a task by clicking the check icon.
- **Delete** a task with the trash icon.

## API Overview

- **POST** `/tasks: Add a task.
- **GET** `/tasks:` Retrieve sorted tasks.
- **PATCH** `/tasks/:id:` Mark task as completed.
- **PATCH** `/tasks/:id/edit:` Edit task description.
- **DELETE** `/tasks:id:` Delete a task.
