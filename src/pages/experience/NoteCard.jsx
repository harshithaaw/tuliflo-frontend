import { motion, AnimatePresence } from "framer-motion"

function NoteCard({ message, isExpanded, onExpand, onCollapse }) {
  // Generate random widths once to avoid Math.random during render
  const lineWidths = [65, 85, 75, 90, 70, 80, 60, 95]

  if (isExpanded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
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
          padding: "40px 20px",
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

        {/* Note paper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            backgroundColor: "#f8f5f0",
            borderRadius: "12px",
            padding: "40px",
            maxWidth: "600px",
            width: "100%",
            minHeight: "400px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            position: "relative",
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 24px,
                rgba(139, 69, 19, 0.03) 24px,
                rgba(139, 69, 19, 0.03) 25px
              )
            `,
          }}
        >
          {/* Paper texture overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "12px",
              background: `
                radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.02) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(139, 69, 19, 0.02) 0%, transparent 50%),
                radial-gradient(circle at 40% 20%, rgba(139, 69, 19, 0.01) 0%, transparent 50%)
              `,
              pointerEvents: "none",
            }}
          />

          {/* Message content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: "'Caveat', cursive, 'Segoe Script', cursive",
              fontSize: "24px",
              lineHeight: "1.6",
              color: "#2c1810",
              textAlign: "left",
              whiteSpace: "pre-wrap",
              position: "relative",
              zIndex: 1,
            }}
          >
            {message}
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  // Collapsed state - decorative card
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={onExpand}
      style={{
        backgroundColor: "#f8f5f0",
        borderRadius: "12px",
        padding: "30px",
        width: "200px",
        height: "250px",
        cursor: "pointer",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        position: "relative",
        overflow: "hidden",
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 18px,
            rgba(139, 69, 19, 0.08) 18px,
            rgba(139, 69, 19, 0.08) 19px
          )
        `,
      }}
    >
      {/* Paper texture */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 30% 40%, rgba(139, 69, 19, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 70% 60%, rgba(139, 69, 19, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 50% 20%, rgba(139, 69, 19, 0.04) 0%, transparent 30%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Blurred text lines */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          right: "20px",
          bottom: "20px",
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              height: "2px",
              backgroundColor: "rgba(139, 69, 19, 0.15)",
              marginBottom: "12px",
              borderRadius: "1px",
              width: lineWidths[i] + "%",
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* Subtle hint text */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          right: "15px",
          fontSize: "10px",
          color: "rgba(139, 69, 19, 0.3)",
          fontStyle: "italic",
        }}
      >
        Click to open...
      </div>
    </motion.div>
  )
}

export default NoteCard