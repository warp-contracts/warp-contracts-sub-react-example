import './App.css'
import React, { useEffect, useState } from 'react'
import {initPubSub, subscribe} from "warp-contracts-pubsub";

initPubSub()

function App() {
  const [received, setReceived] = useState(null)
  const [subscription, setSubscription] = useState(null);

  //Define the channel name here
  let channel = 'states/DRE-BAZAR-1/KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw'

  useEffect(() => {
    async function doSubscribe() {
      const subscription = await subscribe(
        channel,
        ({ data }) => {
          setReceived(data);
          if (subscription) {
            subscription.unsubscribe()
          }
        },
        console.error
      );

      setSubscription(subscription);
    }
    doSubscribe();
  }, []);


  //Display pushed data on browser
  return (
    <div className="App">
      <header className="App-header">
        <p>Subscribed to channel "{channel}"...</p>
        <pre>{JSON.stringify(JSON.parse(received), null, 2)}</pre>
      </header>
    </div>
  )
}

export default App