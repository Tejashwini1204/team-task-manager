from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth import router as auth_router
from routes.tasks import router as task_router
from routes.projects import router as project_router

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://team-task-manager-seven-peach-42.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(task_router)
app.include_router(project_router)

@app.get("/")
def home():
    return {"message": "Backend Running"}