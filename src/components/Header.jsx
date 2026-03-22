import tulifloLogo from '../assets/tuliflo-logo.png'

function Header() {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '20px',
      paddingBottom: '10px'
    }}>
      <img 
        src={tulifloLogo} 
        alt="Tuliflo" 
        style={{
          height: '160px',
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
        }}
      />
    </div>
  )
}

export default Header