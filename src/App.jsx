
import Die from "./Die.jsx"
import {useState} from "react"
import {useEffect} from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {

  const [dieNum, setDieNum]= useState(allNewDice())

  const [tenzies, setTenzies] = useState(false)


  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

  function allNewDice(){
    const randomNumberArray = []
    for (let i=0;i<10; i++){
      randomNumberArray.push(generateNewDie())
    }
    return randomNumberArray
  }



  function holdDice(id){
    setDieNum(prevDieNum =>prevDieNum.map(eachDie=>{
      return eachDie.id=== id?
        {...eachDie,isHeld:!eachDie.isHeld}:
        eachDie
    })
    
    )}




  function rollDice(){
    if(tenzies){
      setDieNum(allNewDice())
      setTenzies(false)
      
    }else{
    setDieNum(prevDice =>prevDice.map(eachDie=>{
      return eachDie.isHeld?
      eachDie:
      generateNewDie()
    })
    )
  }
  }
  


  const dieValue = dieNum.map(dieObject=><Die dievalue={dieObject} 
    handelClick={() => holdDice(dieObject.id)}
    key={dieObject.id}
    />
    )




  useEffect(()=>{
    const allHeld = dieNum.every(die => die.isHeld)
    const firstValue = dieNum[0].value
    const allSameValue = dieNum.every(die => die.value===firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
  }} , [dieNum])


  return (
    <>
      <main>
        {tenzies?<Confetti />:""}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {dieValue}
        </div>
        <button className ="roll-dice" onClick={rollDice}>{tenzies?"New Game":"Roll"}</button>
      </main>
    </>
  )
}

export default App
