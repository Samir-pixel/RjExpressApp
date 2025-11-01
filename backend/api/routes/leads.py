from datetime import datetime
from fastapi import APIRouter
from api.models.lead import Lead
from api.services.notify import forward_lead_to_channels

router = APIRouter(prefix="/leads", tags=["leads"])


@router.post("/", summary="Create a lead")
async def create_lead(lead: Lead):
    lead_data = lead.model_dump()
    lead_data["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    status = forward_lead_to_channels(lead_data)
    return {"ok": True, "status": status}
