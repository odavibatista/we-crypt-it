'use client'

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { generateKeys } from './api/endpoints/keys/GenerateKeys.endpoint';
import { encryptMatrix } from './api/endpoints/matrix/EncryptMatrix.endpoint';

function Criptografia() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [keys, setKeys] = useState<{iv: string, secret: string} | null>(null);
  const [encryptionResult, setEncryptionResult] = useState<string | null>(null);

  // Estado para a matriz (inicialmente em branco)
  const [matrix, setMatrix] = useState([
    ['0', '0', '0'],
    ['0', '0', '0']
  ]);

  useEffect(() => {
    const fetchKeys = async () => {
      if (!keys) {
        const response = await generateKeys()

        if ('statusCode' in response) {
          console.error('Erro ao gerar chaves:', response.message);
          return;
        }

        setKeys(response);
        setInput1(response.iv);
        setInput2(response.secret);
      }
    };

    fetchKeys();
  }, []);

  // Função para lidar com mudanças nos inputs da matriz
  const handleInputChange = (rowIndex: number, cellIndex: number, value: string) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[rowIndex][cellIndex] = value;
    setMatrix(updatedMatrix);
  };

  const handleGenerateKeys = async () => {
    const response = await generateKeys()

    if ('statusCode' in response) {
      console.error('Erro ao gerar chaves:', response.message);
      return;
    }

    setKeys(response);
    setInput1(response.iv);
    setInput2(response.secret);
  }

  const handleEncryptMatrix = async () => {
    const encryptedMatrix = await encryptMatrix({
      iv: input1,
      secret: input2,
      matrix: JSON.stringify(matrix)
    })

    console.log(`Matrix cripto: ${JSON.stringify(matrix)}`);
    console.log(`IV: ${input1}`);
    console.log(`Secret: ${input2}`);

    if ('statusCode' in encryptedMatrix) {
      alert(`Erro ao criptografar matriz: ${encryptedMatrix.message}`);
      return;
    }

    setEncryptionResult(encryptedMatrix.encryptedMatrix);
  }

  const handleButtonClick = (buttonNumber: number) => {
    if (buttonNumber === 1) {
      console.log('Botão 1 clicado');
    } else {
      console.log('Botão 2 clicado');
    }
  }


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f0f8ff' // Centraliza verticalmente ocupando 100% da altura da viewport
    }}>
      {/* Div para os botões no topo da página */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => handleButtonClick(1)}
          style={{
            padding: '10px 20px',
            marginLeft: '37%',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px 0 0 5px',
            cursor: 'pointer',
            marginTop: '50px',
            width:'10%',
          }}
        >Criptografia

        </button>
        
        <button
          onClick={() => handleButtonClick(2)}
          style={{
            padding: '10px 20px',
            backgroundColor: 'blue',
            border: 'none',
            borderRadius: '0 5px 5px 0',
            cursor: 'pointer',
            marginTop: '50px',
            width:'10%'
          }}
        ><Link to="/Descriptografia"
        style={{color: 'white', textDecoration: 'none',

        }} >Descriptografia</Link>
          
        </button>
      </div>

      {/* Inserção dos inputs e seus botões */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '100px',
      }}>
        <div style={{
          display: 'flex',
          marginBottom: '10px',
          width: '80%', // Faz com que a div ocupe 80% da largura
        }}>
          <input
            type="text"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            placeholder="INPUT 01 - CHAVE IV"
            style={{ padding: '10px', width: '200px', marginRight: '10px', marginLeft: '10%' }}
          />
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginLeft: '50%',
              width:'13.5%'
            }}

            onClick={async () => handleGenerateKeys()}
          >
            GERAR
          </button>
        </div>

        <div style={{
          display: 'flex',
          marginBottom: '10px',
          width: '80%',
        }}>
          <input
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder="INPUT 02 - CHAVE SECRETA"
            style={{ padding: '10px', width: '200px', marginRight: '10px', marginLeft: '10%', marginTop: '5%' }}
          />
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginLeft: '50%',
              marginTop: '5%'
            }}
            onClick={async () => handleEncryptMatrix()}
          >
            CRIPTOGRAFAR
          </button>
        </div>

        {/* Matriz e novo input ao lado */}

          <div>
  <label style={{  display: 'block', margin:'30px 0 15px 65.8%',width:'35%' }}>OUTPUT- MATRIZ EM TEXTO CRIPTOGRAFADO</label>
  <label style={{  display: 'block', margin:'-25px 0 0px 8%',width:'25%' }}>INPUT - ÁREA DE INSERIR A MATRIZ</label>
  <input
  type="text"
  placeholder="ASNSJDNAJNDA45454AX"
  value={encryptionResult || ''}
  style={{
    padding: '10px',
    width: '350px',
    height: '50px',
    margin: '10px 0 15px 65.8%',
    borderColor: 'ActiveBorder',
    borderStyle: 'solid',
    borderWidth: '1px',
    whiteSpace: 'nowrap' // impede quebras de linha, mas você pode ajustar o layout
  }}
/>

</div>

          {/* Matriz */}
          <div style={{ position:'absolute',marginLeft:'7.1%',marginTop:'220px'}}>
            {matrix.map((row, rowIndex) => (
              <div key={rowIndex} style={{ display: 'flex' }}>
                {row.map((cell, cellIndex) => (
                  <input
                    key={cellIndex}
                    type="text"
                    value={cell}
                    onChange={(e) => handleInputChange(rowIndex, cellIndex, e.target.value)}
                    style={{
                      width: '50px',
                      height: '50px',
                      margin: '10px',
                      textAlign:'center',
position: 'relative'
                      
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>

  );
}

export default Criptografia;
