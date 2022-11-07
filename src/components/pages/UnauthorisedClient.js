import React from 'react'

const UnauthorisedClient = () => {
  return (
    <div style={"align:center"}>
      <h1>Unauthorised for Worker</h1>
      <h2>This page is only accessable to worker.</h2>
      <h2>If you are a client, this page is Unauthorised and please check Book Service Page.</h2>
    </div>
  )
}
export default UnauthorisedClient;