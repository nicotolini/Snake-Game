import React from 'react'
import { Link } from 'react-router-dom';
import "../Screen/start.css";
const Redes = () => {
  return (
    <div className="icon">
        <Link to="https://www.linkedin.com/in/nicol%C3%A1s-tolini-69489925b/" target="_blank"><img src="https://icongr.am/entypo/linkedin-with-circle.svg?size=45&color=ffffff" alt="linkedin" /></Link>
        <Link to="https://github.com/nicotolini" target="_blank"><img src="https://icongr.am/entypo/github-with-circle.svg?size=45&color=ffffff" alt="github" /></Link>
    </div>
  )
}

export default Redes