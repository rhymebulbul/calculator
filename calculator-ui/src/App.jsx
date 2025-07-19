import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calculator from './Calculator';

function Filler() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 text-gray-400 text-lg select-none">
      <div className="mb-4">Welcome to your portfolio calculator app!</div>
      <div className="mb-4">Resize the window to see dynamic filler text.</div>
      <div className="mb-4">This space can be used for tips, history, or extra features.</div>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-200 to-gray-400">
      <Filler />
      <div className="flex justify-center items-center flex-1">
        <Calculator />
      </div>
      <Filler />
    </div>
  )
}

export default App
