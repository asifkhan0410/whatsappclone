import React from 'react'
import './Chathome.css'
import ComputerIcon from '@material-ui/icons/Computer';

function Chathome() {
    return (
        <div className="chathome">
            <img className= "chathome_image" src= "https://web.whatsapp.com/img/intro-connection-light_c98cc75f2aa905314d74375a975d2cf2.jpg" alt=""/>  
            <h1>Keep your phone connected</h1>
            <p>WhatsApp connects to your phone to sync messages. To reduce data usage, connect your phone to Wi-Fi.</p>
            <div className="chathome_lowertext">
            <ComputerIcon/><p>WhatsApp is available for windows. <span>Get it here</span></p>  
            </div>        
        </div>
    )
}

export default Chathome
