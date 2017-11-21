import React from 'react';

class Clients_manager extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      clients_list:[],
      current_client:{},

    }
  }

  render(){
    return(
      <div>
        Clients
      </div>
    )
  }
}
export default Clients_manager