from fastapi import Depends, APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from typing import Annotated
from table_model import worker_model, login_model
from authorization import auth
from database import database

router = APIRouter(prefix="/worker")

db = database.Database(url="sqlite:///./database/warehouseManagment.db")
__BLOCK = Annotated[login_model.LoginModel.Table, Depends(auth.getCurrentActiveUser)]


@router.get("/", status_code=200)
async def getWorker(block: __BLOCK):
    db.connect()
    response = db.select("Workers")
    db.close()
    if response is None or not response:
        raise HTTPException(status_code=404, detail="Workers not found")
    return response


@router.get("/{id_worker}", status_code=200)
async def getWorker(id_worker, block: __BLOCK):
    db.connect()
    response = db.query(f"SELECT * FROM Workers WHERE id = {id_worker}")
    db.close()
    if response is None or not response:
        raise HTTPException(status_code=404, detail="Workers not found")
    return response


@router.post("/", status_code=201)
async def createWorker(data: worker_model.WorkerModel().Create, block: __BLOCK):
    if block["role"] != "ADMIN":
        raise HTTPException(status_code=403, detail="Permission Denied")
    body = jsonable_encoder(data)
    db.connect()
    check = db.select("Workers", {"name": body["name"], "surname": body["surname"]})
    if check:
        raise HTTPException(status_code=400, detail="Workers existed")
    response = db.create("Workers", body)
    db.close()
    if response is None:
        raise HTTPException(status_code=418, detail="I’m a teapot")
    return response


@router.patch("/", status_code=200)
async def updateWorker(data: worker_model.WorkerModel().Update, block: __BLOCK):
    if block["role"] != "ADMIN":
        raise HTTPException(status_code=403, detail="Permission Denied")
    body = jsonable_encoder(data)
    for key, value in dict(body).items():
        if value is None:
            del body[key]
    db.connect()
    check = db.select("Workers", {"id": body["id"]})
    if not check:
        raise HTTPException(status_code=400, detail="Workers not existed")
    response = db.update("Workers", {"id": body["id"]}, body)
    db.close()
    if response is None:
        raise HTTPException(status_code=418, detail="I’m a teapot")
    return response


@router.delete("/{id_worker}", status_code=204)
async def deleteWorker(id_worker,  block: __BLOCK):
    if block["role"] != "ADMIN":
        raise HTTPException(status_code=403, detail="Permission Denied")
    db.connect()
    check = db.select("Workers", {"id": id_worker})
    if not check:
        raise HTTPException(status_code=400, detail="Workers not existed")
    response = db.delete("Workers", {"id": id_worker})
    db.close()
    if response is None:
        raise HTTPException(status_code=418, detail="I’m a teapot")
    return response
