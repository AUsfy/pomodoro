import React, {useState, useEffect, useRef} from 'react'
import Timer from './Timer'

export default function App(){
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  useEffect(()=>{ document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('theme', theme); },[theme])

  return (
    <div className="app">
      <header className="header">
        <h1>Pomofocus Clone</h1>
        <div className="theme">
          <button onClick={()=>setTheme(t=>t==='dark'?'light':'dark')}>Toggle theme</button>
        </div>
      </header>
      <main>
        <Timer />
      </main>
      <footer className="footer">Built with ❤️ — React + Vite — SEO friendly</footer>
    </div>
  )
}
