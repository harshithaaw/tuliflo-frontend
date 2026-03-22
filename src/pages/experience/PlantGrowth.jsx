import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import lilyTopImg from "../../assets/lily.png"

function PlantGrowth({ onGrowthComplete }) {
  const [showLeaves, setShowLeaves] = useState(false)
  const [showTopLeaves, setShowTopLeaves] = useState(false)
  const [showFlowers, setShowFlowers] = useState(false)

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#0a0a1f",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Ground */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "160px",
          background: "#1a1a2e",
          borderTop: "3px solid #16213e",
          zIndex: 1
        }}
      />

      {/* MAIN STEM */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "400px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        onAnimationComplete={() => setShowLeaves(true)}
        style={{
          position: "absolute",
          bottom: "160px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "8px",
          background: "#70B77E",
          zIndex: 2,
          borderRadius: "4px"
        }}
      />

      {/* LEAVES (ATTACHED TO STEM) */}
      <AnimatePresence>
        {showLeaves && (
          <>
            {/* Leaf Pair 1 - Bottom (70% up stem) */}
            {/* Left leaf */}
            <motion.div
              initial={{ width: 0, height: 0 }}
              animate={{ width: "120px", height: "25px" }}
              transition={{ duration: 0.6, delay: 0 }}
              style={{
                position: "absolute",
                bottom: "calc(160px + 280px)",
                left: "50%",
                width: "120px",
                height: "25px",
                background: "#70B77E",
                borderRadius: "50%",
                transform: "translateX(-4px) rotate(-25deg)",
                transformOrigin: "left center",
                zIndex: 3
              }}
            >
              <div style={{
                position: "absolute",
                width: "80%",
                height: "1px",
                background: "rgba(0,0,0,0.15)",
                top: "50%",
                left: "10%"
              }} />
            </motion.div>

            {/* Right leaf */}
            <motion.div
              initial={{ width: 0, height: 0 }}
              animate={{ width: "120px", height: "25px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                position: "absolute",
                bottom: "calc(160px + 280px)",
                left: "50%",
                width: "120px",
                height: "25px",
                background: "#70B77E",
                borderRadius: "50%",
                transform: "translateX(-116px) rotate(205deg)",
                transformOrigin: "right center",
                zIndex: 3
              }}
            >
              <div style={{
                position: "absolute",
                width: "80%",
                height: "1px",
                background: "rgba(0,0,0,0.15)",
                top: "50%",
                left: "10%"
              }} />
            </motion.div>

            {/* Leaf Pair 2 - Middle (50% up stem) */}
            <motion.div
              initial={{ width: 0, height: 0 }}
              animate={{ width: "120px", height: "25px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                position: "absolute",
                bottom: "calc(160px + 200px)",
                left: "50%",
                width: "120px",
                height: "25px",
                background: "#70B77E",
                borderRadius: "50%",
                transform: "translateX(-4px) rotate(-25deg)",
                transformOrigin: "left center",
                zIndex: 3
              }}
            >
              <div style={{
                position: "absolute",
                width: "80%",
                height: "1px",
                background: "rgba(0,0,0,0.15)",
                top: "50%",
                left: "10%"
              }} />
            </motion.div>

            <motion.div
              initial={{ width: 0, height: 0 }}
              animate={{ width: "120px", height: "25px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                position: "absolute",
                bottom: "calc(160px + 200px)",
                left: "50%",
                width: "120px",
                height: "25px",
                background: "#70B77E",
                borderRadius: "50%",
                transform: "translateX(-116px) rotate(205deg)",
                transformOrigin: "right center",
                zIndex: 3
              }}
            >
              <div style={{
                position: "absolute",
                width: "80%",
                height: "1px",
                background: "rgba(0,0,0,0.15)",
                top: "50%",
                left: "10%"
              }} />
            </motion.div>

            {/* Leaf Pair 3 - Upper (30% up stem) */}
            <motion.div
              initial={{ width: 0, height: 0 }}
              animate={{ width: "120px", height: "25px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                position: "absolute",
                bottom: "calc(160px + 120px)",
                left: "50%",
                width: "120px",
                height: "25px",
                background: "#70B77E",
                borderRadius: "50%",
                transform: "translateX(-4px) rotate(-25deg)",
                transformOrigin: "left center",
                zIndex: 3
              }}
            >
              <div style={{
                position: "absolute",
                width: "80%",
                height: "1px",
                background: "rgba(0,0,0,0.15)",
                top: "50%",
                left: "10%"
              }} />
            </motion.div>

            <motion.div
              initial={{ width: 0, height: 0 }}
              animate={{ width: "120px", height: "25px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onAnimationComplete={() => setShowTopLeaves(true)}
              style={{
                position: "absolute",
                bottom: "calc(160px + 120px)",
                left: "50%",
                width: "120px",
                height: "25px",
                background: "#70B77E",
                borderRadius: "50%",
                transform: "translateX(-116px) rotate(205deg)",
                transformOrigin: "right center",
                zIndex: 3
              }}
            >
              <div style={{
                position: "absolute",
                width: "80%",
                height: "1px",
                background: "rgba(0,0,0,0.15)",
                top: "50%",
                left: "10%"
              }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* TOP LEAVES (ANGLED OUTWARD AT STEM TOP) */}
      <AnimatePresence>
        {showTopLeaves && (
          <>
            {/* Top Left Leaf */}
            <motion.div
              initial={{ width: 0, height: 0 }}
              animate={{ width: "120px", height: "25px" }}
              transition={{ duration: 0.6 }}
              onAnimationComplete={() => setShowFlowers(true)}
              style={{
                position: "absolute",
                bottom: "calc(160px + 400px)",
                left: "50%",
                width: "120px",
                height: "25px",
                background: "#70B77E",
                borderRadius: "50%",
                transform: "translateX(-116px) rotate(-60deg)",
                transformOrigin: "right center",
                zIndex: 4
              }}
            >
              <div style={{
                position: "absolute",
                width: "80%",
                height: "1px",
                background: "rgba(0,0,0,0.15)",
                top: "50%",
                left: "10%"
              }} />
            </motion.div>

            {/* Top Right Leaf */}
            <motion.div
              initial={{ width: 0, height: 0 }}
              animate={{ width: "120px", height: "25px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                position: "absolute",
                bottom: "calc(160px + 400px)",
                left: "50%",
                width: "120px",
                height: "25px",
                background: "#70B77E",
                borderRadius: "50%",
                transform: "translateX(-4px) rotate(240deg)",
                transformOrigin: "left center",
                zIndex: 4
              }}
            >
              <div style={{
                position: "absolute",
                width: "80%",
                height: "1px",
                background: "rgba(0,0,0,0.15)",
                top: "50%",
                left: "10%"
              }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* LILY FLOWERS ON STEM - POSITIONED ABOVE TOP LEAVES */}
      <AnimatePresence>
        {showFlowers && (
          <>
            {/* Single Lily centered on stem top */}
            <motion.img
              src={lilyTopImg}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              onAnimationComplete={() => {
                setTimeout(() => {
                  onGrowthComplete?.()
                }, 1000)
              }}
              style={{
                position: "absolute",
                bottom: "calc(160px + 320px)", // Moved down 15px from 390px to 375px
                left: "45%",
                transform: "translateX(-100px)", // Moved additional 15px left from -110px to -125px
                width: "175px", // Increased from 100px to 200px (twice the size)
                zIndex: 5
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PlantGrowth