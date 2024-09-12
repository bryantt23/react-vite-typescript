import { useState, useRef, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [rectangleCt, setRectangleCt] = useState(1);
  const intervalId = useRef<any>(null); //cleanup

  const buyRectangle = () => {
    if (count < 5) {
      return;
    }
    setCount(prev => prev - 5);
    setRectangleCt(prev => prev + 1);
  };

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCount(prev => prev + rectangleCt);
    }, 1000);
    // Cleanup the interval on component unmount or when dependencies change
    return () => clearInterval(intervalId.current);
  }, [rectangleCt]);

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
        <div>Points added each second: {rectangleCt}</div>
        <button onClick={buyRectangle}>Make rectangle</button>
        {Array.from({ length: rectangleCt }).map((cur, i) => (
          <div key={i} className='rectangle'></div>
        ))}
      </div>
    </>
  );
}

export default App;
