import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import vinylImg from "../../assets/vinyl.png"

const getYouTubeId = (url) => {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
  return match ? match[1] : null
}

function VinylPlayer({ spotifyUrl, songName, artistName }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const iframeRef = useRef(null)

  const youtubeId = getYouTubeId(spotifyUrl || "")
  const isYoutube = !!youtubeId

  // ── Cleanup Cloudinary audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // ── DEBUG: Listen for YouTube's messages back ─────────── PROBE ③
  useEffect(() => {
    const handler = (e) => {
      if (typeof e.data === "string" && e.data.includes("youtube")) {
        try { console.log("📨 YT msg:", JSON.parse(e.data)) }
        catch { console.log("📨 YT raw:", e.data) }
      }
    }
    window.addEventListener("message", handler)
    return () => window.removeEventListener("message", handler)
  }, [])

  // ── postMessage to YouTube iframe
  const sendYoutubeCommand = (func) => {
    if (!iframeRef.current) {
      console.log("❌ iframe ref is null")
      return
    }
    console.log("📤 Sending command:", func, "to iframe:", iframeRef.current.src) // PROBE ①
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*"
    )
  }

  const handleCloudinaryClick = () => {
    if (!spotifyUrl) return
    if (!audioRef.current) {
      audioRef.current = new Audio(spotifyUrl)
      audioRef.current.loop = true
      audioRef.current.onended = () => setIsPlaying(false)
      audioRef.current.onerror = () => {
        setIsPlaying(false)
        audioRef.current = null
      }
    }
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false))
      setIsPlaying(true)
    }
  }

  const handleYoutubeClick = () => {
    if (isPlaying) {
      sendYoutubeCommand("pauseVideo")
      setIsPlaying(false)
    } else {
      sendYoutubeCommand("playVideo")
      setIsPlaying(true)
    }
  }

  const handleClick = () => {
    if (!spotifyUrl) return
    if (isYoutube) handleYoutubeClick()
    else handleCloudinaryClick()
  }

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none",
        position: "relative",
      }}>
        <motion.img
          src={vinylImg}
          alt="Vinyl disc"
          onClick={handleClick}
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={
            isPlaying
              ? { duration: 3, ease: "linear", repeat: Infinity }
              : { duration: 0.5, ease: "easeOut" }
          }
          style={{
            width: "300px",
            height: "340px",
            filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.15))",
            display: "block",
            cursor: spotifyUrl ? "pointer" : "default",
          }}
        />

        <h3 style={{
          fontSize: "24px", fontWeight: "600", margin: "16px 0 4px 0",
          color: "#bd7880", fontFamily: "'Caveat', cursive",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          maxWidth: "280px", textAlign: "center",
        }}>
          {songName || "Unknown Song"}
        </h3>

        <p style={{
          fontSize: "20px", margin: "0 0 20px 0",
          color: "rgb(189, 120, 128)", fontFamily: "'Caveat', cursive",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          maxWidth: "280px", textAlign: "center",
        }}>
          {artistName || "Unknown Artist"}
        </p>

        {spotifyUrl && (
          <button
            onClick={handleClick}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "40px", color: "#102b1f", fontFamily: "'Caveat', cursive",
              padding: "4px 16px", transition: "color 0.2s, transform 0.2s", lineHeight: 1,
            }}
            onMouseEnter={(e) => { e.target.style.color = "#0a1a14"; e.target.style.transform = "scale(1.15)" }}
            onMouseLeave={(e) => { e.target.style.color = "#102b1f"; e.target.style.transform = "scale(1)" }}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
        )}

        {/* Status text */}
        {spotifyUrl && (
          <p style={{
            fontSize: "14px",
            color: "rgb(93, 23, 31)", // Light cream color for visibility
            margin: "8px 0 0 0",
            textAlign: "center",
            fontFamily: "'Caveat', cursive",
            textShadow: "0 1px 2px rgba(253, 124, 124, 0.3)",
          }}>
            {!spotifyUrl
              ? "No song linked"
              : isPlaying ? "Playing now..." : "Tap to play"}
          </p>
        )}
      </div>

      {isYoutube && youtubeId && (
        <iframe
          ref={iframeRef}
          onLoad={() => console.log("✅ YouTube iframe loaded:", iframeRef.current?.src)} // PROBE ②
          src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&autoplay=0&controls=0`}
          style={{
            position: "fixed", top: "-9999px", left: "-9999px",
            width: "1px", height: "1px", opacity: 0, pointerEvents: "none",
          }}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          title="Background YouTube audio"
        />
      )}
    </>
  )
}

export default VinylPlayer