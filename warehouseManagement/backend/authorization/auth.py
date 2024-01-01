from datetime import datetime, timedelta
from typing import Annotated
from table_model.login_model import LoginModel
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from database import database
from passlib.hash import argon2
import hashlib
import config

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


__DATABASE = database.Database(url="sqlite:///./database/warehouseManagment.db")

__CONFIG = config.load_yml("config.yml")


def __verifyPassword(id_user, password: str):
    __DATABASE.connect()
    response = __DATABASE.select("Login", {"id": id_user})
    __DATABASE.close()
    to_verify = (f"$argon2{__CONFIG['AUTH']['TYPE']}$v=19$m={__CONFIG['AUTH']['MEM']},t={__CONFIG['AUTH']['TIME_COST']},"
                 f"p={__CONFIG['AUTH']['PARAL']}${response[0]['salt']}${response[0]['password']}")
    return (argon2.using(
        type=__CONFIG['AUTH']['TYPE'], salt_len = __CONFIG['AUTH']['SALT_LEN'], time_cost = __CONFIG['AUTH']['TIME_COST'],
                   memory_cost = __CONFIG['AUTH']['MEM'], parallelism=__CONFIG['AUTH']['PARAL'])
            .verify(hashlib.sha512(password.encode('UTF-8')).hexdigest(), to_verify))


def createHash(password: str):
    hash = (argon2.using(type=__CONFIG['AUTH']['TYPE'], salt_len=__CONFIG['AUTH']['SALT_LEN'],
                         time_cost=__CONFIG['AUTH']['TIME_COST'],
                         memory_cost=__CONFIG['AUTH']['MEM'], parallelism=__CONFIG['AUTH']['PARAL'])
            .hash(hashlib.sha512(password.encode('UTF-8')).hexdigest())).split('$')
    return hash[4], hash[5]



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
    encoded_jwt = jwt.encode(encode,  __CONFIG['AUTH']['SECRET_KEY'], algorithm= __CONFIG['AUTH']['ALGORITHM'])
    return encoded_jwt

def authenticateUser(username: str, password: str):
    user =  __getUser(username)
    if not user:
        return False
    if not __verifyPassword(user[0]["id"], password):
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
        payload = jwt.decode(token,  __CONFIG['AUTH']['SECRET_KEY'], algorithms=[ __CONFIG['AUTH']['ALGORITHM']])
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