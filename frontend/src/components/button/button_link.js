import React from 'react'
import {withRouter} from 'react-router-dom'
import {Button} from "reactstrap";

const ButtonLink = (props) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    ...rest
  } = props
  return (
    <Button
      {...rest}
      onClick={(event) => {
        onClick && onClick(event)
        history.push(to)
      }}
    />
  )
}

export default withRouter(ButtonLink)