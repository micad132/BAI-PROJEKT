from datetime import datetime, timedelta
from typing import Annotated
from table_model.login_model import LoginModel
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from database import database
from passlib.hash import argon2
import hashlib

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

__SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
__ALGORITHM = "HS256"
__DATABASE = database.Database(url="sqlite:///./database/warehouseManagment.db")

__TYPE = "id"
__SALT_LEN = 16
__TIME_COST = 4
__MEM = 19456
__PARAL = 1

def __verifyPassword(id_user, password: str):


    __DATABASE.connect()
    response = __DATABASE.select("Login", {"id": id_user})
    __DATABASE.close()
    to_verify = f"$argon2{__TYPE}$v=19$m={__MEM},t={__TIME_COST},p={__PARAL}${response[0]['salt']}${response[0]['password']}"
    return (argon2.using(
        type=__TYPE, salt_len = __SALT_LEN, time_cost = __TIME_COST,
                   memory_cost = __MEM, parallelism=__PARAL)
            .verify(hashlib.sha512(password.encode('UTF-8')).hexdigest(), to_verify))

def __getUser(username: str):
    __DATABASE.connect()
    response = __DATABASE.select("Login", {"login": username})
    __DATABASE.close()
    if response:
        return response


def createAccessToken(data: dict, expires_delta: timedelta | None = None):
    encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    encode.update({"exp": expire})
    encoded_jwt = jwt.encode(encode,  __SECRET_KEY, algorithm= __ALGORITHM)
    return encoded_jwt

def authenticateUser(username: str, password: str):
    user =  __getUser(username)
    if not user:
        return False
    if not  __verifyPassword(user[0]["id"], password):
        return False
    return user[0]

async def getCurrentUser(token: Annotated[str, Depends(oauth2_scheme )]):
    data = {}
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token,  __SECRET_KEY, algorithms=[ __ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        data["username"] = username
    except JWTError:
        raise credentials_exception
    user =  __getUser(username=data["username"])
    if user is None:
        raise credentials_exception
    return user

async def getCurrentActiveUser(current_user: Annotated[LoginModel.Table, Depends(getCurrentUser)]):
    return current_user