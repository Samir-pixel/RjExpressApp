import { NextRequest, NextResponse } from "next/server";

// Get backend URL from environment variables
// In production (Vercel), this should be set to Railway URL
// In development, defaults to localhost
const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate BACKEND_URL is set
    if (!BACKEND_URL || BACKEND_URL === "http://localhost:8000") {
      console.error("❌ BACKEND_URL not configured! Current value:", BACKEND_URL);
      return NextResponse.json(
        { 
          ok: false, 
          error: "Backend server not configured. Please set BACKEND_URL environment variable in Vercel settings." 
        },
        { status: 503 }
      );
    }
    
    const apiUrl = `${BACKEND_URL}/lead`;
    console.log("📤 Sending request to backend:", apiUrl);
    
    const response = await fetch(apiUrl, {
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
      
      // More specific error messages
      if (response.status === 404) {
        return NextResponse.json(
          { 
            ok: false, 
            error: `Backend endpoint not found (404). Please check that BACKEND_URL is correct: ${BACKEND_URL}. The endpoint should be: ${BACKEND_URL}/lead` 
          },
          { status: 404 }
        );
      }
      
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

