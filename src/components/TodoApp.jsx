import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebase.utils';
import firebase from 'firebase/compat/app';
import '../App.css';
import TodoItem from './TodoItem';

function TodoApp() {
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([]);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const userTodoCollection = db.collection(`users/${user.uid}/todos`);

            userTodoCollection
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setTodos(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            todo: doc.data().todo,
                            timestamp: doc.data().timestamp,
                            completed: doc.data().completed || false,
                        }))
                    );
                });
        }
    }, [user]);

    const addTodo = (e) => {
        e.preventDefault();

        if (user) {
            const userTodoCollection = db.collection(`users/${user.uid}/todos`);

            userTodoCollection.add({
                todo: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                completed: false,
            });

            setInput('');
        }
    };

    return (
        <div className="App">
            <div className='card border-0 mb-0'>
                <h1 className='title'>TODO LIST</h1>
                <form className='input-group mb-3'>
                    <input
                        type='text'
                        className='form-control me-3 rounded'
                        placeholder='Add todo'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    <button
                        type='submit'
                        className='btn btn-primary rounded addTodo'
                        onClick={addTodo}
                        disabled={input.trim() === ''}
                    >
                        ADD TODO
                    </button>
                </form>
            </div>
            <div className='card mt-0'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col' className='table-heading text-center'>

                            </th>
                            <th scope='col' className='table-heading w-75'>
                                TODO
                            </th>
                            <th scope='col' className='table-heading text-end pe-3'>
                                EDIT
                            </th>
                            <th scope='col' className='table-heading text-right'>
                                DELETE
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    {user ? 'Please add todos' : 'Please log in to view todos'}
                                </td>
                            </tr>
                        ) : (
                            todos.map((todo) => (
                                <TodoItem key={todo.id} todo={todo} userUid={user.uid} />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TodoApp;
