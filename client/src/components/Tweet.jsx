import React, {useState} from 'react'
import Axios from 'axios';
import Web3 from 'web3';


export const Tweet = () => {
    const url = "/twitter/message"
    const [data, setdata] = useState({
    name: "",
    address: "",
    })

    function submit(e){
        e.preventDefault();
        Axios.post(url,{
        name: data.name,
        address: addressCon
        })
        .then(res=>{
        console.log(res,data)
        setResponse(res,data)
        })
    }

    function handle(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setdata(newdata)
        console.log(newdata)
    }

    const [addressCon, setAddy] = useState(0);

    async function connectwallet() { 
        if (window.ethereum) { 
          var web3 = new Web3(window.ethereum); 
          await window.ethereum.send('eth_requestAccounts'); 
          var accounts = await web3.eth.getAccounts(); 
          setAddy(accounts[0])
        }
    }

    const [response, setResponse] = useState(0);
    

    return (
      <div class="card" id="tweetArea">
        <form onSubmit={(e)=> submit(e)}>
          <input style={{width:"100%"}} onChange={(e)=>{handle(e);connectwallet()}} id="name" value={data.name} placeholder="Tweet" type="text"></input>
          <button style={{float: "right"}}>Tweet</button>
          {response.data}
        </form>
      </div>
    )
}