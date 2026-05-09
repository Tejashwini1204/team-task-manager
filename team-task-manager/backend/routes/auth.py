from fastapi import APIRouter, HTTPException
from database import users_collection
from models.user_model import UserSignup, UserLogin
from utils.auth_utils import hash_password, verify_password, create_access_token

router = APIRouter()

# Signup
@router.post("/signup")
async def signup(user: UserSignup):

    existing_user = await users_collection.find_one({
        "email": user.email
    })

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password),
        "role": user.role
    }

    await users_collection.insert_one(new_user)

    return {
        "message": "User created successfully"
    }


# Login
@router.post("/login")
async def login(user: UserLogin):

    db_user = await users_collection.find_one({
        "email": user.email
    })

    if not db_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid Email"
        )

    if not verify_password(
        user.password,
        db_user["password"]
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid Password"
        )

    token = create_access_token({
        "email": db_user["email"],
        "role": db_user["role"]
    })

    return {
        "access_token": token,
        "role": db_user["role"]
    }