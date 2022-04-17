import React from 'react'
import './style.css'

const LoadingButton = () => {
    return (
        <button className="loading__button">
           <span><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></span> 
        </button>
    )
}

export default LoadingButton
