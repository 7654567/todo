import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

function App() {
    const task_1:TaskType[] = [
        {id:1, task:"HTML&CSS", isDone:false},
        {id:2, task:"JS", isDone:true},
        {id:3, task:"React", isDone:false},
        {id:4, task:"task_4", isDone:true},
    ]
    const task_2:TaskType[] = [
        {id:3, task:"task_4", isDone:true},
        {id:4, task:"task_5", isDone:true},
        {id:5, task:"task_6", isDone:false},
    ]
    return (
        <div className="App">

            <TodoList title="What to do?" tasks={task_1} />
            <TodoList title="What to buy?" tasks={task_2} />
            <TodoList title="What to learn?" tasks={task_1}/>
        </div>
    );
}

export default App;
