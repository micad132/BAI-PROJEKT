from typing import Optional
from pydantic import BaseModel


class CategoryModel:
    class Create(BaseModel):
        name: str

    class Update(BaseModel):
        id: int
        name: Optional[str] = None

    class Delete(BaseModel):
        id: int
