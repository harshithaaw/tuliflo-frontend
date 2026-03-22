import { useState, useEffect } from 'react'; // React hooks: state + lifecycle
import { useParams, useNavigate } from 'react-router-dom'; // Get parameters from URL + navigation
import { giftAPI } from '../../services/api'; // API service for gift operations
import GardenScene from './GardenScene'
import LandingScreen from './LandingScreen'
import PlantGrowth from './PlantGrowth'
import GiftReveal from './GiftReveal'

function GiftLanding() {
  // Extract shareableLink from URL  // Example: /gift/abc123 → shareableLink = "abc123"
  const { shareableLink } = useParams()
  const navigate = useNavigate()

  // Phase controls which stage of experience is shown  // 0 → Landing Screen  // 1 → Split Animation  // 2 → Garden Scene  // 3 → Plant Growing  // 4 → Gift Reveal
  const [phase, setPhase] = useState(0)
  
  // Keeps track of which card is clicked in reveal stage
  // Possible values later: "plant", "note", "music"
  const [activeCard, setActiveCard] = useState(null)
  
  // API-related states
  const [apiGiftData, setApiGiftData] = useState(null) // Stores data from API
  const [loading, setLoading] = useState(false) // Indicates whether data is still being loaded
  const [error, setError] = useState(null) // Stores any error message from API request

  // useEffect runs when component first loads
  // and whenever "shareableLink" changes
  useEffect(() => {
    // Function that fetches gift data from backend API
    const fetchGiftData = async () => {
      if (!shareableLink) {
        setLoading(false)
        return
      }

      try {
        // Start loading state
        setLoading(true)

        // Send GET request to backend using giftAPI
        const response = await giftAPI.getGiftByLink(shareableLink)

        // Store returned gift data in state
        setApiGiftData(response.data)
        setError(null)

      } catch (err) {
        // Handle 404 error specifically
        if (err.response?.status === 404) {
          setError('Gift not found')
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login')
          }, 3000)
        } else {
          // Handle network/other errors
          setError('Failed to load. Please try again.')
        }

        // Log full error in console for debugging
        console.error('Error fetching gift data:', err)

      } finally {
        // Stop loading indicator
        setLoading(false)
      }
    }

    fetchGiftData()
  }, [shareableLink, navigate])

  // Retry function for network errors
  const handleRetry = () => {
    setError(null);
    // Re-trigger fetch by calling it directly
    const fetchGiftData = async () => {
      try {
        setLoading(true);
        const response = await giftAPI.getGiftByLink(shareableLink);
        setApiGiftData(response.data);
        setError(null);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Gift not found');
          setTimeout(() => navigate('/login'), 3000);
        } else {
          setError('Failed to load. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchGiftData();
  };

  return (
    <div style={{ backgroundColor: '#0a0a1f', minHeight: '100vh' }}>
      <div style={{color:'white', position:'fixed', top:10, left:10, zIndex:9999}}>phase: {phase}</div>

      {/* Loading state */}
      {loading && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          color: 'white',
          fontSize: '20px'
        }}>
          Loading your gift...
        </div>
      )}

      {/* Gift not found error */}
      {error === 'Gift not found' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          color: 'white',
          textAlign: 'center',
          padding: '20px'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#ff6b6b' }}>
            Gift Not Found
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>
            The gift you're looking for doesn't exist or has been removed.
          </p>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)' }}>
            Redirecting to login page...
          </p>
        </div>
      )}

      {/* Network error with retry */}
      {error && error !== 'Gift not found' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          color: 'white',
          textAlign: 'center',
          padding: '20px'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#ff6b6b' }}>
            Failed to Load Gift
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>
            {error}
          </p>
          <button
            onClick={handleRetry}
            style={{
              backgroundColor: '#4ecdc4',
              border: 'none',
              color: '#0a0a1f',
              padding: '12px 24px',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 4px 16px rgba(78,205,196,0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Render existing phase structure when API data is available */}
      {apiGiftData && (
        <>
          {/* Phase 0: Landing Screen */}
          {phase === 0 && <LandingScreen onOpenGift={() => setPhase(1)} />}
          
          {/* Phase 1: Garden Scene */}
          {phase === 1 && <GardenScene onWaterComplete={() => setPhase(2)} />}
          
          {/* Phase 2: Plant Growth */}
          {phase === 2 && <PlantGrowth onGrowthComplete={() => setPhase(4)} />}
          
          {/* Phase 4: Gift Reveal */}
          {phase === 4 && <GiftReveal giftData={apiGiftData} />}
        </>
      )}
    </div>
  )
}

export default GiftLanding
  // useEffect runs when the component first loads
  // and whenever the "id" changes
  // useEffect(() => {

  //   // Function that fetches gift data from backend API
  //   const fetchGiftData = async () => {
  //     try {
  //       // Start loading state
  //       setLoading(true)

  //       // Send GET request to backend
  //       // Example request: /api/gifts/123
  //       const response = await axios.get(`/api/gifts/${id}`)

  //       // Store returned gift data in state
  //       setGiftData(response.data)

  //       // Clear any previous errors
  //       setError(null)

  //     } catch (err) {

  //       // If request fails, store error message
  //       setError(err.message || 'Failed to fetch gift data')

  //       // Log full error in console for debugging
  //       console.error('Error fetching gift data:', err)

  //     } finally {

  //       // Stop loading indicator
  //       setLoading(false)
  //     }
  //   }

     
  //  if (id) {
  //    fetchGiftData()
  //  } else {
  //    setLoading(false)
  //  }
