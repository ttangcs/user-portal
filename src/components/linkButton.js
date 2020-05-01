import React from 'react'
import { Link } from "react-router-dom"
import { ButtonToolbar, Button } from "react-bootstrap"

const LinkButton = ({ label, to }) => {
  return(
    <ButtonToolbar>
      <Link to={to}><Button variant="dark">{label}</Button></Link>
    </ButtonToolbar>
    
  )
}

export default LinkButton