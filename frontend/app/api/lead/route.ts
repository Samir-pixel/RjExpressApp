import { NextRequest, NextResponse } from "next/server";

// Get backend URL from environment variables
// In production (Vercel), this should be set to Railway URL
// In development, defaults to localhost
const BACKEND_URL_RAW = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// Normalize URL: ensure it has a protocol (https:// or http://)
function normalizeBackendUrl(url: string): string {
  if (!url) return url;
  
  // Remove trailing slashes
  url = url.trim().replace(/\/+$/, '');
  
  // If URL doesn't start with http:// or https://, add https://
  if (!url.match(/^https?:\/\//i)) {
    // For localhost, use http://, otherwise use https://
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
      url = `http://${url}`;
    } else {
      url = `https://${url}`;
    }
  }
  
  return url;
}

const BACKEND_URL = normalizeBackendUrl(BACKEND_URL_RAW);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate BACKEND_URL is set
    if (!BACKEND_URL || BACKEND_URL === "http://localhost:8000") {
      console.error("❌ BACKEND_URL not configured! Current value:", BACKEND_URL_RAW, "Normalized:", BACKEND_URL);
      return NextResponse.json(
        { 
          ok: false, 
          error: "Backend server not configured. Please set BACKEND_URL environment variable in Vercel settings." 
        },
        { status: 503 }
      );
    }
    
    // Ensure URL is valid
    try {
      new URL(BACKEND_URL);
    } catch (urlError) {
      console.error("❌ Invalid BACKEND_URL format:", BACKEND_URL_RAW, "Normalized:", BACKEND_URL);
      return NextResponse.json(
        { 
          ok: false, 
          error: `Invalid BACKEND_URL format. Please check your Vercel environment variables. Current value: ${BACKEND_URL_RAW}` 
        },
        { status: 500 }
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
    
    // Check for URL parsing errors
    if (error.message?.includes('Failed to parse URL') || error.message?.includes('Invalid URL')) {
      console.error("❌ URL parsing error. BACKEND_URL_RAW:", BACKEND_URL_RAW, "BACKEND_URL:", BACKEND_URL);
      return NextResponse.json(
        { 
          ok: false, 
          error: `Invalid backend URL format. Please set BACKEND_URL in Vercel with full URL including https://. Current value: ${BACKEND_URL_RAW}` 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { ok: false, error: `Internal server error: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}

