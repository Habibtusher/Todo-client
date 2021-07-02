import React, { useEffect, useState } from 'react';
import img from '../images/todo.png';
import './Todo.css'
const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        fetch("https://floating-coast-42596.herokuapp.com/allTodo")
            .then(res => res.json())
            .then(data => setTodo(data))
    }, [todo])

    const addItem = () => {
        if (!inputData) {
            alert('plzz fill data');
        }
        else {
            const allInputData = {
                date: new Date(),
                name: inputData
            }
            const url = `https://floating-coast-42596.herokuapp.com/addTodo`;
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(allInputData)
            })
            setInputData('');
        }
    }

    const deleteItem = (id) => {
        fetch(`https://floating-coast-42596.herokuapp.com/deleteTodo/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(result => {
                
            })
    }
    return (
        <>
            <div className="container">
                <div>
                    <figure>
                        <img style={{ height: "150px" }} src={img} alt="todologo" />
                        <figcaption className="pt-3">Add Your List Here ✌</figcaption>
                    </figure>

                    <div className="addItems ">
                        <input style={{ width: "98%", fontSize: "30px",borderRadius:"10px" }} className="shadow pt-3 pb-3" type="text" placeholder="✍ Add Todo..."
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>

                    </div>

                    <div className="mt-4 pb-5 mb-5" >

                        {
                            todo.map((elem) => {
                                return (
                                    <div className=" eachItem d-flex align-items-center justify-content-between p-4" key={elem._id}>
                                        <h4>{elem.name}</h4>
                                        <div className="todo-btn">
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem._id)}></i>
                                        </div>
                                    </div>
                                )
                            })

                        }

                    </div>

                </div>
            </div>
        </>
    );
};

export default Todo;