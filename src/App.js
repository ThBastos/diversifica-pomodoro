import React, { useState, useRef, useEffect, useMemo } from 'react'
import Pomodoro from './components/pomodoro';

function App() {

  const Ref = useRef(null);
  const [timer, setTimer] = useState('25:00');
  const [timerActive, setTimerActive] = useState(false);
  const [timerEnd, setTimerEnd] = useState();
  const [textIniciar, setTextIniciar] = useState('Iniciar');
  const [textMinutes, setTextMinutes] = useState('25');

  const audioClick = useMemo(() => new Audio('https://thbastos.github.io/diversifica-pomodoro/click.mp3'), []);
  const audioDingDong = useMemo(() => new Audio('https://thbastos.github.io/diversifica-pomodoro/ding-dong.mp3'), []);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
        total, minutes, seconds
    };
  }

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds))
    }
  }

  const initTimer = (e) => {
    audioClick.play();
    if(textIniciar === 'Iniciar' || textIniciar === 'Retomar'){
      setTextIniciar('Parar');
      setTimerActive(true);
      clearTimer(getDeadTime());
    } else {
      setTextIniciar('Retomar')
      setTimerActive(false)
      const diferenca = Date.parse(timerEnd) - Date.parse(new Date())
      const seconds = Math.floor((diferenca / 1000) % 60)
      const minutes = Math.floor((diferenca / 1000 / 60) % 60)
      setTimer((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds))
      if (Ref.current) clearInterval(Ref.current)
    }
  }

  const clearTimer = (e) => {
    if(textIniciar === 'Iniciar'){
      if (Ref.current) clearInterval(Ref.current)
    }
    const id = setInterval(() => {
        setTimerEnd(e)
        startTimer(e)
        const diferenca = Date.parse(e) - Date.parse(new Date())
        const seconds = Math.floor((diferenca / 1000) % 60)
        const minutes = Math.floor((diferenca / 1000 / 60) % 60)
        document.title = minutes+':'+seconds+' Pomodoro Timer - Otimize seu tempo';
        if(Date.parse(new Date()) === Date.parse(e)){
          if (Ref.current) clearInterval(Ref.current)
          setTimer((textMinutes > 9 ? textMinutes : '0' + textMinutes) + ':00')
          setTimerActive(false)
          setTextIniciar('Iniciar')
          audioDingDong.play()
        }
    }, 1000)
    Ref.current = id
  }

  const getDeadTime = () => {
    let deadline = new Date()
    deadline.setMinutes(deadline.getMinutes() + parseInt(textMinutes))
    deadline.setSeconds(deadline.getSeconds() + 0)
    return deadline
  }

  useEffect(() => {
    setTimer((textMinutes > 9 ? textMinutes : '0' + textMinutes) + ':00')
  }, [textMinutes]);

  const resetTimer = () => {
    setTimerActive(false)
    setTimer((textMinutes > 9 ? textMinutes : '0' + textMinutes) + ':00')
    setTextIniciar('Iniciar');
    document.title = 'Pomodoro Timer - Otimize seu tempo';
    if (Ref.current) clearInterval(Ref.current)
  }

  const stopAndReset = () => {
    if (Ref.current) clearInterval(Ref.current)
    setTimerActive(false)
    setTimer((textMinutes > 9 ? textMinutes : '0' + textMinutes) + ':00')
    setTextIniciar('Iniciar');
    document.title = 'Pomodoro Timer - Otimize seu tempo';
  }

  return (
    <div className="App">
      <Pomodoro
        timer={timer} 
        initTimer={initTimer}
        resetTimer={resetTimer}
        timerActive={timerActive}
        textIniciar={textIniciar}
        textMinutes={textMinutes}
        setTextMinutes={setTextMinutes}
        stopAndReset={stopAndReset}
      />
    </div>
  );
}

export default App;
