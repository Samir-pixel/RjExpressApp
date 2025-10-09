from fastapi import APIRouter
from api.models.lead import Lead
from api.services.notify import forward_lead_to_channels

router = APIRouter(prefix="/leads", tags=["leads"])


@router.post("/", summary="Create a lead")
async def create_lead(lead: Lead):
    status = forward_lead_to_channels(lead.model_dump())
    return {"ok": True, "status": status}
