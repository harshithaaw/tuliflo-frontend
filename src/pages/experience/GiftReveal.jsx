import { useState } from "react"
import NoteCard from "./NoteCard"
import VinylPlayer from "./VinylPlayer"
import lilyImg from "../../assets/lily.png"
import plantImg from "../../assets/plant.png"
import tulifloLogo from "../../assets/tuliflo-logo.png"

function GiftReveal({ giftData }) {
  const [activeCard, setActiveCard] = useState(null)

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #FAF7F0 0%, #F5E6D3 50%, #F0E5D8 100%)", // Aesthetic cream white gradient
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        position: "relative",
      }}
    >
      {/* Tuliflo Logo Section */}
      <div style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center"
      }}>
        <img 
          src={tulifloLogo}
          alt="Tuliflo Logo"
          style={{
            height: "100px",
            objectFit: "contain",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
          }}
        />
      </div>

      {/* Left: Note Card */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <NoteCard
          message={giftData.message}
          isExpanded={activeCard === "note"}
          onExpand={() => setActiveCard("note")}
          onCollapse={() => setActiveCard(null)}
        />
      </div>

      {/* Center: Flower Plant */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
       <div
          onClick={() => setActiveCard("plant")}
          style={{
            cursor: "pointer",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <img
            src={lilyImg}
            alt={`${giftData.flowerType || "Lily"} flower`}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "contain",
              filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.3))",
            }}
          />
        </div>

        {/* Expanded plant view */}
        {activeCard === "plant" && (
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
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveCard(null)}
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
              }}
            >
              Close
            </button>

            {/* Large plant image */}
            <img
              src={plantImg}
              alt="Full grown lily plant"
              style={{
                maxWidth: "80%",
                maxHeight: "80%",
                objectFit: "contain",
                filter: "drop-shadow(0 16px 64px rgba(0,0,0,0.5))",
              }}
            />
          </div>
        )}
      </div>

      {/* Right: Vinyl Player */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <VinylPlayer
          spotifyUrl={giftData.spotifyUrl}
          songName={giftData.songName}
          artistName={giftData.artistName}
          isExpanded={activeCard === "vinyl"}
          onExpand={() => setActiveCard("vinyl")}
          onCollapse={() => setActiveCard(null)}
        />
      </div>
    </div>
  )
}

export default GiftReveal