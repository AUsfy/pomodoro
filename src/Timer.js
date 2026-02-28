import React, {useState, useEffect, useRef} from 'react'

function formatTime(s){ const mm = Math.floor(s/60).toString().padStart(2,'0'); const ss = (s%60).toString().padStart(2,'0'); return `${mm}:${ss}` }

export default function Timer(){
  const [focus, setFocus] = useState(25*60)
  const [breakShort, setBreakShort] = useState(5*60)
  const [breakLong, setBreakLong] = useState(15*60)
  const [mode, setMode] = useState('focus')
  const [running, setRunning] = useState(false)
  const [remaining, setRemaining] = useState(focus)
  const intervalRef = useRef(null)

  useEffect(()=>{ setRemaining(mode==='focus'?focus:(mode==='breakShort'?breakShort:breakLong)) },[focus,breakShort,breakLong,mode])

  useEffect(()=>{
    if(running){
      intervalRef.current = setInterval(()=>{
        setRemaining(r=>{
          if(r<=1){
            clearInterval(intervalRef.current)
            setRunning(false)
            // auto switch
            if(mode==='focus') setMode('breakShort'); else setMode('focus')
            return 0
          }
          return r-1
        })
      },1000)
    }
    return ()=> clearInterval(intervalRef.current)
  },[running,mode])

  function startPause(){ setRunning(r=>!r) }
  function reset(){ setRunning(false); setRemaining(mode==='focus'?focus:(mode==='breakShort'?breakShort:breakLong)) }

  return (
    <div className="timer">
      <div className="modes">
        <button className={mode==='focus'? 'active':''} onClick={()=>setMode('focus')}>Focus</button>
        <button className={mode==='breakShort'? 'active':''} onClick={()=>setMode('breakShort')}>Short Break</button>
        <button className={mode==='breakLong'? 'active':''} onClick={()=>setMode('breakLong')}>Long Break</button>
      </div>
      <div className="display">
        <div className="time">{formatTime(remaining)}</div>
        <div className="controls">
          <button onClick={startPause}>{running? 'Pause' : 'Start'}</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  )
}
