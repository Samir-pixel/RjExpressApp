from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="RJ Express API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Lead(BaseModel):
    name: str
    phone: str
    message: str | None = None


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/lead")
async def create_lead(lead: Lead):
    # Integration with WhatsApp/Telegram can be added here
    return {"ok": True, "lead": lead.model_dump()}


