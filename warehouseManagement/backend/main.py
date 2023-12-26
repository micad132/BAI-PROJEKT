from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from database import database
from table_model import category_model, token_model, login_model
from authorization import auth
from routers import category
import uvicorn

app = FastAPI()
origins = [
    "http://localhost.com",
    "https://localhost.com",
    "http://localhost",
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = database.Database(url="sqlite:///./database/warehouseManagment.db")
    try:
        yield db
    finally:
        db.close()


app.include_router(category.router, dependencies=[Depends(get_db)])

__BLOCK = Annotated[login_model.LoginModel.Table, Depends(auth.getCurrentActiveUser)]


#AUTORYZACJA
@app.post("/token", response_model= token_model.TokenModel)
async def loginForAccessToken(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = auth.authenticateUser(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=30)
    access_token = auth.createAccessToken(data={"sub": user["login"]}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}



