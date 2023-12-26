
from database import database

def get_db():
    db = database.Database(url="sqlite:///./database/warehouseManagment.db")
    try:
        yield db
    finally:
        db.close()