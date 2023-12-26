from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from table_model import worker_model, token_model, login_model
from authorization import auth
from database import database
from database_connect import get_db

router = APIRouter(prefix="/worker")

db = database.Database(url="sqlite:///./database/warehouseManagment.db")
__BLOCK = Annotated[login_model.LoginModel.Table, Depends(auth.getCurrentActiveUser)]


@router.get("/", status_code=200)
async def getWorker(block: __BLOCK, db: database.Database = Depends(get_db)):
    db.connect()
    response = db.select("Workers")
    db.close()
    return response


@router.get("/{id_worker}", status_code=200)
async def getWorker(id_worker: int, block: __BLOCK):
    db.connect()
    response = db.select("Workers", {"id": id_worker})
    db.close()
    return response


@router.post("/", status_code=201)
async def createWorker(data: worker_model.WorkerModel().Create, block: __BLOCK):
    body = jsonable_encoder(data)
    db.connect()
    response = db.create("Workers", body)
    db.close()
    return response


@router.patch("/", status_code=200)
async def updateWorker(data: worker_model.WorkerModel().Update, block: __BLOCK):
    body = jsonable_encoder(data)
    for key, value in dict(body).items():
        if value is None:
            del body[key]
    db.connect()
    response = db.update("Workers", {"id": body["id"]}, body)
    db.close()
    return response


@router.delete("/", status_code=204)
async def deleteWorker(data: worker_model.WorkerModel().Delete, block: __BLOCK):
    body = jsonable_encoder(data)
    db.connect()
    response = db.delete("Workers", body)
    db.close()
    return response

