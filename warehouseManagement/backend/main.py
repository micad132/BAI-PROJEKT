from fastapi import Depends, FastAPI, HTTPException, status, Header
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from table_model import token_model
from authorization import auth
from routers import category, product,login, worker

app = FastAPI()
origins = [
    "http://localhost.com",
    "https://localhost.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'PATCH', 'DELETE'],
    allow_headers="*"
)

app.include_router(category.router)
app.include_router(product.router)
app.include_router(login.router)
app.include_router(worker.router)


#AUTORYZACJA
@app.post("/token", response_model= token_model.TokenModel, status_code=200)
async def loginForAccessToken(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = auth.authenticateUser(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=1)
    refresh_token_expires = timedelta(days=30)
    access_token = auth.createAccessToken(data={"sub": user["login"]}, expires_delta=access_token_expires)
    refresh_token = auth.createRefreshToken(data={"sub": user["login"]}, expires_delta=refresh_token_expires)
    return token_model.TokenModel(
        access_token=access_token,
        token_type="bearer",
        refresh_token=refresh_token
    )

@app.post("/token-unsafe", response_model= token_model.TokenModel, status_code=200)
async def loginForUnsafeAccessToken(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = auth.authenticateUser(form_data.username, form_data.password, safe=False)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=1)
    refresh_token_expires = timedelta(days=30)
    access_token = auth.createAccessToken(data={"sub": user["login"]}, expires_delta=access_token_expires)
    refresh_token = auth.createRefreshToken(data={"sub": user["login"]}, expires_delta=refresh_token_expires)
    return token_model.TokenModel(
        access_token=access_token,
        token_type="bearer",
        refresh_token=refresh_token
    )


@app.post("/refresh")
def refresh_token(Authorization: str = Header()):
    print(Authorization)
    if not Authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header",
            headers={"WWW-Authenticate": "Bearer"},
        )
    refresh_token = Authorization.split("Bearer ")[1].strip()
    new_access_token = auth.refreshAccessToken(refresh_token)
    return{"access_token": new_access_token, "token_type": "bearer"}


