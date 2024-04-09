import './control.css';
import { useDispatch, useSelector } from 'react-redux';
import { endGame, startGame, undoMove, setAiFirst, setDepth, setIndex } from '../store/gameSlice';
import { board_size } from '../config';
import { STATUS } from '../status';
import { useCallback } from 'react';
import { Button, Switch, Select } from 'antd';

function Control() {
  const dispatch = useDispatch();
  const { loading, winner, status, history, aiFirst, depth, index, score, path, currentDepth } = useSelector((state) => state.game);
  const start = useCallback(() => {
    dispatch(startGame({board_size, aiFirst, depth}));
  }, [dispatch, board_size, aiFirst, depth]);
  const end = useCallback(() => {
    dispatch(endGame());
  }, [dispatch]);
  const undo = useCallback(() => {
    dispatch(undoMove());
  }, [dispatch]);
  const onFirstChange = useCallback((checked) => {
    dispatch(setAiFirst(checked));
  }, [dispatch]);
  const onDepthChange = useCallback((value) => {
    dispatch(setDepth(value));
  }, [dispatch]);
  const onIndexChange = useCallback((checked) => {
    dispatch(setIndex(checked));
  }, [dispatch]);
  return (
    <div className="controle">
      <div className="buttons">
        <Button className="button" type="primary" onClick={start} disabled={loading || status !== STATUS.ONLINE}>Start</Button>
        <Button className="button" type="primary" onClick={undo} disabled={loading || status !== STATUS.GAMING || history.length === 0}>Retract</Button>
        <Button className="button" type="primary" onClick={end} disabled={loading || status !== STATUS.GAMING}>Resign</Button>
      </div>
      <div className="status">
        <div className="status-item">position: {JSON.stringify(path)}</div>
        <div className="status-item">placing history: {JSON.stringify(history.map(h => [h.i, h.j]))}</div>
        <div className="status-item">Black player score: {score.black}</div>
        <div className="status-item">White player score: {score.white}</div>
      </div>
    </div>
  );
}

export default Control;