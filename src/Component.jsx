import { useState, useRef } from "react"
import Swal from 'sweetalert2'
import './index.css'

function Component(){
    const [todos,setTodos] = useState([]);
    const [task,setTask] = useState("");
    const [level,setLevel] = useState(1);

    function handleInput(event){
        setTask(event.target.value);
    }

    function AddTodo(){
        if(task.length !== 0){
            setTodos([...todos, {id:Date.now(), todo:task, status:"Mark as Done"}])
            setTask("")
        }
    }
    function removeTodo(id){
        const updated = todos.filter((_,i) => i !== id);
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
                return {...todo,status: todo.status = "Done"};
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
            <button className="add-button" onClick={AddTodo}>Add</button>
            <p>YOUR LEVEL IS {level}</p>
            <ol>{todos.map((item,index)=>
                <li key={item.id}>
                    <span>{item.todo}</span>
                    <button className="remove-button" onClick={()=>removeTodo(index)}>Remove</button>
                    <button className="change-button" onClick={()=>handleStatus(item.id)}>{item.status}</button>
                </li>
            )}</ol>
        </>
    )
}

export default Component