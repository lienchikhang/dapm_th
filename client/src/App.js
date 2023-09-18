import logo from './logo.svg';
import './App.css';

function App() {
  const fetchData = async () => {
    const data = await fetch('http://localhost:5000/api/users')
    const result = data.json();
    return result;
  }
  fetchData()
  .then((res) => {
    console.log(res)
  })
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
