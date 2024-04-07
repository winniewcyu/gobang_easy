class GameRecord extends React.Component {
    render() {
        return(
        <>
        <ul style={{textAlign:"center"}}><a href="/" class="btn btn-primary">Back to Home</a></ul>
        <div class="container p-5 my-5 border" style={{textAlign:"center"}}>
        <h1>Your Gaming Record: </h1>
        <h4>Update at: 31/3/2024, 10:04:40</h4>
        <div class="container mt-3">
            <table class="table">
              <thead class="table-secondary">
                <tr>
                  <th>Date & Time</th>
                  <th>Opponent's Name</th>
                  <th>Winner</th>
                  <th>Records</th>
                  <th>Final Goboard with Stones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1/3/2024, 18:00:42-18:35:56</td>
                  <td>Test01</td>
                  <td>You</td>
                  <td>38 (+20)</td>
                  <td><a href="/gamerecord">Link</a></td>
                </tr>
                <tr>
                <td>7/11/2023, 17:17:19-17:55:45</td>
                <td>Test01</td>
                <td>Test01</td>
                <td>18 (+8)</td>
                <td><a href="/gamerecord">Link</a></td>
                </tr>
                <tr>
                <td>19/11/2022, 08:56:32-09:46:14</td>
                <td>Machine</td>
                <td>Machine</td>
                <td>10 (-5)</td>
                <td><a href="/gamerecord">Link</a></td>
                </tr>
                <tr>
                <td>11/9/2022, 09:44:46-11:45:11</td>
                <td>Test05</td>
                <td>Test05</td>
                  <td>15 (+0)</td>
                  <td><a href="/gamerecord">Link</a></td>
                </tr>
                <tr>
                <td>11/1/2022, 13:11:07-15:14:55</td>
                <td>Test02</td>
                <td>Test02</td>
                  <td>15 (+5)</td>
                  <td><a href="/gamerecord">Link</a></td>
                </tr>
                <tr>
                <td>11/11/2021, 11:36:53-11:58:44</td>
                <td>Test03</td>
                <td>You</td>
                  <td>10 (+10)</td>
                  <td><a href="/gamerecord">Link</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="container p-5 my-5 border" style={{textAlign:"center"}}>
        <h1>Leaderboard (Top 5): </h1>
        <h4>Update at: 31/3/2024, 10:04:40</h4>
        <div class="container mt-3">
            <table class="table">
              <thead class="table-secondary">
                <tr>
                  <th>Player</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Test01</td>
                  <td>130</td>
                </tr>
                <tr>
                <td>Test02</td>
                  <td>128</td>
                </tr>
                <tr>
                <td>Test03</td>
                  <td>69</td>
                </tr>
                <tr>
                <td>You (Test)</td>
                  <td>38</td>
                </tr>
                <tr>
                <td>Test04</td>
                  <td>19</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
        
        </>
        );
    }
}