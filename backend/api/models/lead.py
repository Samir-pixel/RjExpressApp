from pydantic import BaseModel, Field


class Lead(BaseModel):
    name: str = Field(min_length=1)
    phone: str = Field(min_length=5)
    experience: str | None = None
    message: str | None = None
