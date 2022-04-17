import React,{useState} from 'react'
import { RocketFilled } from '@ant-design/icons'
import './style.css'

const Scroll = () => {
    const [scroll, setScroll] = useState("scroll__ctive")
window.addEventListener("scroll", () =>{
  if(window.scrollY >500){
    setScroll("scroll")
  }
  else{
    setScroll("scroll__ctive")
  }
})
const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }
    return (
        <div onClick={scrollTop}  className={scroll}>
        <RocketFilled className="scroll__top" />
      </div>
    )
}

export default Scroll
