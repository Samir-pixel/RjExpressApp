import os
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from api.models.lead import Lead
from api.routes.leads import router as leads_router
from api.services.notify import forward_lead_to_channels

load_dotenv()

app = FastAPI(title="RJ Express API")

# CORS configuration - production ready
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "*"  # Default to * for development, should be set in production
).split(",")

# In production, set ALLOWED_ORIGINS in .env like:
# ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "RJ Express API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "create_lead": "/lead (POST)",
            "leads": "/leads/ (POST)"
        },
        "docs": "/docs"
    }


@app.post("/lead")
async def create_lead(lead: Lead):
    """Create a lead and send notification to Telegram."""
    lead_data = lead.model_dump()
    lead_data["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    status = forward_lead_to_channels(lead_data)
    return {"ok": True, "status": status}


app.include_router(leads_router)
