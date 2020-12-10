import React, { useState } from 'react';


import "./App.css"

// Components:
import Input from "./Components/Input"
import Output from "./Components/Output"

interface Props {
  
}

const App = (props: Props) => {
  const [showInput,setShowInput] = useState<Boolean>(true);
  const [showOutput,setShowOutput] = useState<boolean>(false);
  return (
    <div>
      {showInput ? <Input /> :<div />}
      {showOutput ? <Output /> : <div />}
    </div>
  )
}

export default App
