from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder

from database import database
from table_model import category_model

app = FastAPI()

url = "sqlite:///./database/warehouseManagment.db"
db = database.Database()


@app.get("/category", status_code=200)
async def getCategory():
    db.connect(url)
    response = db.select("Category")
    db.close()
    return response


@app.get("/category{id_category}", status_code=200)
async def getCategory(id_category: int):
    db.connect(url)
    response = db.select("Category", {"id": id_category})
    db.close()
    return response


@app.post("/category", status_code=201)
async def createCategory(data: category_model.CategoryModel().Create):
    body = jsonable_encoder(data)
    db.connect(url)
    response = db.create("Category", body)
    db.close()
    return response


@app.patch("/category", status_code=200)
async def updateCategory(data: category_model.CategoryModel().Update):
    body = jsonable_encoder(data)
    for key, value in dict(body).items():
        if value is None:
            del body[key]
    db.connect(url)
    response = db.update("Category", {"id": body["id"]}, body)
    db.close()
    return response


@app.delete("/category", status_code=204)
async def deleteCategory(data: category_model.CategoryModel().Delete):
    body = jsonable_encoder(data)
    db.connect(url)
    response = db.delete("Category", body)
    db.close()
    return response



