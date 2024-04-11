import MinmaxWorker from 'worker-loader!./minmax.worker';

const worker = new MinmaxWorker();
export const start = async (board_size, aiFirst, depth) => {
  return new Promise((resolve, reject) => {
    worker.postMessage({
      action: 'start',
      payload: {
        board_size,
        aiFirst,
        depth,
      },
    });
    worker.onmessage = (event) => {
      const { action, payload } = event.data;
      if (action === 'start') {
        resolve(payload);
      }
    };
  })
};

export const move = async (position, depth) => {
  return new Promise((resolve, reject) => {
    worker.postMessage({
      action: 'move',
      payload: {
        position,
        depth,
      },
    });
    worker.onmessage = (event) => {
      const { action, payload } = event.data;
      if (action === 'move') {
        resolve(payload);
      }
    };
  })
};

export const end = async () => {
  return new Promise((resolve, reject) => {
    worker.postMessage({
      action: 'end',
    });
    worker.onmessage = (event) => {
      const { action, payload } = event.data;
      if (action === 'end') {
        // Fetch the required data
        const gameData = payload;

        // Add additional data
        gameData.start_time = Date.now();  // Current time
        gameData.elapsed_time = (Date.now() - gameData.start_time) / 1000;  // Elapsed time in seconds
        gameData.player1 = "Alice";  // Replace with actual player name
        gameData.player2 = "Bob";  // Replace with actual player name

        // Prepare the data to be sent
        const data = {
          winner: gameData.winner,
          player1: gameData.player1,
          player2: gameData.player2,
          last_board: gameData.board,
          start_time: gameData.start_time,
          elapsed_time: gameData.elapsed_time
        };

        // Send a POST request to the server
        fetch('http://localhost:8080/game/ends', { //put your server address here
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(resultpage => {
          resolve(gameData);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    };
  })
};


export const undo = async () => {
  return new Promise((resolve, reject) => {
    worker.postMessage({
      action: 'undo',
    });
    worker.onmessage = (event) => {
      console.log('undo', event);
      const { action, payload } = event.data;
      if (action === 'undo') {
        resolve(payload);
      }
    };
  })
};