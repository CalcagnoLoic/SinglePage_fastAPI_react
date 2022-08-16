import React, { useEffect, useState} from "react";
import {
    Box,
    Button, Flex,
    Input,
    InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    Stack, Text, useDisclosure,
} from "@chakra-ui/react"
import axios from "axios";

const TodosContext = React.createContext({
    todos: [], fetchTodos: () => {}
})

//////////////////////////////////////////
///////////////Ajout d'un objet à l'API

const AddTodo = () => {
    const [item, setItem] = React.useState("")
    const {todos, fetchTodos} = React.useContext(TodosContext)

    const handleInput = event => {
        setItem(event.target.value)
    }

    const handleSubmit = (event) => {
        axios.post("http://localhost:8000/todo", {
            "id": todos.length + 1,
            "item": item
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

//////////////////////////////////////////
///////////Mise à jour d'un objet de l'API

const UpdateTodo = ({item, id}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [todo, setTodo] = useState(item)
    const {fetchTodos} = React.useContext(TodosContext)

    const updateTodo = async () => {
        await fetch(`http://localhost:8000/todo/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({item: todo})
        })
        onClose()
        await fetchTodos()
    }

    return (
        <>
            <Button onclick={onOpen}>Update Todo</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Update Todo</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <InputGroup>
                            <Input
                                type="text"
                                value={todo}
                                onChange={e => setTodo(e.target.value)}
                            />
                        </InputGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button onclick={updateTodo}>Update Todo</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

//////////////////////////////////////////
///////////Suppression d'un objet de l'API

const DeleteTodo = ({id}) => {
    const {fetchTodos} = React.useContext(TodosContext)

    const deleteTodo = async () => {
        await fetch(`http://localhost:8000/todo/${id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: {"id": id}
        })
        await fetchTodos()
    }

    return (
        <Button onclick={deleteTodo}>Delete Todo</Button>
    )
}

const TodoHelper = ({item, id, fetchTodos}) => {
    return (
        <Box>
            <Flex>
                <Text>
                    {item}
                    <Flex>
                        <UpdateTodo item={item} id={id} fetchTodos={fetchTodos} />
                        <DeleteTodo id={id} fetchTodos={fetchTodos} />
                    </Flex>
                </Text>
            </Flex>
        </Box>
    )
}

//////////////////////////////////////////
///////////Export vers l'index.js

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
                {
                    todos.map((todo, key) => (
                        <TodoHelper item={todo.item} id={todo.id} fetchTodos={fetchTodos()} />
                ))}
            </Stack>
        </TodosContext.Provider>
    )
}

