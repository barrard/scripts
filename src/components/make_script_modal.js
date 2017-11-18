import React from 'react';
import {Button, Modal, Glyphicon} from 'react-bootstrap';

let styles = {
  plus_icon:{
    color:'black',
    paddingLeft:'5px',
    fontSize:'20px',
    textShadow:'0px 0px 1px rgba(222, 222, 222, 1)'
  }
}

class Make_script_modal extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      show:false,
      new_script_name:''

    }
    this.add_script = this.add_script.bind(this)
    this.show = this.show.bind(this)
    this.handle_new_script_change = this.handle_new_script_change.bind(this)
    this.close = this.close.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  show(){
    console.log('SHOW IT')
    this.setState({ show: true })
  }

  handle_new_script_change(e){
    this.setState({
      new_script_name:e.target.value
    })
    // let val = e.target.value
  }

  add_script(){
    let new_script_name = this.state.new_script_name
    if(new_script_name === '' || new_script_name === undefined || new_script_name === null) return
      this.close()
      this.props.add_script(new_script_name)
      this.setState({
        new_script_name:''
      })
   }

  close(){
    this.setState({ show: false });
  }
  handleKeyPress(event){
      if(event.key === 'Enter'){
        console.log('enter press here! ')
        this.add_script()
      }
    }


  render(){

      return (
        <div>
        <Button 
          bsStyle="info" bsSize="large" 
          onClick={this.show}
          >
          Create new script!
          <Glyphicon
            style={styles.plus_icon}
            glyph="file">
          </Glyphicon>

        </Button>
      <div className="modal-container">



        <Modal
          show={this.state.show}
          onHide={this.close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Create New Script</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <label 
             className="labels" 
             htmlFor="new_script_name">
             New script name
          </label>
           <input
             value = {this.state.new_script_name}
             onChange={this.handle_new_script_change}
             autoFocus
             type="text"
             name="new_script_name"
             onKeyPress={this.handleKeyPress}
           />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='success' onClick={this.add_script}>Create</Button>
            <Button bsStyle='danger' onClick={this.close}>Cancle</Button>
          </Modal.Footer>
        </Modal>
      </div>
      </div>
    );
  }
}
export default Make_script_modal