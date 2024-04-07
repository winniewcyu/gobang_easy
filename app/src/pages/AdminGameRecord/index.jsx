import React from 'react';

class AdminGameRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {result: [] };
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8080/top5user', {
      method: 'GET',
    });
    const resultPage = await response.text();
    const result = resultPage.split("\n");
    this.setState({ result: result })
    };

    render() {
      const timestamp = Date.now();
      const date = new Date(timestamp);
      const humanReadableDate = date.toLocaleString();
        return(
        <>
        <ul style={{textAlign:"center"}}><a href="/admin" class="btn btn-primary">Back to Home</a></ul>
        <div class="container p-5 my-5 border" style={{textAlign:"center"}}>
        <h1>Leaderboard (Top 5): </h1>
        <h4>Update at: {humanReadableDate}</h4>
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
                  <td>{this.state.result[0]}</td>
                  <td>{this.state.result[1]}</td>
                </tr>
                <tr>
                <td>{this.state.result[2]}</td>
                  <td>{this.state.result[3]}</td>
                </tr>
                <tr>
                <td>{this.state.result[4]}</td>
                  <td>{this.state.result[5]}</td>
                </tr>
                <tr>
                <td>{this.state.result[6]}</td>
                  <td>{this.state.result[7]}</td>
                </tr>
                <tr>
                <td>{this.state.result[8]}</td>
                  <td>{this.state.result[9]}</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
        
        </>
        );
    }
}
export default AdminGameRecord;