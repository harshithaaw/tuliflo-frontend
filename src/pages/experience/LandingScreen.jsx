import { motion } from 'framer-motion'
import tulifloLogo from '../../assets/tuliflo-logo.png'
import seedbagImg from '../../assets/seedbag.png'

// Pre-defined particle positions to avoid Math.random calls
const particles = [
  { id: 1, top: 10, left: 15, duration: 4, delay: 0 },
  { id: 2, top: 20, left: 80, duration: 5, delay: 1 },
  { id: 3, top: 35, left: 25, duration: 3.5, delay: 0.5 },
  { id: 4, top: 45, left: 70, duration: 4.5, delay: 1.5 },
  { id: 5, top: 60, left: 30, duration: 5.5, delay: 2 },
  { id: 6, top: 70, left: 85, duration: 3, delay: 0.8 },
  { id: 7, top: 85, left: 20, duration: 4, delay: 1.2 },
  { id: 8, top: 15, left: 50, duration: 5, delay: 0.3 },
  { id: 9, top: 25, left: 60, duration: 3.5, delay: 1.8 },
  { id: 10, top: 40, left: 40, duration: 4.5, delay: 0.6 },
  { id: 11, top: 55, left: 75, duration: 5, delay: 1.4 },
  { id: 12, top: 75, left: 55, duration: 3, delay: 2.2 },
  { id: 13, top: 90, left: 35, duration: 4, delay: 0.9 },
  { id: 14, top: 30, left: 90, duration: 5.5, delay: 1.7 },
  { id: 15, top: 50, left: 10, duration: 3.5, delay: 0.4 },
  { id: 16, top: 65, left: 45, duration: 4.5, delay: 1.3 },
  { id: 17, top: 80, left: 65, duration: 5, delay: 2.1 },
  { id: 18, top: 12, left: 35, duration: 3, delay: 0.7 },
  { id: 19, top: 38, left: 58, duration: 4, delay: 1.6 },
  { id: 20, top: 72, left: 28, duration: 5.5, delay: 0.2 }
]

function LandingScreen({ onOpenGift }) {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: "linear-gradient(135deg, #FAF7F0 0%, #F5E6D3 50%, #F0E5D8 100%)", // Aesthetic cream white gradient
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Tuliflo Logo */}
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
            height: "160px",
            objectFit: "contain",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
          }}
        />
      </div>
      {/* Three panels container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          display: 'flex',
          gap: '60px',
          alignItems: 'center',
          zIndex: 1
        }}
      >
        {/* LEFT PANEL - Note Card */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            width: '200px',
            height: '280px',
            backgroundColor: 'rgba(30, 30, 60, 0.8)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Note card lines to represent text */}
          <div style={{
            position: 'absolute',
            top: '30px',
            left: '20px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
              width: '80%'
            }} />
            <div style={{
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              width: '100%'
            }} />
            <div style={{
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
              width: '90%'
            }} />
            <div style={{
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              width: '70%'
            }} />
            <div style={{
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
              width: '85%'
            }} />
          </div>
        </motion.div>

        {/* CENTER PANEL - Seed Bag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '30px'
          }}
        >
          {/* Seed Bag Image */}
          <div style={{
            width: '240px',
            height: '320px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img
              src={seedbagImg}
              alt="Tuliflo Seed Bag"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.3))'
              }}
            />
          </div>

          {/* Open Gift Button */}
          <motion.button
            onClick={onOpenGift}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '16px 40px',
              fontSize: '18px',
              fontWeight: '600',
              backgroundColor: 'rgba(133, 36, 0, 0.9)',
              color: '#fffce4',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(115, 75, 66, 0.3)',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
          >
            Open Gift
          </motion.button>
        </motion.div>

        {/* RIGHT PANEL - Vinyl Disc */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            width: '200px',
            height: '200px',
            backgroundColor: 'rgba(20, 20, 40, 0.8)',
            borderRadius: '50%',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {/* Vinyl record grooves */}
          <div style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.1)'
          }} />
          <div style={{
            position: 'absolute',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }} />
          <div style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }} />
          
          {/* Center label */}
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: 'rgba(40, 40, 70, 0.9)',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '50%'
            }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Background ambient particles for visual interest */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '50%',
            top: particle.top + '%',
            left: particle.left + '%'
          }}
        />
      ))}
    </div>
  )
}

export default LandingScreen

/*
EXPLANATION:

This LandingScreen component creates an elegant gift-opening interface with three distinct panels:

1. LEFT PANEL (Note Card): 
   - A blurred, dark rectangle representing a handwritten note
   - Contains subtle lines to suggest text content
   - Uses backdrop-filter blur effect for a glass-morphism look

2. CENTER PANEL (Seed Bag):
   - The main focal point with a stylized seed bag container
   - Features a seed illustration with texture lines
   - Includes "SEEDS" label and prominent "Open Gift" button
   - Brighter styling to draw attention
   - Button calls the onOpenGift prop when clicked

3. RIGHT PANEL (Vinyl Disc):
   - A blurred circular element representing a music record
   - Multiple concentric circles simulate vinyl grooves
   - Center label mimics a real record design

ANIMATIONS:
- Staggered entrance animations using Framer Motion
- Each panel slides in from different directions with delays
- Button has hover and tap interactions
- Ambient particles create subtle background movement
- All animations use smooth easing for premium feel

DESIGN PRINCIPLES:
- Dark theme (#0a0a1f) for intimate, gift-revealing atmosphere
- Glass-morphism effects with backdrop filters
- Careful opacity hierarchy (center brightest, sides dimmer)
- Responsive hover states and micro-interactions
- No external dependencies except framer-motion

The component serves as the entry point to the gift experience, building anticipation 
through visual storytelling and interactive elements.
*/
