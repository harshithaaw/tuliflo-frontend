import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import vinylImg from "../../assets/vinyl.png"

// ── Detect URL type ───────────────────────────────────────────────────────────
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
  const isCloudinary = !isYoutube && !!spotifyUrl

  // ── Cleanup Cloudinary audio on unmount ───────────────────────────────────
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // ── Send command to YouTube iframe via postMessage ────────────────────────
  // enablejsapi=1 on the iframe src allows these commands to work
  const sendYoutubeCommand = (func) => {
    if (!iframeRef.current) return
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*"
    )
  }

  // ── Cloudinary click handler ──────────────────────────────────────────────
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
      audioRef.current.pause()   // pause() keeps position — resume works ✅
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false))
      setIsPlaying(true)
    }
  }

  // ── YouTube click handler ─────────────────────────────────────────────────
  const handleYoutubeClick = () => {
    if (isPlaying) {
      sendYoutubeCommand("pauseVideo")  // pause at current position ✅
      setIsPlaying(false)
    } else {
      sendYoutubeCommand("playVideo")   // resume from same position ✅
      setIsPlaying(true)
    }
  }

  const handleClick = () => {
    if (isYoutube) handleYoutubeClick()
    else handleCloudinaryClick()
  }

  return (
    <>
      {/* ── Vinyl Card ───────────────────────────────────────────────────── */}
      <div
        onClick={handleClick}
        style={{
          cursor: spotifyUrl ? "pointer" : "default",
          transition: "all 0.3s",
          textAlign: "center",
          width: "250px",
          userSelect: "none",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)"
        }}
      >
        <motion.img
          src={vinylImg}
          alt="Vinyl disc"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={
            isPlaying
              ? { duration: 3, ease: "linear", repeat: Infinity }
              : { duration: 0.5, ease: "easeOut" }
          }
          style={{
            width: "300px",
            height: "340px",
            filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))",
            display: "block",
            margin: "0 auto 34px auto",
          }}
        />

        {/* Text and YouTube button container */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          marginLeft: "14px",
          marginBottom: "4px",
          marginTop: "10px"
        }}>
          <h3 style={{
            fontSize: "24px", fontWeight: "600", margin: 0,
            color: "rgb(246, 156, 166)", whiteSpace: "nowrap",
            overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {songName || "Unknown Song"}
          </h3>
          <p style={{
            fontSize: "24px", margin: 0,
            color: "rgb(246, 156, 166)", whiteSpace: "nowrap",
            overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {artistName || "Unknown Artist"}
          </p>

          {/* YouTube button */}
          {isYoutube && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: "rgba(255,0,0,0.15)",
              border: "1px solid rgba(255,80,80,0.3)",
              borderRadius: "6px", padding: "4px 8px",
              minWidth: "32px", height: "24px",
            }}>
              <span style={{ color: "#ff4444", fontSize: "16px" }}>
                {isPlaying ? "⏸" : "▶"}
              </span>
            </div>
          )}
        </div>

        <p style={{
          fontSize: "11px",
          color: isPlaying ? "rgba(100,220,150,0.9)" : "rgba(255,255,255,0.3)",
          margin: 0, transition: "color 0.3s",
        }}>
          {!spotifyUrl
            ? "No song linked"
            : isPlaying ? "▶ Playing — tap to stop" : "Tap to play"}
        </p>
      </div>

      {/* ── YouTube iframe — ALWAYS in DOM, never destroyed ──────────────────
           Key decisions:
           - autoplay=0   → we control play/pause via postMessage, not on load
           - enablejsapi=1 → required for postMessage commands to work
           - Positioned way off-screen (not display:none) so iframe stays active
           - Never unmounted = song position is preserved on pause/resume       */}
      {isYoutube && youtubeId && (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&autoplay=0&controls=0`}
          style={{
            position: "fixed",
            top: "-9999px",
            left: "-9999px",
            width: "1px",
            height: "1px",
            opacity: 0,
            pointerEvents: "none",
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
