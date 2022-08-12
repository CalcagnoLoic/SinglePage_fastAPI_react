from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


todos = [
    {
        "id": "1",
        "item": "Read a book"
    },
    {
        "id": "2",
        "item": "Cycle around town"
    }
]


app = FastAPI()

origins = [
    "localhost:3000"
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", status_code=200, tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list"}


@app.get("/todo", status_code=200, tags=["todos"])
async def get_todos() -> dict:
    return {"data": todos}


@app.post("/todo", status_code=201, tags=["todos"])
async def add_todo(todo: dict) -> dict:
    todos.append(todo)
    return {"data": {"Todo added."}}
