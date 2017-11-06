import React from 'react';

let styles = {
  please_select_script:{
    margin:'10px',
    padding:'10px',
    border:'2px solid mistyrose',
    fontSize:'50px',
    position:'absolute',
    right:'50%'
  }
}

class Please_choose_script extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }
  }

  render(){
    return(
      <div style={styles.please_select_script}>
        <p>Please select a script</p>
        <p>Or, Create a new one</p>
      </div>
    )
  }
}
export default Please_choose_script