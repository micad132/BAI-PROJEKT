from typing import Optional
from pydantic import BaseModel


class WorkerModel:
    class Create(BaseModel):
        name: str
        surname: str
        workplace: str

    class Update(BaseModel):
        id: int
        name: Optional[str] = None
        surname: Optional[str] = None
        workplace: Optional[str] = None

    class Delete(BaseModel):
        id: int
