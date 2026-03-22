import { useState } from "react"
import { motion } from "framer-motion"
import vinylImg from "../../assets/vinyl.png"

function VinylPlayer({ spotifyUrl, songName, artistName, isExpanded, onExpand, onCollapse }) {


  if (isExpanded) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#0a0a1f",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {/* Close button */}
        <button
          onClick={onCollapse}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.8)",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(255,255,255,0.2)"
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgba(255,255,255,0.1)"
          }}
        >
          Close
        </button>

        {/* Large vinyl disc */}
        <motion.img
          src={vinylImg}
          alt="Vinyl disc"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, ease: "linear", repeat: Infinity }}
          style={{
            width: "300px",
            height: "300px",
            marginBottom: "30px",
            filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.4))",
          }}
        />

        {/* Song info */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              margin: "0 0 8px 0",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            {songName}
          </h2>
          <p
            style={{
              fontSize: "18px",
              margin: 0,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {artistName}
          </p>
        </div>

        {/* Spotify embed */}
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "152px",
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <iframe
            src={spotifyUrl.replace('open.spotify.com/track/', 'open.spotify.com/embed/track/')}
            width="100%"
            height="152"
            frameBorder="0"
            allowTransparency="true"
            allow="encrypted-media"
            style={{
              border: "none",
            }}
          />
        </div>
      </div>
    )
  }

  // Collapsed state - small card
  return (
    <div
      style={{
        backgroundColor: "#0a0a1f",
        padding: "20px",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.1)",
        cursor: "pointer",
        transition: "all 0.3s",
        textAlign: "center",
        maxWidth: "200px",
      }}
      onClick={onExpand}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)"
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      {/* Small rotating vinyl disc */}
      <motion.img
          src={vinylImg}
          alt="Vinyl disc"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, ease: "linear", repeat: Infinity }}
        style={{
          width: "120px",
          height: "120px",
          marginBottom: "12px",
          filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.3))",
        }}
      />

      {/* Song info */}
      <div
        style={{
          color: "rgba(255,255,255,0.9)",
        }}
      >
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "600",
            margin: "0 0 4px 0",
            color: "rgba(255,255,255,0.95)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {songName}
        </h3>
        <p
          style={{
            fontSize: "12px",
            margin: 0,
            color: "rgba(255,255,255,0.6)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {artistName}
        </p>
      </div>
    </div>
  )
}

export default VinylPlayer