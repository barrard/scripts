import React from 'react';
import { Button} from 'react-bootstrap';

let styles = {
  nice_input:{
    fontSize:'15px'
  }
}

class Client_response_options extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      step:'',
    }
  }


  render(){
    return(
      
        <div>
          <h3>Client Response to {this.props.step}</h3>
          <input 
            onChange={this.client_response_change}
            style={styles.nice_input}
            type='text' 
            name='client_response' 
            value={this.state.client_response}
            placeholder='add a possible client response ot this question'
          />
          <Button 
            style={styles.wide_button}
            active
            bsStyle="success" bsSize="large" 
            onClick={this.add_client_response}>Add Response/Answer
          </Button>
          <ul>
            <li>hi</li>
            <li>hi</li>
            <li>hi</li>
          </ul>
        </div>
    )
  }
}
export default Client_response_options