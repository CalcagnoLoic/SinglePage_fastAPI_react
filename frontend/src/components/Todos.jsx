import React, { useEffect, useState} from "react";
import {
    Input,
    InputGroup,
    Stack,
} from "@chakra-ui/react"
import axios from "axios";

const TodosContext = React.createContext({
    todos: [], fetchTodos: () => {}
})

const AddTodo = () => {
    const [item, setItem] = React.useState("")
    const {todos, fetchTodos} = React.useContext(TodosContext)

    const handleInput = event => {
        setItem(event.target.value)
    }

    const handleSubmit = (event) => {
        axios.post("http://localhost:8000/todo", {
            "id": todos.length + 1,
            "item": (item)
        }).then("Réussi")

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

export default function Todos() {
    const [todos, setTodos] = useState([])
    const fetchTodos = async () => {
        const response = await fetch("http://localhost:8000/todo")
        const todos = await response.json()
        setTodos(todos.data)
    }
    useEffect(() => {
        fetchTodos().then()
    }, [])
    return (
        <TodosContext.Provider value={{todos, fetchTodos}}>
            <AddTodo />
            <Stack spacing={5} className="p-2">
                {todos.map((todo, key) => (
                    <b key={key}>{todo.item}</b>
                ))}
            </Stack>
        </TodosContext.Provider>
    )
}

