from pydantic import BaseModel
from typing import List

class ProjectModel(BaseModel):
    name: str
    description: str
    members: List[str]