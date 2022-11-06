import './App.css'
import React, { useEffect, useState } from 'react'
import {initPubSub, subscribe} from "warp-contracts-pubsub";

initPubSub()

function App() {
  const [received, setReceived] = useState(null)

  //Define the channel name here
  let channel = '5Yt1IujBmOm1LSux9KDUTjCE7rJqepzP7gZKf_DyzWI'

  useEffect(() => {
    async function doSubscribe() {
      const subscription = await subscribe(channel, ({ data }) => setReceived(data), console.error)
      console.log(subscription);
    }
    doSubscribe();
    // return () => subscription.unsubscribe()
  }, [channel])

  //Display pushed data on browser
  return (
    <div className="App">
      <header className="App-header">
        <p>Subscribed/Listening to channel "{channel}"...</p>
        <pre>{JSON.stringify(JSON.parse(received), null, 2)}</pre>
      </header>
    </div>
  )
}

export default App