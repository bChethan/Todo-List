import { useState, useRef } from "react"
import Swal from 'sweetalert2'
import './index.css'

function SoloLevelingTodo(){
    const [todos,setTodos] = useState([]);
    const [task,setTask] = useState("");
    const [description,setDescription] = useState("");
    const [level,setLevel] = useState(1);

    function handleInput(event){
        setTask(event.target.value);
    }

    function handleDescription(event){
        setDescription(event.target.value);
    }

    function addTodo(){
        if(task.length === 0 || description.length ===0){
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please enter both task and description.",
                confirmButtonText: "Okay",
              });
              return;
        }
        setTodos([...todos, {id:Date.now(), todo:task, description: description, status:"Mark as Done"}]);
        setTask("");
        setDescription("")
    }
    function removeTodo(id){
        const updated = todos.filter(todo=> todo.id!== id);
        setTodos(updated)
    }
    function handleStatus(id){
        setTodos(todos.map(
            todo=>{if(todo.id === id && todo.status !== "Done"){
                setLevel(l => l+1)
                Swal.fire({
                    title: 'You leveled up!',
                    confirmButtonText: 'Close',
                    draggable: true
                });
                return {...todo,status: "Done"};
            }
                return todo;
            }
        ))
    }

    return(
        <>
            <h1>ARISE</h1>
            <p>Congratulations on becoming a Player.</p>
            <input type="text" placeholder="ENTER YOUR TASKS" value={task}
             onChange={handleInput} onKeyDown={(e) => e.key === "Enter" && AddTodo()}/>
             <br /><br />
            <input type="text" placeholder="ENTER DESCRIPTION" value={description} 
            onChange={handleDescription}/>
            <button className="add-button" onClick={addTodo}>Add</button>
            <p>YOUR LEVEL IS {level}</p>
            <ol>{todos.map((item,index)=>
                <li key={item.id}>
                    <span>Task: {item.todo}</span>
                    <button className="remove-button" onClick={()=>removeTodo(item.id)}>Remove</button>
                    <button className="change-button" onClick={()=>handleStatus(item.id)}>{item.status}</button>
                    <div>Description: {item.description}</div>
                </li>
            )}</ol>
        </>
    )
}

export default SoloLevelingTodo