import React from 'react'

const UnauthorisedClient = () => {
  return (
    <div> 
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <h1 style={{'font-size': '70px'}}>Unauthorised for Client</h1><br/>
      <h2>This page is only accessable to worker.</h2>
      <h2>If you are a client, this page is Unauthorised and please check Book Service Page.</h2>
    </div>
  )
}
export default UnauthorisedClient;