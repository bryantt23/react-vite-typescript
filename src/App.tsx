import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <div
          onClick={() => {
            setCount(prev => prev + 1);
          }}
          className='circle'
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'red',
            borderRadius: '50%'
          }}
        ></div>
        <div>Times clicked: {count}</div>
      </div>
    </>
  );
}

export default App;
