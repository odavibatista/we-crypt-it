import { Link } from 'react-router-dom';
import { useState } from 'react';

function TelaInicial() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f8ff' }}>
      <nav style={{ textAlign: 'center' }}>
        <button
          style={{
            width:'45%',
            margin: '10px',
            padding: '15px 30px',
            backgroundColor: hoveredButton === 'criptografia' ? '#45a049' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s, transform 0.3s',
            transform: hoveredButton === 'criptografia' ? 'scale(1.05)' : 'scale(1)'
          }}
          onMouseEnter={() => setHoveredButton('criptografia')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <Link to="/Criptografia" style={{ textDecoration: 'none', color: 'white' }}>Criptografia</Link>
        </button>

        <button
          style={{
            width:'45%',
            margin: '10px',
            padding: '15px 30px',
            backgroundColor: hoveredButton === 'descriptografia' ? '#007B9E' : '#008CBA',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s, transform 0.3s',
            transform: hoveredButton === 'descriptografia' ? 'scale(1.05)' : 'scale(1)'
          }}
          onMouseEnter={() => setHoveredButton('descriptografia')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <Link to="/Descriptografia" style={{ textDecoration: 'none', color: 'white' }}>Descriptografia</Link>
        </button>
      </nav>
    </div>
  );
}

export default TelaInicial;


