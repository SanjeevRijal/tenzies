import React from 'react'


function Die(props){
    const styles = {
        backgroundColor:props.dievalue.isHeld?"#59E391" : "white"
    }


    return(
    < div className = "die-face" style ={styles} 
        onClick={props.handelClick}
    >
       <h2 className = "die-num"> {props.dievalue.value}</h2>
    </div>
    )
}

export default Die