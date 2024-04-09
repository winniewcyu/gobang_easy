import Cache from "./cache";
import { FIVE } from "./eval";

const MAX = 1000000000;
export const cache_hits = {
  search: 0,
  total: 0,
  hit: 0
};

const onlyThreeThreshold = 6;
const cache = new Cache(); 

const factory = (onlyThree = false, onlyFour = false) => {
  const helper = (board, role, depth, cDepth = 0, path = [], alpha = -MAX, beta = MAX) => {
    cache_hits.search++;
    if (cDepth >= depth || board.isGameOver()) {
      return [board.evaluate(role), null, [...path]];
    }
    const hash = board.hash();
    const prev = cache.get(hash);
    if (prev && prev.role === role) {
      if ((Math.abs(prev.value) >= FIVE || prev.depth >= depth - cDepth) && prev.onlyThree === onlyThree && prev.onlyFour === onlyFour) 
      {
        cache_hits.hit++;
        return [prev.value, prev.move, [...path, ...prev.path]];
      }
    }
    let value = -MAX;
    let move = null;
    let bestPath = [...path]; // Copy the current path
    let bestDepth = 0;
    let points = board.getValuableMoves(role, cDepth, onlyThree || cDepth > onlyThreeThreshold, onlyFour);
    if (cDepth === 0) {
      console.log('points:', points);
    }
    if (!points.length) {
      return [board.evaluate(role), null, [...path]];
    }
    for (let d = cDepth + 1; d <= depth; d += 1) {
      if (d % 2 !== 0) continue;
      let breakAll = false;
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        board.put(point[0], point[1], role);
        let newPath = [...path, point]; // Add current move to path
        let [currentValue, currentMove, currentPath] = helper(board, -role, d, cDepth + 1, newPath, -beta, -alpha);
        currentValue = -currentValue;
        board.undo();
        if (currentValue >= FIVE || d === depth) {
          if ((currentValue > value) ||
            (currentValue <= -FIVE && value <= -FIVE && currentPath.length > bestDepth)) {
            value = currentValue;
            move = point;
            bestPath = currentPath;
            bestDepth = currentPath.length;
          }
        }
        alpha = Math.max(alpha, value);
        if (alpha >= FIVE) { 
          breakAll = true;
          break;
        }
        if (alpha >= beta) {
          break;
        }
      }
      if (breakAll) {
        break;
      }
    }
    if ((cDepth < onlyThreeThreshold || onlyThree || onlyFour) && (!prev || prev.depth < depth - cDepth)) {
      cache_hits.total += 1;
      cache.put(hash, {
        depth: depth - cDepth, 
        value,
        move,
        role,
        path: bestPath.slice(cDepth), 
        onlyThree,
        onlyFour,
      });
    }
    const res = [value, move, bestPath];
    return res;
  }
  return helper;
}

const _minmax = factory();
export const vct = factory(true);
export const vcf = factory(false, true);

export const minmax = (board, role, depth = 4, enableVCT = true) => {
  if (enableVCT) {
    const vctDepth = depth + 8;
    let [value, move, bestPath] = vct(board, role, vctDepth);
    if (value >= FIVE) {
      return [value, move, bestPath];
    }
    [value, move, bestPath] = _minmax(board, role, depth);
    board.put(move[0], move[1], role);
    let [value2, move2, bestPath2] = vct(board.reverse(), role, vctDepth)
    board.undo();
    if (value < FIVE && value2 === FIVE && bestPath2.length > bestPath.length) {
      let [value3, move3, bestPath3] = vct(board.reverse(), role, vctDepth)
      if (bestPath2.length <= bestPath3.length) {
        return [value, move2, bestPath2];
      }
    }
    return [value, move, bestPath];
  } else {
    return _minmax(board, role, depth);
  }
}