from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes.leads import router as leads_router

app = FastAPI(title="RJ Express API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok"}


app.include_router(leads_router)
