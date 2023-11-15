from pydantic import BaseModel


class LoginModel:
    class Table(BaseModel):
        login: str

    class Create(BaseModel):
        login: str
        password: str
        salt: int

    class Update(BaseModel):
        login: str
        password: str

    class Delete(BaseModel):
        login: str
        password: str
