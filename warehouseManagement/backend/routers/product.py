from fastapi import Depends, APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from typing import Annotated
from table_model import product_model, login_model
from authorization import auth
from database import database

router = APIRouter(prefix="/product")

db = database.Database(url="sqlite:///./database/warehouseManagment.db")
__BLOCK = Annotated[login_model.LoginModel.Table, Depends(auth.getCurrentActiveUser)]

@router.get("/", status_code=200)
async def getProduct(block: __BLOCK):
    db.connect()
    response = db.select("Product")
    db.close()
    if response is None or not response:
        raise HTTPException(status_code=404, detail="Product not found")
    return response


@router.get("/{id_product}", status_code=200)
async def getProduct(id_product: int, block: __BLOCK):
    db.connect()
    response = db.select("Product", {"id": id_product})
    db.close()
    if response is None or not response:
        raise HTTPException(status_code=404, detail="Product not found")
    return response


@router.post("/", status_code=201)
async def createProduct(data: product_model.ProductModel().Create, block: __BLOCK):
    body = jsonable_encoder(data)
    db.connect()
    check = db.select("Product", {"name": body["name"], "id_category": body["id_category"]})
    if check:
        raise HTTPException(status_code=400, detail="Product existed")
    response = db.create("Product", body)
    db.close()
    if response is None:
        raise HTTPException(status_code=418, detail="I’m a teapot")
    return response


@router.patch("/", status_code=200)
async def updateProduct(data: product_model.ProductModel().Update, block: __BLOCK):
    body = jsonable_encoder(data)
    for key, value in dict(body).items():
        if value is None:
            del body[key]
    db.connect()
    check = db.select("Product", {"id": body["id"]})
    if not check:
        raise HTTPException(status_code=400, detail="Product not existed")
    response = db.update("Product", {"id": body["id"]}, body)
    db.close()
    if response is None:
        raise HTTPException(status_code=418, detail="I’m a teapot")
    return response


@router.delete("/{id_product}", status_code=204)
async def deleteProduct(id_product, block: __BLOCK):
    db.connect()
    check = db.select("Product", {"id": id_product})
    if not check:
        raise HTTPException(status_code=400, detail="Product not existed")
    response = db.delete("Product", {"id": id_product})
    db.close()
    if response is None:
        raise HTTPException(status_code=418, detail="I’m a teapot")
    return response

