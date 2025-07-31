     
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import VotingContract from "../build/contracts/Voting.json";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [electionName, setElectionName] = useState("");
  

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VotingContract.networks[networkId];
      const contractInstance = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      setContract(contractInstance);

      const name = await contractInstance.methods.electionName().call();
      setElectionName(name);

      const candidatesCount = await contractInstance.methods
        .candidatesCount()
        .call();

      let candidateList = [];
      for (let i = 1; i <= candidatesCount; i++) {
        const candidate = await contractInstance.methods.candidates(i).call();
        candidateList.push(candidate);
      }
      setCandidates(candidateList);
    };

    init();
  }, []);

  const vote = async (candidateId) => {
    await contract.methods.vote(candidateId).send({ from: account });
    alert("Vote cast successfully!");
  };

  return (
    <div>
      <h1>{electionName}</h1>
      <p>Connected Account: {account}</p>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            {candidate.name} - {candidate.voteCount} votes
            <button onClick={() => vote(candidate.id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
