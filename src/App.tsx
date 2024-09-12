import { useState, useRef, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [rectangles, setRectangles] = useState([]);
  const intervalId = useRef<any>(null); //cleanup
  const [rectanglesPts, setRectanglesPts] = useState(0);
  const [moreButtons, setMoreButtons] = useState([]);

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

  const buyRectangleTakesInput = input => {
    console.log('🚀 ~ buyRectangleTakesInput ~ input:', input);
    if (count < input.cost) {
      return;
    }
    setCount(prev => prev - input.cost);
    setRectangles(prev => [...prev, { name: 'bar', color: input.color }]);
    setRectanglesPts(prev => prev + input.rate);
  };

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCount(prev => prev + rectanglesPts);
    }, 1000);
    // Cleanup the interval on component unmount or when dependencies change
    return () => clearInterval(intervalId.current);
  }, [rectanglesPts, moreButtons.length]);

  /*
    cost        gives
og  5 blue      1
foo 10 black    3
bar 20 yellow   8
  */
  const [formData, setFormData] = useState({
    rate: '',
    cost: '',
    color: '',
    name: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setMoreButtons(prev => [
      ...prev,
      {
        ...formData,
        rate: parseInt(formData.rate),
        cost: parseInt(formData.cost)
      }
    ]);
  };

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

        <form onSubmit={handleSubmit}>
          <div>
            <label>Rate: </label>
            <input
              type='number'
              name='rate'
              value={formData.rate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Cost: </label>
            <input
              type='number'
              name='cost'
              value={formData.cost}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Color: </label>
            <input
              type='text'
              name='color'
              value={formData.color}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Name: </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <button type='submit'>Submit</button>
        </form>

        <div>Times clicked: {count}</div>
        <div>Points added each second: {rectanglesPts}</div>
        <button onClick={buyRectangle}>Make rectangle</button>
        <button onClick={buyRectangle2}>Make rectangle</button>
        <button onClick={buyRectangle3}>Make rectangle</button>
        {moreButtons.map(button => {
          const { rate, cost, color, name } = button;
          return (
            <button onClick={() => buyRectangleTakesInput(button)}>
              {name}
            </button>
          );
        })}
        {rectangles.map((rectangle, i) => (
          <div
            key={i}
            className={rectangle.name}
            style={{ backgroundColor: rectangle.color }}
          >
            {rectangle.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
