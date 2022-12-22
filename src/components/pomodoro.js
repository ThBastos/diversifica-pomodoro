import React from 'react'

function Pomodoro({timer, initTimer, resetTimer, timerActive, textIniciar, textMinutes, setTextMinutes, stopAndReset}) {

  const handleChange = event => {
    stopAndReset()
    const min = 1
    const max = 60
    const value = Math.max(min, Math.min(max, Number(event.target.value)))
    setTextMinutes(value)
  };

  return (
    <div>
      <div className='container'>
        <h1>Pomodoro Timer</h1>
        <div className="top">
          <p>Vou focar durante </p>
          <input 
            type="number"
            maxLength="60" 
            value={textMinutes} 
            onChange={handleChange}
          />
          <p>minutos</p>
        </div>
        <div className='timerPomo'>{timer}</div>
        <div className='flexButtons'>
          <button className={timerActive ? "buttonActive" : ""} onClick={initTimer}>{textIniciar}</button>
          <button onClick={resetTimer}>Resetar</button>
        </div>
      </div>
      <div className="shape-divider shape-divider-bottom">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 2000 245" preserveAspectRatio="xMinYMin">
          <path fill="#FFF" opacity="0.5" d="M2028.47,246.15v-39.09C1945.6,199.68,1869.96,195.8,1803,194c-71.99-1.93-137.53-4.37-225,1
                                  c-88.04,5.4-120.19,13.36-233,19c-55.14,2.76-102.19,5-165,3c-37.5-1.2-102.55-4.6-200-19c-89.42-13.21-145.61-26.73-276-57
                                  C520.19,98.33,428.29,76.99,402,72C243.75,41.93,118.41,28.67,37,22c-26.77-2.19-49.49-3.73-66.33-4.77v229.03h2057.82
                                  C2028.48,246.22,2028.47,246.19,2028.47,246.15z"></path>
          <path fill="#FFF" d="M1816,212c-58.78-4.11-116.63-8.07-195-9c-43.43-0.51-105.81-1.13-187,4c-33.73,2.13-29.27,2.64-127,10
                                c-86.52,6.52-110.13,7.64-137,8c-11.31,0.15-53.81,0.58-110-3c-54.49-3.47-108.08-9.83-185-23c-69.21-11.85-114.89-21.96-202-41
                                c-262.93-57.46-291.75-62.62-318-67C229.24,70,155.97,65.58,121,64C60.05,61.24,8.67,62.27-28.77,63.95v187.41H2028V232
                            C1943.49,221.98,1871.42,215.88,1816,212z"></path>
        </svg>
      </div>
    </div>
  )
}
export default Pomodoro