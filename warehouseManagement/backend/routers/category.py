from fastapi import Depends, APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from typing import Annotated
from table_model import category_model, login_model
from authorization import auth
from database import database

router = APIRouter(prefix="/category")

db = database.Database(url="sqlite:///./database/warehouseManagment.db")
__BLOCK = Annotated[login_model.LoginModel.Table, Depends(auth.getCurrentActiveUser)]

@router.get("/", status_code=200)
async def getCategory(block: __BLOCK):
    db.connect()
    response = db.select("Category")
    db.close()
    if response is None or not response:
        raise HTTPException(status_code=404, detail="Category not found")
    return response


@router.get("/{id_category}", status_code=200)
async def getCategory(id_category: int, block: __BLOCK):
    db.connect()
    response = db.select("Category", {"id": id_category})
    db.close()
    if response is None or not response:
        raise HTTPException(status_code=404, detail="Category not found")
    return response


@router.post("/", status_code=201)
async def createCategory(data: category_model.CategoryModel().Create, block: __BLOCK):
    body = jsonable_encoder(data)
    db.connect()
    check = db.select("Category", {"name": body["name"]})
    if check:
        raise HTTPException(status_code=400, detail="Category existed")
    response = db.create("Category", body)
    db.close()
    if response is None:
        raise HTTPException(status_code=418, detail="I’m a teapot")
    return response


@router.patch("/", status_code=200)
async def updateCategory(data: category_model.CategoryModel().Update, block: __BLOCK):
    body = jsonable_encoder(data)
    for key, value in dict(body).items():
        if value is None:
            del body[key]
    db.connect()
    check = db.select("Category", {"id": body["id"]})
    if not check:
        raise HTTPException(status_code=400, detail="Category not existed")
    response = db.update("Category", {"id": body["id"]}, body)
    db.close()
    if response is None:
        raise HTTPException(status_code=418, detail="I’m a teapot")
    return response


@router.delete("/{id_category}", status_code=204)
async def deleteCategory(id_category, block: __BLOCK):
    db.connect()
    check = db.select("Category", {"id": id_category})
    if check:
        raise HTTPException(status_code=400, detail="Category not existed")
    response = db.delete("Category", {"id": id_category})
    db.close()
    if response is None:
        raise HTTPException(status_code=418, detail="I’m a teapot")
    return response

