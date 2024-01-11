from pydantic import BaseModel


class SaltModel:
    class Table(BaseModel):
        id_login: int
        salt: str

    class Create(BaseModel):
        id_login: int

    class Update(BaseModel):
        id_login: int

    class Delete(BaseModel):
        id_login: int
