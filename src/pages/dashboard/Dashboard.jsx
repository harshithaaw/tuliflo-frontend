import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import { giftAPI } from "../../services/api"

import Header from "../../components/Header"

import lilyImg from "../../assets/lily.png"

import dashBg from "../../assets/dash-bg.png"



function Dashboard() {

  const [gifts, setGifts] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  const [copiedId, setCopiedId] = useState(null)

  const navigate = useNavigate()



  useEffect(() => {

    const fetchGifts = async () => {

      try {

        const userId = localStorage.getItem("userId")

        if (!userId) {

          setError("User not found. Please log in again.")

          return

        }



        const response = await giftAPI.getUserGifts(userId)

        setGifts(response.data)

      } catch (err) {

        setError("Failed to load gifts. Please try again.")

        console.error("Error fetching gifts:", err)

      } finally {

        setLoading(false)

      }

    }



    fetchGifts()

  }, [])



  const formatDate = (dateString) => {

    const date = new Date(dateString)

    return date.toLocaleDateString("en-US", {

      year: "numeric",

      month: "short",

      day: "numeric"

    })

  }



  const copyToClipboard = async (shareableLink, giftId) => {

    try {

      const fullUrl = `https://tuliflo-frontend.vercel.app/gift/${shareableLink}`

      await navigator.clipboard.writeText(fullUrl)

      setCopiedId(giftId)

      setTimeout(() => setCopiedId(null), 2000)

    } catch (err) {

      console.error("Failed to copy:", err)

    }

  }



  const truncateLink = (link) => {

    return link.length > 30 ? link.substring(0, 30) + "..." : link

  }



  return (

    <div

      style={{

        minHeight: "100vh",

        backgroundImage: `url(${dashBg})`,

        backgroundSize: "cover",

        backgroundPosition: "center",

        backgroundRepeat: "no-repeat",

        fontFamily: "'Caveat', cursive",

        display: "flex",

        flexDirection: "column"

      }}

    >

      {/* Top border strip */}

      



      <Header />



      <div style={{

        flex: 1,

        padding: "40px 20px",

        marginTop: "-50px"

      }}>

        {/* Header Section */}

        <div

          style={{

            textAlign: "center",

            marginBottom: "40px",

          }}

        >

          <h1

            style={{

              color: "#C62828",

              fontSize: "48px",

              fontWeight: "600",

              margin: "0 0 30px 0",

            }}

          >

            My Gifts

          </h1>

          <button

            onClick={() => navigate("/create")}

            style={{

              backgroundColor: "#C62828",

              border: "none",

              color: "white",

              padding: "12px 32px",

              borderRadius: "25px",

              fontSize: "20px",

              fontWeight: "500",

              cursor: "pointer",

              transition: "all 0.3s",

              boxShadow: "0 4px 12px rgba(198, 40, 40, 0.3)"

            }}

            onMouseEnter={(e) => {

              e.target.style.backgroundColor = "#A52020"

              e.target.style.transform = "translateY(-2px)"

            }}

            onMouseLeave={(e) => {

              e.target.style.backgroundColor = "#C62828"

              e.target.style.transform = "translateY(0)"

            }}

          >

            Create New Gift

          </button>

        </div>



        {/* Content */}

        {loading ? (

          <div

            style={{

              textAlign: "center",

              color: "#666",

              fontSize: "20px",

            }}

          >

            Loading your gifts...

          </div>

        ) : error ? (

          <div

            style={{

              textAlign: "center",

              color: "#C62828",

              fontSize: "18px",

            }}

          >

            {error}

          </div>

        ) : gifts.length === 0 ? (

          <div

            style={{

              textAlign: "center",

              color: "#666",

              fontSize: "20px",

            }}

          >

            No gifts yet. Create your first one!

          </div>

        ) : (

          <div

            style={{

              display: "grid",

              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",

              gap: "24px",

              maxWidth: "1200px",

              margin: "0 auto",

            }}

          >

            {gifts.map((gift) => (

              <div

                key={gift.id}

                style={{

                  backgroundColor: "white",

                  padding: "20px",

                  borderRadius: "16px",

                  border: "2px solid #FFB6C1",

                  transition: "all 0.3s",

                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)"

                }}

                onMouseEnter={(e) => {

                  e.currentTarget.style.transform = "translateY(-4px)"

                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(198, 40, 40, 0.15)"

                }}

                onMouseLeave={(e) => {

                  e.currentTarget.style.transform = "translateY(0)"

                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"

                }}

              >

                {/* Gift Image */}

                <img

                  src={lilyImg}

                  alt="Gift preview"

                  style={{

                    width: "100%",

                    height: "200px",

                    objectFit: "cover",

                    borderRadius: "12px",

                    marginBottom: "16px",

                    border: "1px solid #FFB6C1"

                  }}

                />



                {/* Gift Title */}

                <h3

                  style={{

                    color: "#C62828",

                    fontSize: "20px",

                    fontWeight: "600",

                    margin: "0 0 8px 0",

                  }}

                >

                  Created: {formatDate(gift.createdAt)}

                </h3>



                {/* Shareable Link Preview */}

                <div

                  style={{

                    color: "#999",

                    fontSize: "13px",

                    marginBottom: "16px",

                    wordBreak: "break-all",

                    fontFamily: "Arial, sans-serif"

                  }}

                >

                  {truncateLink(gift.shareableLink)}

                </div>



                {/* Action Buttons */}

                <div

                  style={{

                    display: "flex",

                    gap: "10px",

                  }}

                >

                  <button

                    onClick={() => copyToClipboard(gift.shareableLink, gift.id)}

                    style={{

                      flex: 1,

                      backgroundColor: copiedId === gift.id ? "#4CAF50" : "white",

                      border: "1px solid #FFB6C1",

                      color: copiedId === gift.id ? "white" : "#C62828",

                      padding: "10px 12px",

                      borderRadius: "10px",

                      fontSize: "15px",

                      fontWeight: "500",

                      cursor: "pointer",

                      transition: "all 0.2s",

                    }}

                    onMouseEnter={(e) => {

                      if (copiedId !== gift.id) {

                        e.target.style.backgroundColor = "#FFF0F3"

                      }

                    }}

                    onMouseLeave={(e) => {

                      if (copiedId !== gift.id) {

                        e.target.style.backgroundColor = "white"

                      }

                    }}

                  >

                    {copiedId === gift.id ? "Copied!" : "Copy Link"}

                  </button>

                  <button

                    onClick={() => navigate(`/gift/${gift.shareableLink}`)}

                    style={{

                      flex: 1,

                      backgroundColor: "#C62828",

                      border: "none",

                      color: "white",

                      padding: "10px 12px",

                      borderRadius: "10px",

                      fontSize: "15px",

                      fontWeight: "500",

                      cursor: "pointer",

                      transition: "all 0.2s",

                    }}

                    onMouseEnter={(e) => {

                      e.target.style.backgroundColor = "#A52020"

                    }}

                    onMouseLeave={(e) => {

                      e.target.style.backgroundColor = "#C62828"

                    }}

                  >

                    View Gift

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>



      {/* Bottom gingham border */}

    

    </div>

  )

}



export default Dashboard