from fastapi import Depends, APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from typing import Annotated
from table_model import login_model
from authorization import auth
from database import database

router = APIRouter(prefix="/Account")

db = database.Database(url="sqlite:///./database/warehouseManagment.db")
__BLOCK = Annotated[login_model.LoginModel.Table, Depends(auth.getCurrentActiveUser)]


@router.get("/{login}", status_code=200)
async def getLogin(login: str, block: __BLOCK):
    db.connect()
    response = db.select("Login", {"login": login})[0]
    db.close()
    if response is None or not response:
        raise HTTPException(status_code=404, detail="Account not found")
    return {"id": response["id"], "login": response["login"], "id_pracownik": response["id_pracownik"]}


@router.post("/create", status_code=201)
async def createAccount(user: login_model.LoginModel().Create):
    data = auth.createHash(user.password)
    db.connect()
    response = db.create("Login", {"login": user.login, "password": data[1], "salt": data[0]})
    db.close()
    if response is None:
        raise HTTPException(status_code=418, detail="I’m a teapot")
    return response


@router.patch("/", status_code=200)
async def updatePassword(data: login_model.LoginModel().Update, block: __BLOCK):
    body = jsonable_encoder(data)
    for key, value in dict(body).items():
        if value is None:
            del body[key]
    db.connect()
    check = db.select("Login", {"id": body["id"], "login": body["login"]})
    if not check:
        raise HTTPException(status_code=400, detail="Account not existed")
    response = db.update("Login", {"id": body["id"]}, body)
    db.close()
    if response is None:
        raise HTTPException(status_code=418, detail="I’m a teapot")
    return response


@router.delete("/", status_code=204)
async def deleteAccount(data: login_model.LoginModel().Delete, block: __BLOCK):
    body = jsonable_encoder(data)
    db.connect()
    check = db.select("Login", {"id": body["id"], "login": body["login"]})
    if not check:
        raise HTTPException(status_code=400, detail="Account not existed")
    response = db.delete("Login", body)
    db.close()
    if response is None:
        raise HTTPException(status_code=418, detail="I’m a teapot")
    return response

