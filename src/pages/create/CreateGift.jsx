import { useState, useRef } from "react"
import { giftAPI } from "../../services/api"
import lilyImg from "../../assets/lily.png"

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

// ── YouTube URL validator ─────────────────────────────────────────────────────
const getYouTubeId = (url) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
  return match ? match[1] : null
}

function CreateGift() {
  const [message, setMessage] = useState("")
  const [songName, setSongName] = useState("")
  const [artistName, setArtistName] = useState("")
  const [musicMode, setMusicMode] = useState("upload") // "upload" | "youtube"

  // Upload states
  const [mp3File, setMp3File] = useState(null)
  const [mp3FileName, setMp3FileName] = useState("")

  // YouTube states
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [youtubeError, setYoutubeError] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [shareableLink, setShareableLink] = useState("")

  const fileInputRef = useRef(null)

  // ── Cloudinary Upload ─────────────────────────────────────────────────────
  const uploadToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", UPLOAD_PRESET)
    formData.append("resource_type", "video")

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
      { method: "POST", body: formData }
    )
    const data = await res.json()
    if (data.secure_url) return data.secure_url
    throw new Error("Cloudinary upload failed")
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.includes("audio")) {
      setError("Please upload a valid audio file (MP3, WAV, etc.)")
      return
    }
    setMp3File(file)
    setMp3FileName(file.name)
    setError("")
  }

  const handleYoutubeChange = (e) => {
    const val = e.target.value
    setYoutubeUrl(val)
    if (val && !getYouTubeId(val)) {
      setYoutubeError("Please enter a valid YouTube URL")
    } else {
      setYoutubeError("")
    }
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!message.trim()) { setError("Please write a message"); return }
    if (!songName.trim() || !artistName.trim()) { setError("Please fill in song and artist name"); return }

    if (musicMode === "upload" && !mp3File) { setError("Please upload an MP3 file"); return }
    if (musicMode === "youtube") {
      if (!youtubeUrl.trim()) { setError("Please enter a YouTube URL"); return }
      if (!getYouTubeId(youtubeUrl)) { setError("Please enter a valid YouTube URL"); return }
    }

    try {
      setLoading(true)
      const userId = localStorage.getItem("userId")
      if (!userId) { setError("User not found. Please log in again."); return }

      let audioUrl = ""
      if (musicMode === "upload") {
        audioUrl = await uploadToCloudinary(mp3File)
      } else {
        // Store YouTube URL directly — VinylPlayer detects and embeds it
        audioUrl = youtubeUrl.trim()
      }

      const response = await giftAPI.createGift(userId, {
        message,
        spotifyUrl: audioUrl,
        songName,
        artistName,
        flowerType: "lily",
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

  // ── Reset ─────────────────────────────────────────────────────────────────
  const resetForm = () => {
    setMessage("")
    setSongName("")
    setArtistName("")
    setMusicMode("upload")
    setMp3File(null)
    setMp3FileName("")
    setYoutubeUrl("")
    setYoutubeError("")
    setError("")
    setSuccess(false)
    setShareableLink("")
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`https://tuliflo-frontend.vercel.app/gift/${shareableLink}`)
      alert("Link copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  // ── Success Screen ────────────────────────────────────────────────────────
  if (success) {
    return (
      <div style={{
        minHeight: "100vh", backgroundColor: "#102b1f",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px", fontFamily: "'Caveat', cursive",
      }}>
        <div style={{
          backgroundColor: "#f5f0e8", padding: "40px",
          borderRadius: "16px", textAlign: "center",
          maxWidth: "500px", width: "100%",
        }}>
          <h2 style={{ color: "#4d0011", fontSize: "32px", marginBottom: "20px" }}>
            🌸 Gift Created Successfully! 🌸
          </h2>
          <p style={{ color: "#4d0011", fontSize: "18px", marginBottom: "20px", lineHeight: "1.5" }}>
            Your digital gift has been created and is ready to share!
          </p>
          <div style={{
            backgroundColor: "#ffd9d9", padding: "15px",
            borderRadius: "8px", marginBottom: "20px", wordBreak: "break-all",
          }}>
            <p style={{ color: "#4d0011", fontSize: "14px", margin: "0 0 10px 0" }}>Shareable Link:</p>
            <p style={{ color: "white", fontSize: "16px", margin: 0, fontWeight: "600" }}>
              https://tuliflo-frontend.vercel.app/gift/{shareableLink}
            </p>
          </div>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={copyToClipboard} style={btnStyle("#6b0016", "rgb(245,240,232)")}
              onMouseEnter={hoverIn} onMouseLeave={hoverOut}>Copy Link</button>
            <button onClick={resetForm} style={btnStyle("rgba(255,255,255,0.1)", "#4d0011")}
              onMouseEnter={hoverIn} onMouseLeave={hoverOut}>Create Another</button>
            <button onClick={() => window.open(`/gift/${shareableLink}`, "_blank")} style={{
              backgroundColor: "rgba(76,175,80,0.2)", border: "2px solid rgba(76,175,80,0.4)",
              color: "#4CAF50", padding: "12px 24px", borderRadius: "25px",
              fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "all 0.3s",
              fontFamily: "'Caveat', cursive",
            }} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>Preview Gift</button>
          </div>
        </div>
      </div>
    )
  }

  // ── Main Form ─────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#102b1f",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px", fontFamily: "'Caveat', cursive",
    }}>
      <form onSubmit={handleSubmit} style={{ 
        maxWidth: "500px", 
        width: "100%",
        backgroundColor: "rgba(255, 216, 216, 0.9)",
        padding: "30px",
        borderRadius: "16px",
        border: "1px solid rgba(189, 120, 128, 0.4)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)"
      }}>

        <h1 style={{
          color: "#4d0011", fontSize: "36px", textAlign: "center",
          marginBottom: "30px", fontWeight: "600", textShadow: "0 1px 2px rgba(0,0,0,0.1)",
        }}>
          Create Your Digital Gift
        </h1>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: "rgba(255,107,107,0.2)", border: "1px solid rgba(255,107,107,0.4)",
            color: "#ff6b6b", padding: "12px", borderRadius: "8px",
            marginBottom: "20px", fontSize: "14px",
          }}>
            {error}
          </div>
        )}

        {/* Message */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Your Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your heartfelt message..."
            style={{
              width: "100%", minHeight: "120px", padding: "12px",
              backgroundColor: "#f5f0e8", border: "1px solid #bd7880",
              borderRadius: "8px", color: "#4d0011", fontSize: "16px",
              fontFamily: "'Caveat', cursive", resize: "vertical", boxSizing: "border-box",
            }}
          />
        </div>

        {/* Music Mode Toggle */}
        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Add Music</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="button" onClick={() => setMusicMode("upload")} style={{
              flex: 1, padding: "10px", borderRadius: "10px", fontSize: "15px",
              fontFamily: "'Caveat', cursive", cursor: "pointer", transition: "all 0.3s",
              backgroundColor: musicMode === "upload" ? "rgba(77, 0, 17, 0.1)" : "rgba(77, 0, 17, 0.05)",
              border: musicMode === "upload" ? "2px solid #4d0011" : "2px solid rgba(77, 0, 17, 0.3)",
              color: musicMode === "upload" ? "#4d0011" : "rgba(77, 0, 17, 0.7)",
              fontWeight: musicMode === "upload" ? "700" : "400",
            }}>
              🎵 Upload MP3
            </button>
            <button type="button" onClick={() => setMusicMode("youtube")} style={{
              flex: 1, padding: "10px", borderRadius: "10px", fontSize: "15px",
              fontFamily: "'Caveat', cursive", cursor: "pointer", transition: "all 0.3s",
              backgroundColor: musicMode === "youtube" ? "rgba(255, 68, 68, 0.15)" : "rgba(77, 0, 17, 0.05)",
              border: musicMode === "youtube" ? "2px solid rgba(255, 68, 68, 0.5)" : "2px solid rgba(77, 0, 17, 0.3)",
              color: musicMode === "youtube" ? "#d63638" : "rgba(77, 0, 17, 0.7)",
              fontWeight: musicMode === "youtube" ? "700" : "400",
            }}>
              ▶ YouTube Link
            </button>
          </div>
        </div>

        {/* Upload MP3 */}
        {musicMode === "upload" && (
          <div style={{ marginBottom: "20px" }}>
            <div onClick={() => fileInputRef.current?.click()} style={{
              border: "2px dashed rgba(247,168,184,0.5)", borderRadius: "12px",
              padding: "24px", textAlign: "center", cursor: "pointer",
              backgroundColor: "rgba(247,168,184,0.05)", transition: "all 0.3s",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(247,168,184,0.1)"
                e.currentTarget.style.borderColor = "rgba(247,168,184,0.8)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(247,168,184,0.05)"
                e.currentTarget.style.borderColor = "rgba(247,168,184,0.5)"
              }}>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px", margin: "0 0 6px 0" }}>
                {mp3FileName ? `✅ ${mp3FileName}` : "Click to upload MP3"}
              </p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0 }}>
                MP3, WAV, AAC supported
              </p>
            </div>
            <input ref={fileInputRef} type="file" accept="audio/*"
              onChange={handleFileChange} style={{ display: "none" }} />
          </div>
        )}

        {/* YouTube URL */}
        {musicMode === "youtube" && (
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              value={youtubeUrl}
              onChange={handleYoutubeChange}
              placeholder="https://www.youtube.com/watch?v=..."
              style={{
                ...inputStyle,
                border: youtubeError ? "1px solid #ff6b6b" : "1px solid #bd7880",
              }}
            />
            {youtubeError && (
              <p style={{ color: "#ff6b6b", fontSize: "13px", margin: "6px 0 0 0" }}>
                {youtubeError}
              </p>
            )}
            {youtubeUrl && !youtubeError && (
              <p style={{ color: "rgba(100,220,150,0.9)", fontSize: "13px", margin: "6px 0 0 0" }}>
                ✅ Valid YouTube URL
              </p>
            )}
            <p style={{ color: "rgba(0, 0, 0, 0.3)", fontSize: "13px", margin: "6px 0 0 0" }}>
              Paste any YouTube video link — it will play in the gift
            </p>
          </div>
        )}

        {/* Song Name */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Song Name</label>
          <input type="text" value={songName} onChange={(e) => setSongName(e.target.value)}
            placeholder="e.g. Tum Hi Ho" style={inputStyle} />
        </div>

        {/* Artist Name */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Artist Name</label>
          <input type="text" value={artistName} onChange={(e) => setArtistName(e.target.value)}
            placeholder="e.g. Arijit Singh" style={inputStyle} />
        </div>

        {/* Flower Preview */}
        <div style={{
          textAlign: "center", marginBottom: "30px", padding: "15px",
          backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "8px",
        }}>
          <p style={{ color: "#4d0011", fontSize: "16px", margin: "0 0 10px 0", fontWeight: "500" }}>
            Choose flower you'd like to send
          </p>
          <img src={lilyImg} alt="Lily flower"
            style={{ width: "120px", height: "120px", objectFit: "contain", marginBottom: "8px" }} />
          <p style={{ color: "#4d0011", fontSize: "16px", margin: 0 }}>Lily</p>
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} style={{
          width: "100%",
          backgroundColor: loading ? "rgba(0, 0, 0, 0.7)" : "#000000",
          border: "none", color: "#f5f0e8", padding: "15px",
          borderRadius: "25px", fontSize: "18px", fontWeight: "600",
          cursor: loading ? "not-allowed" : "pointer", transition: "all 0.3s",
        }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.transform = "translateY(-2px)"
              e.target.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.4)"
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)"
            e.target.style.boxShadow = "none"
          }}>
          {loading
            ? musicMode === "upload" ? "Uploading & Creating..." : "Creating Gift..."
            : "Create Gift"}
        </button>

      </form>
    </div>
  )
}

// ── Style helpers ─────────────────────────────────────────────────────────────
const labelStyle = {
  color: "#4d0011", fontSize: "18px",
  marginBottom: "8px", display: "block", fontWeight: "600",
}

const inputStyle = {
  width: "100%", padding: "12px",
  backgroundColor: "rgba(245,240,232,0.95)", border: "2px solid #bd7880",
  borderRadius: "8px", color: "#4d0011",
  fontSize: "16px", boxSizing: "border-box", fontFamily: "'Caveat', cursive",
  transition: "all 0.3s",
}

const btnStyle = (bg, color) => ({
  backgroundColor: bg, border: "none", color,
  padding: "12px 24px", borderRadius: "25px",
  fontSize: "16px", fontWeight: "600", cursor: "pointer",
  transition: "all 0.3s", fontFamily: "'Caveat', cursive",
})

const hoverIn = (e) => {
  e.target.style.transform = "translateY(-2px)"
  e.target.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)"
}
const hoverOut = (e) => {
  e.target.style.transform = "translateY(0)"
  e.target.style.boxShadow = "none"
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
