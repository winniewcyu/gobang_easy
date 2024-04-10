import './control.css';
import { useDispatch, useSelector } from 'react-redux';
import { endGame, startGame, undoMove, setAiFirst, setDepth, setIndex } from '../store/gameSlice';
import { board_size } from '../config';
import { STATUS } from '../status';
import { useCallback, useState, useEffect } from 'react';
import { Button, Switch, Select } from 'antd';

function Control() {
  const dispatch = useDispatch();
  const [playerChoice, setPlayerChoice] = useState(null);
  const { loading, winner, status, history, aiFirst, depth, index, score, path, currentDepth } = useSelector((state) => state.game);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [mainTime, setMainTime] = useState(20 * 60 * 1000); // 20 minutes in milliseconds
  const [elegantTime, setElegantTime] = useState(30 * 1000); // 30 seconds in milliseconds
  const [isElegantTime, setIsElegantTime] = useState(false);
  // Add a new state variable for the current move time
  const [currentMoveTime, setCurrentMoveTime] = useState(elegantTime);

  // Determine the current player and its stone type
  const currentPlayer = history.length % 2 === 0 ? 'Black' : 'White';
  const stoneType = currentPlayer === 'Black' ? 'black stones' : 'white stones';
  
  // Update the start time and elapsed time
  useEffect(() => {
    if (status === STATUS.GAMING && startTime === null) {
      setStartTime(Date.now());
    } else if (status !== STATUS.GAMING) {
      setStartTime(null);
      setMainTime(20 * 60 * 1000);
      setElegantTime(30 * 1000);
      setIsElegantTime(false);
      setCurrentMoveTime(elegantTime);
    } else {
      const interval = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTime;
        setElapsedTime(elapsed); // Update the elapsed time
        if (elapsed > mainTime && !isElegantTime) {
          setIsElegantTime(true);
          setCurrentMoveTime(elegantTime);
        }
        if (isElegantTime) {
          setElegantTime(prevElegantTime => prevElegantTime - 1000);
          setCurrentMoveTime(prevTime => prevTime - 1000);
        } else {
          setMainTime(prevMainTime => prevMainTime - 1000);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status, startTime, mainTime, elegantTime, isElegantTime, history.length, currentMoveTime]);
  

  // Convert the elapsed time to a readable format
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Convert the current move time to a readable format
  const currentMoveSeconds = Math.floor((currentMoveTime / 1000) % 60);
  const currentMoveMinutes = Math.floor((currentMoveTime / (1000 * 60)) % 60);
  const formattedMoveTime = `${currentMoveMinutes.toString().padStart(2, '0')}:${currentMoveSeconds.toString().padStart(2, '0')}`;

  const start = useCallback(() => {
    dispatch(startGame({ board_size, aiFirst, depth }));
  }, [dispatch, board_size, aiFirst, depth]);
  const end = useCallback(() => {
    setPlayerChoice(null);
    dispatch(endGame());
  }, [dispatch]);
  const undo = useCallback(() => {
    if (history.length === 0) {
      dispatch(setAiFirst(!aiFirst));
      dispatch(setDepth(depth));
      dispatch(startGame({ board_size, aiFirst: !aiFirst, depth }));
    } else if (history.length === 1 && aiFirst && playerChoice === false) {
      dispatch(setAiFirst(aiFirst));
    } else {
      dispatch(undoMove());
    }
  }, [dispatch, board_size, aiFirst, depth, history.length, playerChoice]);
  const chooseBlack = useCallback(() => {
    setPlayerChoice(true);
    dispatch(startGame({ board_size, aiFirst: false, depth }));
  }, [dispatch, board_size, depth]);
  const chooseWhite = useCallback(() => {
    setPlayerChoice(false);
    dispatch(startGame({ board_size, aiFirst: true, depth }));
  }, [dispatch, board_size, depth]);
  const onDepthChange = useCallback((value) => {
    dispatch(setDepth(value));
  }, [dispatch]);
  const onIndexChange = useCallback((checked) => {
    dispatch(setIndex(checked));
  }, [dispatch]);

  useEffect(() => {
    if (playerChoice !== null) {
      dispatch(startGame({ board_size, aiFirst: !playerChoice, depth }));
    }
  }, [dispatch, board_size, playerChoice, depth]);

  const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
  const reportedTime = startTime ? new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(startTime)) : 'N/A';

  const showStartButtons = status === STATUS.ONLINE || status === STATUS.OVER;
  const showRetractAndResign = playerChoice !== null && status === STATUS.GAMING;
return (
  <div className="control">
    <div className="buttons">
      {showStartButtons && (
        <>
          <Button
            className="button"
            type="primary"
            onClick={chooseBlack}
            disabled={loading || status !== STATUS.ONLINE}
          >
            Start as Black
          </Button>
          <Button
            className="button"
            type="primary"
            onClick={chooseWhite}
            disabled={loading || status !== STATUS.ONLINE}
          >
            Start as White
          </Button>
        </>
      )}
      {showRetractAndResign && (
        <>
          <Button
            className="button"
            type="primary"
            onClick={undo}
            disabled={loading || status !== STATUS.GAMING || history.length === 0}
          >
            Retract
          </Button>
          <Button
            className="button"
            type="primary"
            onClick={end}
            disabled={loading || status !== STATUS.GAMING}
          >
            Resign
          </Button>
        </>
      )}
    </div>
    <div className="game-info">
      <div>Current Player: {currentPlayer} ({stoneType})</div>
      <div>Start Time: {reportedTime}</div>
      <div>Main Time Left: {isElegantTime ? '00:00' : Math.floor(mainTime / 1000)} seconds</div>
      <div>Time for Current Move: {formattedMoveTime} </div>
      <div>Elapsed Time: {formattedTime} </div>
      <div></div>
    </div>
    <div className="status">
      <div className="status-item">position: {JSON.stringify(path[0])}</div>
      <div className="status-item">placing history: {JSON.stringify(history.map((h) => [h.i, h.j]))}</div>
      <div className="status-item">Black player score: {score.black}</div>
      <div className="status-item">White player score: {score.white}</div>
    </div>
  </div>
);
}

export default Control;
