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
    response = db.select("Login", {"login": login})
    db.close()
    if response is None or not response:
        raise HTTPException(status_code=404, detail="Account not found")
    return {"id": response[0]["id"], "login": response[0]["login"], "id_pracownik": response[0]["id_pracownik"], "role": response[0]["role"]}


@router.post("/create", status_code=201)
async def createAccount(user: login_model.LoginModel().Create):
    body = jsonable_encoder(user)
    if not auth.verifyPassword(body["password"]):
        raise HTTPException(status_code=400, detail="Passoword not allowed")
    data = auth.createHash(user.password)
    db.connect()
    check = db.select("Login", {"login": body["login"]})
    if check:
        raise HTTPException(status_code=400, detail="Account existed")
    workersBody = {"name": body["name"], "surname": body["surname"], "workplace": body["workplace"]}
    db.create("Workers", workersBody)
    workerID = db.select("Workers", workersBody)
    response = db.create("Login", {"login": user.login, "password": data[1], "role": "PRACOWNIK", "id_pracownik": workerID[0]["id"]})
    check_create = db.select("Login", {"login": user.login})
    if not check_create:
        raise HTTPException(status_code=400, detail="Sol")
    db.create("Salt", {"id_login": check_create[0]["id"], "salt": data[0]})
    db.close()
    if response is None:
        raise HTTPException(status_code=418, detail="I’m a teapot")
    return response


@router.post("/create-unsafe", status_code=201)
async def createUnSafeAccount(user: login_model.LoginModel().Create):
    body = jsonable_encoder(user)
    data = auth.createMd5(user.password)
    db.connect()
    check = db.select("Login", {"login": body["login"]})
    if check:
        raise HTTPException(status_code=400, detail="Account existed")
    workersBody = {"name": body["name"], "surname": body["surname"], "workplace": body["workplace"]}
    db.create("Workers", workersBody)
    workerID = db.select("Workers", workersBody)
    response = db.create("Login", {"login": user.login, "password": data, "salt": 0, "role": "PRACOWNIK", "id_pracownik": workerID[0]["id"]})
    db.close()
    if response is None:
        raise HTTPException(status_code=418, detail="I’m a teapot")
    return response


@router.patch("/", status_code=200)
async def updateAccount(data: login_model.LoginModel().Update, block: __BLOCK):
    if block["role"] != "ADMIN":
        raise HTTPException(status_code=403, detail="Permission Denied")
    body = jsonable_encoder(data)
    for key, value in dict(body).items():
        if value is None:
            del body[key]
    db.connect()
    check = db.select("Login", {"login": body["login"]})
    if not check:
        raise HTTPException(status_code=400, detail="Account not existed")
    if not auth.verifyPassword(body["password"]):
        raise HTTPException(status_code=400, detail="Passoword not allowed")
    new = auth.createHash(body["password"])
    body["password"] = new[1]
    response = db.update("Login", {"id": check[0]["id"]}, body)
    db.update("Salt", {"id_login": check[0]["id"]}, {"salt": new[0]})
    db.close()
    if response is None:
        raise HTTPException(status_code=418, detail="I’m a teapot")
    return response


@router.delete("/", status_code=204)
async def deleteAccount(data: login_model.LoginModel().Delete, block: __BLOCK):
    if block["role"] != "ADMIN":
        raise HTTPException(status_code=403, detail="Permission Denied")
    body = jsonable_encoder(data)
    db.connect()
    check = db.select("Login", {"login": body["login"]})
    if not check:
        raise HTTPException(status_code=400, detail="Account not existed")
    response = db.delete("Login", body)
    db.delete("Salt", {"id_login": check[0]["id"]})
    db.close()
    if response is None:
        raise HTTPException(status_code=418, detail="I’m a teapot")
    return response

