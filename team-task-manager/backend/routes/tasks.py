from models.task_model import TaskModel
from fastapi import APIRouter
from database import tasks_collection

router = APIRouter()


# GET TASKS
@router.get("/tasks")
async def get_tasks():

    tasks = []

    async for task in tasks_collection.find():

        task["_id"] = str(task["_id"])

        tasks.append(task)

    return tasks


# CREATE TASK
@router.post("/tasks")
async def create_task(task: dict):

    await tasks_collection.insert_one(task)

    return {
        "message": "Task created successfully"
    }


# UPDATE TASK STATUS
@router.put("/tasks/{title}")
async def update_task(title: str, status: str):

    await tasks_collection.update_one(
        {"title": title},
        {"$set": {"status": status}}
    )

    return {
        "message": "Task updated successfully"
    }


# DELETE TASK
@router.delete("/tasks/{title}")
async def delete_task(title: str):

    await tasks_collection.delete_one({
        "title": title
    })

    return {
        "message": "Task deleted successfully"
    }