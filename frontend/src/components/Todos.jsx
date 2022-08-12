import React, {useContext, useEffect, useState} from "react";
import {
    Input,
    InputGroup,
    Stack,
} from "@chakra-ui/react"

const TodoContext = React.createContext({
    todos: [], fetchTodos: () => {}
})

export default function Todos() {
    const [todos, setTodos] = useState([])
    const fetchTodos = async () => {
        const response = await fetch("http://localhost:8000/todo")
        const todos = await response.json()
        setTodos(todos.data)
    }
    useEffect(() => {
        fetchTodos()
    }, [])
    return (
        <TodoContext.Provider value={{todos, fetchTodos}}>
            <AddTodo />
            <Stack spacing={5} className="p-2">
                {todos.map((todo) => (
                    <b>{todo.item}</b>
                ))}
            </Stack>
        </TodoContext.Provider>
    )
}

const AddTodo = () => {
    const [item, setItem] = React.useState("")
    const {todos, fetchTodos} = React.useContext(TodoContext)

    const handleInput = event => {
        setItem(event.target.value)
    }

    const handleSubmit = (event) => {
        const newTodo = {
            "id": todos.length + 1,
            "item": item
        }

        fetch("http://localhost:8000/todo", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newTodo)
        })
            .then(fetchTodos)

    }

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup className="text-xl">
                <Input
                    className="p-5 m-7"
                    type="text"
                    placeholder="Add a todo item"
                    aria-label="Add a to item"
                    onChange={handleInput}
                />
            </InputGroup>
        </form>
    )
}


