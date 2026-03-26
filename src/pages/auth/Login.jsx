import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import Header from '../../components/Header';
import bgHearts from '../../assets/background-hearts.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(username, password);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      backgroundImage: `url(${bgHearts})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: 'Caveat, cursive',
      position: 'relative'
    }}>
      <Header />
      
      <div style={{
        height: 'calc(100vh - 110px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        marginTop: '-30px'
      }}>
        <div style={{
          backgroundColor: '#f5f0e8',
          padding: '40px',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '2px solid #bd7880',
          marginTop: '-40px'
        }}>
          <h1 style={{ 
            textAlign: 'center', 
            marginBottom: '30px', 
            fontSize: '2.5rem',
            color: '#4d0011'
          }}>
            Login
          </h1>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '1.3rem',
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
                  padding: '12px',
                  fontSize: '1rem',
                  borderRadius: '10px',
                  border: '2px solid #bd7880',
                  backgroundColor: '#f5f0e8',
                  fontFamily: 'Arial, sans-serif'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '1.3rem',
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
                  padding: '12px',
                  fontSize: '1rem',
                  borderRadius: '10px',
                  border: '2px solid #bd7880',
                  backgroundColor: '#f5f0e8',
                  fontFamily: 'Arial, sans-serif'
                }}
              />
            </div>

            {error && (
              <p style={{ 
                color: '#4d0011', 
                marginBottom: '15px', 
                fontSize: '1.1rem',
                textAlign: 'center',
                backgroundColor: 'rgba(198, 40, 40, 0.1)',
                padding: '10px',
                borderRadius: '8px'
              }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1.3rem',
                fontFamily: 'Caveat, cursive',
                backgroundColor: loading ? '#6b0016' : '#4d0011',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(189, 120, 128, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.backgroundColor = '#bd7880';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.backgroundColor = '#4d0011';
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p style={{ 
            textAlign: 'center', 
            marginTop: '20px', 
            fontSize: '1.2rem',
            color: '#555'
          }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ 
              color: '#4d0011', 
              fontWeight: 'bold',
              textDecoration: 'none'
            }}>
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Gingham border at bottom */}
      <div style={{
        height: '80px',
        background: '#ffd9d9',
        borderTop: '3px solid #bd7880'
      }} />
    </div>
  );
}

export default Login;