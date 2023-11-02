from typing import Optional

from pydantic import BaseModel


class ProductModel:
    class Create(BaseModel):
        id_category: int
        name: str
        describe: str

    class Update(BaseModel):
        id: int
        id_category: Optional[str] = None
        name: Optional[str] = None
        describe: Optional[str] = None

    class Delete(BaseModel):
        id: int
