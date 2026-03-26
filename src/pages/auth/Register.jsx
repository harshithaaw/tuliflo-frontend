import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import Header from '../../components/Header';
import bgHearts from '../../assets/background-hearts.png';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await authAPI.register(username, email, password);
      
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundImage: `url(${bgHearts})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: 'Caveat, cursive',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: '#f5f0e8',
          padding: '25px 30px',  // ✅ Reduced padding
          borderRadius: '16px',  // ✅ Slightly smaller radius
          width: '100%',
          maxWidth: '320px',  // ✅ Reduced from 380px to 320px
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          // ✅ REMOVED: border: '2px solid rgba(255, 182, 193, 0.3)'
        }}>
          <h1 style={{ 
            textAlign: 'center', 
            marginBottom: '20px',  // ✅ Reduced from 30px
            fontSize: '2.2rem',  // ✅ Slightly smaller
            color: '#4d0011'
          }}>
            Register
          </h1>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>  {/* ✅ Reduced spacing */}
              <label style={{ 
                display: 'block', 
                marginBottom: '6px',  // ✅ Reduced from 8px
                fontSize: '1.2rem',  // ✅ Reduced from 1.3rem
                color: '#4d0011'
              }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px',  // ✅ Reduced from 12px
                  fontSize: '0.95rem',  // ✅ Slightly smaller
                  borderRadius: '8px',  // ✅ Reduced from 10px
                  border: '1px solid #bd7880',  // ✅ Thinner border (was 2px)
                  backgroundColor: '#f5f0e8',
                  fontFamily: 'Arial, sans-serif'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '6px',
                fontSize: '1.2rem',
                color: '#4d0011'
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '0.95rem',
                  borderRadius: '8px',
                  border: '1px solid #bd7880',
                  backgroundColor: '#f5f0e8',
                  fontFamily: 'Arial, sans-serif'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '6px',
                fontSize: '1.2rem',
                color: '#4d0011'
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '0.95rem',
                  borderRadius: '8px',
                  border: '1px solid #bd7880',
                  backgroundColor: '#f5f0e8',
                  fontFamily: 'Arial, sans-serif'
                }}
              />
            </div>

            {error && (
              <p style={{ 
                color: '#4d0011', 
                marginBottom: '12px',  // ✅ Reduced
                fontSize: '1rem',  // ✅ Reduced
                textAlign: 'center',
                backgroundColor: 'rgba(198, 40, 40, 0.1)',
                padding: '8px',  // ✅ Reduced
                borderRadius: '6px'  // ✅ Reduced
              }}>
                {error}
              </p>
            )}

            {success && (
              <p style={{ 
                color: '#2E7D32',
                marginBottom: '12px',
                fontSize: '1rem',
                textAlign: 'center',
                backgroundColor: 'rgba(189, 120, 128, 0.1)',
                padding: '8px',
                borderRadius: '6px'
              }}>
                Registration successful! Redirecting to login...
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',  // ✅ Reduced from 14px
                fontSize: '1.2rem',  // ✅ Reduced from 1.3rem
                fontFamily: 'Caveat, cursive',
                backgroundColor: loading ? '#6b0016' : '#4d0011',
                color: 'white',
                border: 'none',
                borderRadius: '20px',  // ✅ Reduced from 25px
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(189, 120, 128, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.backgroundColor = '#A52020';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.backgroundColor = '#C62828';
              }}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p style={{ 
            textAlign: 'center', 
            marginTop: '16px',  // ✅ Reduced from 20px
            fontSize: '1.1rem',  // ✅ Reduced from 1.2rem
            color: '#555'
          }}>
            Already have an account?{' '}
            <Link to="/login" style={{ 
              color: '#4d0011', 
              fontWeight: 'bold',
              textDecoration: 'none'
            }}>
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Bottom border strip */}
      <div style={{
        height: '80px',
        background: '#ffd9d9',
        borderTop: '3px solid #bd7880'
      }} />
    </div>
  );
}

export default Register;