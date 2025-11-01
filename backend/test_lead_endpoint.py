"""
Test script to verify the /lead endpoint works correctly.
"""

import json
import httpx

# Test data matching the form
test_lead = {
    "name": "Test User",
    "phone": "+1234567890",
    "experience": "5 years"
}

print("🧪 Testing /lead endpoint...\n")

try:
    response = httpx.post(
        "http://localhost:8000/lead",
        json=test_lead,
        timeout=10.0
    )
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        data = response.json()
        if data.get("ok"):
            status = data.get("status", {})
            if status.get("telegram"):
                print("\n✅ Success! Telegram notification sent!")
                print("   Check your Telegram to verify the message arrived.")
            else:
                print("\n⚠️  Warning: Telegram notification failed")
                print(f"   Status: {status}")
        else:
            print("\n❌ Request succeeded but response indicates failure")
    else:
        print(f"\n❌ Request failed with status {response.status_code}")
        print(f"Response: {response.text}")
        
except httpx.ConnectError:
    print("❌ Error: Cannot connect to backend server")
    print("   Make sure backend is running on http://localhost:8000")
    print("   Start it with: python -m uvicorn main:app --reload")
except Exception as e:
    print(f"❌ Error: {e}")

