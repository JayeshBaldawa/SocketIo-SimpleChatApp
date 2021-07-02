import './App.css';
import {useState, useEffect} from 'react';
import {io} from 'socket.io-client';

// no dotenv
const socket = io.connect("http://localhost:5000")


function App() {

  const [message,setMessage] = useState('')
  const [chat,setChat] = useState([])

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat",{message});
    setMessage('')
  }

  useEffect(() => {
    socket.on("chat", (payload)=>{
      setChat([...chat,payload]);
    })
  })

  return (
    <div className="App">
      <header className="App-header">
       <h1>Chatty App</h1>
       {chat.map((payload,index) =>
       {
          return <div><p key={index}>{payload.message}</p></div>
       })}
       <form onSubmit={sendChat}>
         <input type="text" name="chat" 
         placeholder="Send a message" 
         value={message}
         onChange={(e)=> {
           setMessage(e.target.value)
         }}/>
         <button variant="primary" type="submit">Send</button>
       </form>
      </header>
    </div>
  );
}

export default App;
