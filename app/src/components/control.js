import './control.css';
import { useDispatch, useSelector } from 'react-redux';
import { endGame, undoMove } from './gameSlice';
import { STATUS } from '../status';
import { useCallback } from 'react';
import { Button } from 'antd';

function Control() {
  const dispatch = useDispatch();
  const { loading, status, history, path, score } = useSelector((state) => state.game);
  const end = useCallback(() => {
    dispatch(endGame());
  }, [dispatch]);
  const undo = useCallback(() => {
    dispatch(undoMove());
  }, [dispatch]);

  return (
    <div className="controle">
      <div className="buttons">
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