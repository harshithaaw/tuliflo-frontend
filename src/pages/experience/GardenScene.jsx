import { useState, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"

function GardenScene({ onWaterComplete }) {

  const [showWaterDrop, setShowWaterDrop] = useState(false)
  const [waterDroplets, setWaterDroplets] = useState([])

  // Generate random values once using useMemo
  const gardenElements = useMemo(() => {
    const grassBlades = [...Array(20)].map((_, i) => ({
      id: i,
      height: 20 + Math.random() * 15,
      rotation: -5 + Math.random() * 10
    }))
    
    const flowers = [...Array(8)].map((_, i) => ({
      id: i,
      bottom: 10 + Math.random() * 30
    }))
    
    return { grassBlades, flowers }
  }, [])

  const handleSeedClick = () => {
    // Create multiple water droplets
    const droplets = []
    for (let i = 0; i < 8; i++) {
      droplets.push({
        id: i,
        delay: i * 0.1,
        x: 50 + 5 - 3 + (Math.random() - 0.5) * 5, // Moved left by 3px
        size: (8 + Math.random() * 8) * 1.1 // Increased by 10%
      })
    }
    setWaterDroplets(droplets)
    setShowWaterDrop(true)

    // after animation finishes
    setTimeout(() => {
      setShowWaterDrop(false)
      setWaterDroplets([])
      onWaterComplete && onWaterComplete()
    }, 3000)
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#E3F2FD", // Light blue sky background
        position: "relative",
        overflow: "hidden"
      }}
    >

      {/* Sky area with sun */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "75%", // Extended to touch soil at 75%
        background: "linear-gradient(to bottom, #E3F2FD 0%, #BBDEFB 100%)"
      }}>

        {/* Cheerful smiling sun */}
        <div style={{
          position: "absolute",
          top: "10%",
          right: "15%",
          width: "80px",
          height: "80px",
          background: "#FFD54F",
          borderRadius: "50%",
          border: "3px solid #FFC107",
          boxShadow: "0 0 20px rgba(255, 213, 79, 0.5)"
        }}>
          {/* Sun rays */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "15px",
                height: "3px",
                background: "#FFC107",
                transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                transformOrigin: "center"
              }}
            />
          ))}
          {/* Sun face */}
          <div style={{
            position: "absolute",
            top: "30%",
            left: "25%",
            width: "12px",
            height: "8px",
            background: "#FF6F00",
            borderRadius: "50%"
          }} />
          <div style={{
            position: "absolute",
            top: "30%",
            right: "25%",
            width: "12px",
            height: "8px",
            background: "#FF6F00",
            borderRadius: "50%"
          }} />
          <div style={{
            position: "absolute",
            bottom: "25%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "20px",
            height: "8px",
            background: "#FF6F00",
            borderRadius: "0 0 10px 10px"
          }} />
        </div>

        {/* Clouds */}
        <div style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: "60px",
          height: "30px",
          background: "white",
          borderRadius: "20px",
          opacity: 0.8
        }} />
        <div style={{
          position: "absolute",
          top: "25%",
          left: "30%",
          width: "80px",
          height: "35px",
          background: "white",
          borderRadius: "25px",
          opacity: 0.7
        }} />
      </div>

      {/* Soil cross-section - ground line at 75% */}
      <div style={{
        position: "absolute",
        top: "75%",
        left: 0,
        width: "100%",
        height: "25%", // Reduced from 50% to 25%
        background: "linear-gradient(to bottom, #8D6E63 0%, #6D4C41 50%, #5D4037 100%)",
        borderTop: "4px solid #A1887F"
      }}>

        {/* Soil layers */}
        <div style={{
          position: "absolute",
          top: "0px",
          left: 0,
          width: "100%",
          height: "20px",
          background: "linear-gradient(to bottom, #8D6E63 0%, #795548 100%)",
          borderBottom: "2px solid #6D4C41"
        }} />

        {/* Small rocks in soil */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${30 + i * 15}px`,
              left: `${15 + i * 18}%`,
              width: "8px",
              height: "6px",
              background: "#757575",
              borderRadius: "30%",
              opacity: 0.6
            }}
          />
        ))}

        {/* Seed - half above, half below ground line */}
        <motion.div
          onClick={handleSeedClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: "absolute",
            top: "-40px", // Half above ground line
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "80px",
            background: "linear-gradient(135deg, #8D6E63 0%, #6D4C41 100%)",
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            cursor: "pointer",
            border: "3px solid #5D4037",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 10
          }}
        >
          {/* Seed texture lines */}
          <div style={{ position: "absolute", top: "30%", width: "100%", height: "2px", background: "#5D4037" }} />
          <div style={{ position: "absolute", top: "50%", width: "100%", height: "2px", background: "#5D4037" }} />
          <div style={{ position: "absolute", top: "70%", width: "100%", height: "2px", background: "#5D4037" }} />
        </motion.div>

        {/* Grass blades above ground */}
        {gardenElements.grassBlades.map((blade) => (
          <div
            key={blade.id}
            style={{
              position: "absolute",
              top: "-20px",
              left: `${blade.id * 5}%`,
              width: "3px",
              height: `${blade.height}px`,
              background: "#4CAF50",
              transform: `rotate(${blade.rotation}deg)`,
              transformOrigin: "bottom",
              opacity: 0.9
            }}
          />
        ))}

        {/* Small flowers above ground */}
        {gardenElements.flowers.map((flower) => (
          <div
            key={flower.id}
            style={{
              position: "absolute",
              top: "-30px",
              left: `${10 + flower.id * 12}%`,
              width: "10px",
              height: "10px",
              background: "#FFB6C1",
              borderRadius: "50%",
              border: "2px solid #FF69B4"
            }}
          />
        ))}
      </div>

      {/* Water droplets - falling on seed */}
      <AnimatePresence>
        {showWaterDrop && waterDroplets.map((droplet) => (
          <motion.div
            key={droplet.id}
            initial={{ 
              scale: 0, 
              opacity: 0, 
              top: "10%", 
              left: `${droplet.x}%` 
            }}
            animate={{
              scale: [0, 1, 0.8],
              opacity: [0, 1, 0],
              top: ["10%", "65%", "75%"] // Falls to touch seed at ground line
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 2.5,
              delay: droplet.delay,
              ease: "easeIn"
            }}
            style={{
              position: "absolute",
              width: `${droplet.size}px`,
              height: `${droplet.size * 1.5}px`,
              background: "radial-gradient(circle, #64B5F6 0%, #2196F3 100%)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              filter: "none",
              boxShadow: "0 2px 4px rgba(33, 150, 243, 0.3)",
              zIndex: 12
            }}
          />
        ))}
      </AnimatePresence>

    </div>
  )
}

export default GardenScene