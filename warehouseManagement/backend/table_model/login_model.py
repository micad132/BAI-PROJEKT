from pydantic import BaseModel


class LoginModel:
    class Table(BaseModel):
        login: str
        role: str

    class Create(BaseModel):
        login: str
        password: str

    class Update(BaseModel):
        login: str
        password: str
        role: str

    class Delete(BaseModel):
        login: str
        password: str
