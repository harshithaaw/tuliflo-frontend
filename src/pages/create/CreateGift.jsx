import { useState } from "react"
import { giftAPI } from "../../services/api"
import lilyImg from "../../assets/lily.png"

function CreateGift() {
  const [message, setMessage] = useState("")
  const [spotifyUrl, setSpotifyUrl] = useState("")
  const [songName, setSongName] = useState("")
  const [artistName, setArtistName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [shareableLink, setShareableLink] = useState("")

  const validateSpotifyUrl = (url) => {
    return url.startsWith("https://open.spotify.com/track/")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Validate all fields are filled
    if (!message.trim() || !spotifyUrl.trim() || !songName.trim() || !artistName.trim()) {
      setError("Please fill in all fields")
      return
    }

    // Validate Spotify URL format
    if (!validateSpotifyUrl(spotifyUrl)) {
      setError("Invalid Spotify URL. Must start with https://open.spotify.com/track/")
      return
    }

    try {
      setLoading(true)
      const userId = localStorage.getItem("userId")
      if (!userId) {
        setError("User not found. Please log in again.")
        return
      }

      const response = await giftAPI.createGift(userId, {
        message,
        spotifyUrl,
        songName,
        artistName,
        flowerType: "lily"
      })

      setSuccess(true)
      setShareableLink(response.data.shareableLink)
    } catch (err) {
      setError("Failed to create gift. Please try again.")
      console.error("Error creating gift:", err)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setMessage("")
    setSpotifyUrl("")
    setSongName("")
    setArtistName("")
    setError("")
    setSuccess(false)
    setShareableLink("")
  }

  const copyToClipboard = async () => {
    try {
      const fullUrl = `https://tuliflo-frontend.vercel.app/gift/${shareableLink}`;  // ✅ Build full URL
      await navigator.clipboard.writeText(fullUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (success) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0a0a1f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontFamily: "'Caveat', cursive",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            padding: "40px",
            borderRadius: "16px",
            textAlign: "center",
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <h2
            style={{
              color: "#4ecdc4",
              fontSize: "32px",
              marginBottom: "20px",
            }}
          >
            🌸 Gift Created Successfully! 🌸
          </h2>
          <p
            style={{
              color: "white",
              fontSize: "18px",
              marginBottom: "20px",
              lineHeight: "1.5",
            }}
          >
            Your digital gift has been created and is ready to share!
          </p>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
              wordBreak: "break-all",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "14px",
                margin: "0 0 10px 0",
              }}
            >
              Shareable Link:
            </p>
            <p style={{ color: "#4ecdc4", fontSize: "16px", margin: 0, fontWeight: "600" }}>https://tuliflo-frontend.vercel.app/gift/{shareableLink}</p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
            }}
          >
            <button
              onClick={copyToClipboard}
              style={{
                backgroundColor: "#4ecdc4",
                border: "none",
                color: "#0a0a1f",
                padding: "12px 24px",
                borderRadius: "25px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 4px 16px rgba(78,205,196,0.3)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "none"
              }}
            >
              Copy Link
            </button>
            <button
              onClick={resetForm}
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "2px solid rgba(255,255,255,0.2)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "25px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(255,255,255,0.2)"
                e.target.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(255,255,255,0.1)"
                e.target.style.transform = "translateY(0)"
              }}
            >
              Create Another
            </button>
            <button
            onClick={() => window.open(`/gift/${shareableLink}`, '_blank')}
            style={{
              backgroundColor: "rgba(76,175,80,0.2)",
              border: "2px solid rgba(76,175,80,0.4)",
              color: "#4CAF50",
              padding: "12px 24px",
              borderRadius: "25px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(76,175,80,0.3)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgba(76,175,80,0.2)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Preview Gift
          </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a1f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "'Caveat', cursive",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "36px",
            textAlign: "center",
            marginBottom: "30px",
            fontWeight: "600",
          }}
        >
          Create Your Digital Gift
        </h1>

        {/* Error Message */}
        {error && (
          <div
            style={{
              backgroundColor: "rgba(255,107,107,0.2)",
              border: "1px solid rgba(255,107,107,0.4)",
              color: "#ff6b6b",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Message Textarea */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              color: "white",
              fontSize: "18px",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Your Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your heartfelt message..."
            style={{
              width: "100%",
              minHeight: "120px",
              padding: "12px",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              color: "white",
              fontSize: "16px",
              fontFamily: "'Caveat', cursive",
              resize: "vertical",
            }}
          />
        </div>

        {/* Spotify URL Input */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              color: "white",
              fontSize: "18px",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Spotify URL
          </label>
          <input
            type="url"
            value={spotifyUrl}
            onChange={(e) => setSpotifyUrl(e.target.value)}
            placeholder="https://open.spotify.com/track/..."
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              color: "white",
              fontSize: "16px",
            }}
          />
        </div>

        {/* Song Name Input */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              color: "white",
              fontSize: "18px",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Song Name
          </label>
          <input
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              color: "white",
              fontSize: "16px",
            }}
          />
        </div>

        {/* Artist Name Input */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              color: "white",
              fontSize: "18px",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Artist Name
          </label>
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              color: "white",
              fontSize: "16px",
            }}
          />
        </div>

        {/* Flower Preview */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            padding: "20px",
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: "8px",
          }}
        >
          <img
            src={lilyImg}
            alt="Lily flower"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />
          <p
            style={{
              color: "white",
              fontSize: "18px",
              margin: 0,
            }}
          >
            Lily
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: loading ? "rgba(78,205,196,0.5)" : "#4ecdc4",
            border: "none",
            color: "#0a0a1f",
            padding: "15px",
            borderRadius: "25px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.transform = "translateY(-2px)"
              e.target.style.boxShadow = "0 4px 16px rgba(78,205,196,0.3)"
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)"
            e.target.style.boxShadow = "none"
          }}
        >
          {loading ? "Creating Gift..." : "Create Gift"}
        </button>
      </form>
    </div>
  )
}

export default CreateGift

/*
CONCEPTS AND FLOW EXPLANATION FOR BEGINNERS:

1. STATE MANAGEMENT:
   - useState hooks manage form data (message, spotifyUrl, songName, artistName)
   - Additional states for loading, error, success, and shareableLink
   - State updates trigger re-renders automatically

2. FORM VALIDATION:
   - validateSpotifyUrl() checks URL format using startsWith()
   - handleSubmit() validates all fields before API call
   - Error messages displayed conditionally based on error state

3. API INTEGRATION:
   - giftAPI.createGift() sends data to backend
   - Async/await handles asynchronous operations
   - Try/catch blocks handle success and error scenarios

4. CONDITIONAL RENDERING:
   - Success state shows different UI than form
   - Loading state disables button and shows loading text
   - Error state displays error messages

5. USER EXPERIENCE:
   - Form stays on page after creation (no redirect)
   - Shareable link displayed with copy functionality
   - "Create Another" button resets form for new gifts

6. STYLING APPROACH:
   - Inline styles for simplicity and consistency
   - Dark theme with semi-transparent elements
   - Hover effects and transitions for interactivity
   - Responsive design with max-width and padding

FLOW:
1. User fills form fields
2. Clicks "Create Gift" button
3. Form validation runs
4. API call sends data to backend
5. On success: show success screen with shareable link
6. User can copy link or create another gift
7. On error: show error message, user can retry
*/
