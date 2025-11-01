import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log("📤 Sending request to backend:", BACKEND_URL);
    
    const response = await fetch(`${BACKEND_URL}/lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000), // 10 seconds
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Backend error:", response.status, errorText);
      return NextResponse.json(
        { 
          ok: false, 
          error: `Backend error: ${response.status}. ${errorText || "Unknown error"}` 
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("✅ Backend response:", data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ Error forwarding request to backend:", error);
    
    // More specific error messages
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      return NextResponse.json(
        { ok: false, error: "Backend server timeout. Make sure backend is running on port 8000." },
        { status: 504 }
      );
    }
    
    if (error.code === 'ECONNREFUSED' || error.message?.includes('fetch failed')) {
      return NextResponse.json(
        { ok: false, error: "Cannot connect to backend server. Make sure it's running on http://localhost:8000" },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { ok: false, error: `Internal server error: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}

