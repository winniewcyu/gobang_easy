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