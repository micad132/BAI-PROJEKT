from pydantic import BaseModel

class TokenModel(BaseModel):
    access_token: str
    token_type: str
    refresh_token: str
    name: str
    surname: str
    email: str
    workplace: str
    role: str