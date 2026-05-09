from models.project_model import ProjectModel
from fastapi import APIRouter
from database import projects_collection

router = APIRouter()

# Get Projects
@router.get("/projects")
async def get_projects():

    projects = []

    async for project in projects_collection.find():

        project["_id"] = str(project["_id"])

        projects.append(project)

    return projects


# Create Project
@router.post("/projects")
async def create_project(project: dict):

    await projects_collection.insert_one(project)

    return {
        "message": "Project created successfully"
    }