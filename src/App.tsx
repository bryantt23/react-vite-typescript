import { useState, useRef, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [rectangles, setRectangles] = useState([]);
  const intervalId = useRef<any>(null); //cleanup
  const [rectanglesPts, setRectanglesPts] = useState(0);

  const buyRectangle = () => {
    if (count < 5) {
      return;
    }
    setCount(prev => prev - 5);
    setRectangles(prev => [...prev, { name: 'og' }]);
    setRectanglesPts(prev => prev + 1);
  };

  const buyRectangle2 = () => {
    if (count < 10) {
      return;
    }
    setCount(prev => prev - 10);
    setRectangles(prev => [...prev, { name: 'foo' }]);
    setRectanglesPts(prev => prev + 3);
  };

  const buyRectangle3 = () => {
    if (count < 20) {
      return;
    }
    setCount(prev => prev - 20);
    setRectangles(prev => [...prev, { name: 'bar' }]);
    setRectanglesPts(prev => prev + 8);
  };

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCount(prev => prev + rectanglesPts);
    }, 1000);
    // Cleanup the interval on component unmount or when dependencies change
    return () => clearInterval(intervalId.current);
  }, [rectanglesPts]);

  /*
    cost        gives
og  5 blue      1
foo 10 black    3
bar 20 yellow   8
  */

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
        <div>Points added each second: {rectanglesPts}</div>
        <button onClick={buyRectangle}>Make rectangle</button>
        <button onClick={buyRectangle2}>Make rectangle</button>
        <button onClick={buyRectangle3}>Make rectangle</button>
        {rectangles.map((cur, i) => (
          <div key={i} className={cur.name}></div>
        ))}
      </div>
    </>
  );
}

export default App;
