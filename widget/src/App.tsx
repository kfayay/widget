import { useState } from 'react';

function App() {
  const [str] = useState('tttt');

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit123111 <code>src/App.tsx</code> and save to reload.123
        </p>
        <p>{str}</p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
