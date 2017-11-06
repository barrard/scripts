import React from 'react';
import {Glyphicon, Button, Modal, Row, Col} from 'react-bootstrap';
import Events from './event_emitter.js'

let styles = {
  header_container:{
    border:'green solid 1px',
    position:'relative'
  },
  scripts_container:{
    border:'solid 1px blue',
    position:'absolute',
    right:'0',
    height:'5em',
    width:'10em',
    fontSize:'2em',
    overflow:'scroll'
  },
  create_script_btn:{
    position:'absolute',
    bottom:'0',

  }
}

class Header extends React.Component{
	constructor(props) {
		super(props);
		this.state={
      show_modal:true,
      scripts_array:[]
		}
    this.create_new_script = this.create_new_script.bind(this)
    this.add_new_script = this.add_new_script.bind(this)
	}

	componentWillMount() {
		// fetch('/get_script_list').then((resp)=> resp.json())
  //     .then((data)=>{
  //     console.log('got script list?')
  //     console.log(data)
  //     })
  //     .catch((ex)=>{
  //       console.log('err?')
  //       console.log(ex)
  //     })
	}

  add_new_script(){
    console. log()
    let new_script_name = document.getElementById('new_script_name').value
    console.log(new_script_name)
    let payload = {script_name:new_script_name}
    fetch('/add_script',{
      method: "POST",
      body: JSON.stringify( payload ),
      headers: { "Content-Type": "application/json" }

    }).then((data)=>{
      console.log('can i get the id please')
      return data.json()
    }).then((data)=>{
        //add error handle
        if(data.success){
          //get teh last added scrpipt dom element
          Events.emit('add_new_script', {name:new_script_name, dbid:data.success})

        }

    })
  }

  create_new_script(){
    let show = !this.state.show_modal
    this.setState({
      show_modal:show
    })
    document.getElementById('new_script_name').focus()

  }

  emit_clicked_script_item(e){
    let val = e.target.getAttribute('data-val')
    console.log(val)
    Events.emit('set_current_script', val)
  }

  delete_script(e){
    let dbid = e.target.getAttribute('data-dbid')
    let val = e.target.getAttribute('data-val')
    let confirm = window.confirm('Are you sure you want to delete script: '+val)
    if(confirm){
      let scripts_array = this.props.scripts_array
      console.log(scripts_array)
      Events.emit('delete_script', dbid)


    }
  }

  scripts_container(){
    let create_scripts_list = () => {
      if(this.props.scripts_array===undefined) console.log('OH NO UNDEFINED!')
      let items = []
    console.log('lets make some script contianer things')
    console.log(this.props.scripts_array)
      this.props.scripts_array.forEach((item, key)=>{
        // console.log(item)
        items.push(

          <li
            onClick={this.emit_clicked_script_item}
            className='script_list_item'
            count={key}
            key={key}
            data-val={item.name}
            data-dbid={item.dbid}>
            <Button 
              className="details_script_item" 
              bsStyle="info"
              onClick={()=>console.log('hi')}
              data-dbid={item.dbid}>
              <Glyphicon 
                data-dbid={item.dbid}
                glyph="list">
              </Glyphicon>
            </Button>

            {item.name}
            <Button 
              className="delete_script_item" 
              bsStyle="danger"
              onClick={(e)=>this.delete_script(e)}
              data-dbid={item.dbid}>
              <Glyphicon 
                data-dbid={item.dbid}
                glyph="remove">
              </Glyphicon>
            </Button>

          </li>)
      })
      return items
    }

    return(
      <div style = {styles.scripts_container}>
        scripts
        <ul className='script_list_container'>
          {create_scripts_list()}
        </ul>
      </div>
    )
  }

  get_modal(){
    let close = () => this.setState({ show: false });
    let add_script = () => {
      close()
       this.add_new_script()
     }
     let handleKeyPress = (event) => {
       if(event.key === 'Enter'){
         console.log('enter press here! ')
         add_script()
       }
     }
     return (
     <div className="modal-container">

       <Button 
         bsStyle="info" bsSize="large" 
         onClick={() => this.setState({ show: true })}
         >
         Creat new script

       </Button>

       <Modal
         show={this.state.show}
         onHide={close}
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
            autoFocus
            type="text"
            name="new_script_name"
            id="new_script_name"
            onKeyPress={handleKeyPress}
          />
         </Modal.Body>
         <Modal.Footer>
           <Button bsStyle='success' onClick={add_script}>Create</Button>
           <Button bsStyle='danger' onClick={close}>Cancle</Button>
         </Modal.Footer>
       </Modal>
     </div>
   );
  }


  render(){
    let Creat_script_modal = ()=> this.get_modal()
    let Scripts_container = ()=> this.scripts_container()
    console.log('RENDERING HEADER  LETS CHECK THE SCRIPTS')

    return(
      <div style = {styles.header_container}>
      <Row>
        <Col xs={4}>      
          <Creat_script_modal/>
        </Col>

        <Col xs={4}>
          <h1 className="center_text">Sale script creater</h1>
          <h2 className="center_text">{this.props.current_script}</h2>
        </Col>
        <Col xs={4} className="position-relative">
          <Scripts_container />

        </Col>        
      </Row>
      </div>
    )
  }
}
export default Header