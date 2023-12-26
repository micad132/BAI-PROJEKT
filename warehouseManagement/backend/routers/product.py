from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from table_model import product_model, token_model, login_model
from authorization import auth
from database import database
from database_connect import get_db

router = APIRouter(prefix="/product")

db = database.Database(url="sqlite:///./database/warehouseManagment.db")
__BLOCK = Annotated[login_model.LoginModel.Table, Depends(auth.getCurrentActiveUser)]

@router.get("/", status_code=200)
async def getProduct(block: __BLOCK, db: database.Database = Depends(get_db)):
    db.connect()
    response = db.select("Product")
    db.close()
    return response


@router.get("/{id_product}", status_code=200)
async def getProduct(id_product: int, block: __BLOCK):
    db.connect()
    response = db.select("Product", {"id": id_product})
    db.close()
    return response


@router.post("/", status_code=201)
async def createProduct(data: product_model.ProductModel().Create, block: __BLOCK):
    body = jsonable_encoder(data)
    db.connect()
    response = db.create("Product", body)
    db.close()
    return response


@router.patch("/", status_code=200)
async def updateProduct(data: product_model.ProductModel().Update, block: __BLOCK):
    body = jsonable_encoder(data)
    for key, value in dict(body).items():
        if value is None:
            del body[key]
    db.connect()
    response = db.update("Product", {"id": body["id"]}, body)
    db.close()
    return response


@router.delete("/", status_code=204)
async def deleteProduct(data: product_model.ProductModel().Delete, block: __BLOCK):
    body = jsonable_encoder(data)
    db.connect()
    response = db.delete("Product", body)
    db.close()
    return response

