import logo from './logo.svg';
import './App.css';
import './web3';
import web3 from './web3';
import React from 'react';
import lottery from './lottery';

class App extends React.Component {
  state = {
    manager: '',
    players: [],
    balance: ''

  };


  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({
      manager: manager,
      players: players,
      balance: balance,
      value: '',
      message: ''
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();


    this.setState({ message: "Your transaction initiated...waiting for the transaction to complete!!" });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: "Transaction Successful!!" });
  }

  onClick = async (e) => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "checking for a winner!!!" });
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });


    this.setState({ message: "Winner has been picked " });
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This Contract is managed by <b>{this.state.manager}</b>.There are currently <b>{this.state.players.length}</b> people entered, competing to win <b>{web3.utils.fromWei(this.state.balance)}</b> ether!</p>
        <hr />
        <h4>Want to try your luck?</h4>
        <form onSubmit={this.onSubmit}>
          <label>Amount to Enter in Ether </label>
          <input value={
            this.state.value}
            onChange={(e) => {
              this.setState({
                value: e.target.value
              })
            }}
          />

          <button>Enter</button>
        </form>



        <hr />
        <h4>Pick a winner!!!</h4>
        <button onClick={this.onClick}>Pick Winner</button>
        <hr />
        <h1>{this.state.message}</h1>
      </div >

    );
  }
}


export default App;
