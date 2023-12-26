from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from table_model import category_model, token_model, login_model
from authorization import auth
from database import database
from database_connect import get_db

router = APIRouter(prefix="/category")

db = database.Database(url="sqlite:///./database/warehouseManagment.db")
__BLOCK = Annotated[login_model.LoginModel.Table, Depends(auth.getCurrentActiveUser)]

@router.get("/", status_code=200)
async def getCategory(block: __BLOCK, db: database.Database = Depends(get_db)):
    db.connect()
    response = db.select("Category")
    db.close()
    return response


@router.get("/{id_category}", status_code=200)
async def getCategory(id_category: int, block: __BLOCK):
    db.connect()
    response = db.select("Category", {"id": id_category})
    db.close()
    return response


@router.post("/", status_code=201)
async def createCategory(data: category_model.CategoryModel().Create, block: __BLOCK):
    body = jsonable_encoder(data)
    db.connect()
    response = db.create("Category", body)
    db.close()
    return response


@router.patch("/", status_code=200)
async def updateCategory(data: category_model.CategoryModel().Update, block: __BLOCK):
    body = jsonable_encoder(data)
    for key, value in dict(body).items():
        if value is None:
            del body[key]
    db.connect()
    response = db.update("Category", {"id": body["id"]}, body)
    db.close()
    return response


@router.delete("/", status_code=204)
async def deleteCategory(data: category_model.CategoryModel().Delete, block: __BLOCK):
    body = jsonable_encoder(data)
    db.connect()
    response = db.delete("Category", body)
    db.close()
    return response

