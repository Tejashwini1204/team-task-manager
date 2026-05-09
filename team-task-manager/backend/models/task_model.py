from pydantic import BaseModel

class TaskModel(BaseModel):
    title: str
    description: str
    assigned_to: str
    status: str
    due_date: str