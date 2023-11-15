from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from database import database
from table_model import category_model, token_model, login_model
from authorization import auth
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

db = database.Database(url="sqlite:///./database/warehouseManagment.db")
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


@app.get("/category", status_code=200)
async def getCategory(block: __BLOCK):
    db.connect()
    response = db.select("Category")
    db.close()
    return response


@app.get("/category{id_category}", status_code=200)
async def getCategory(id_category: int, block: __BLOCK):
    db.connect()
    response = db.select("Category", {"id": id_category})
    db.close()
    return response


@app.post("/category", status_code=201)
async def createCategory(data: category_model.CategoryModel().Create, block: __BLOCK):
    body = jsonable_encoder(data)
    db.connect()
    response = db.create("Category", body)
    db.close()
    return response


@app.patch("/category", status_code=200)
async def updateCategory(data: category_model.CategoryModel().Update, block: __BLOCK):
    body = jsonable_encoder(data)
    for key, value in dict(body).items():
        if value is None:
            del body[key]
    db.connect()
    response = db.update("Category", {"id": body["id"]}, body)
    db.close()
    return response


@app.delete("/category", status_code=204)
async def deleteCategory(data: category_model.CategoryModel().Delete, block: __BLOCK):
    body = jsonable_encoder(data)
    db.connect()
    response = db.delete("Category", body)
    db.close()
    return response



