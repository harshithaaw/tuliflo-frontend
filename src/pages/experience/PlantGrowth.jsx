import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import plantAnim from "../../assets/plant-grow.lottie?url"

function PlantGrowth({ onGrowthComplete }) {
  const [showWhiteout, setShowWhiteout] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const pauseTimerRef = useRef(null)

  const handleDotLottieRef = (instance) => {
    if (!instance) return

    instance.addEventListener("complete", () => {
      console.log("Your flowers have bloomed! Lottie complete fired")
      setAnimationComplete(true)
      pauseTimerRef.current = setTimeout(() => {
        setShowWhiteout(true)
      }, 3000)
    })
  }

  const handleWhiteoutComplete = () => {
    setTimeout(() => {
      onGrowthComplete?.()
    }, 200)
  }

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    }
  }, [])

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#102b1f",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DotLottieReact
        src={plantAnim}
        autoplay
        loop={false}
        dotLottieRefCallback={handleDotLottieRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* Quirky growing text - vanishes when animation completes */}
      <AnimatePresence>
        {!animationComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "60px",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              zIndex: 5,
            }}
          >
            <h2
              style={{
                color: "#f8b0b0",
                fontSize: "15px",
                fontFamily: "'Caveat', cursive",
                fontWeight: "normal",
                margin: 0,
              }}
            >
              Your flowers are growing.. magical things take time!
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWhiteout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onAnimationComplete={handleWhiteoutComplete}
            style={{
              position: "absolute",
              inset: 0,
              background: "#000000",
              zIndex: 10,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default PlantGrowth