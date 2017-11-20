import React from 'react';
import { Row, Col, Button} from 'react-bootstrap';

let styles = {
  step_div:{
    height:'100px',
    border:'1px solid black',
    whiteSpace: 'pre-wrap'
  },

}

class Script_layout extends React.Component{
  constructor(props) {
    super(props);
    this.state={
 

    }
  }

  componentWillMount(){
   

  }


  next_step_btn(key){
    return (
      <Button
        data-key={key}
        className='next_step_btn'
        bsStyle="success" bsSize="large"
        value="Next"
        onClick={()=> {console.log('click')}}>
        Next
      </Button>
    )
  }

  make_script_structure(){
    let rows = []
    let styles_for_selected={
      // filter:'drop-shadow(5px 5px 10px black)',
      boxShadow:'5px 5px 10px black',
      height:'200px'
      // fontSize:'em',
      // textShadow: '1px 1px 1px #000, 3px 3px 5px white'


    }
    let data = this.props.script_data
    console.log(data)
    data.forEach((i, key)=>{

      let selected = {}
      let text_box= i.title+'\n'+i.text
      if(i.title === this.props.step) {
        let NextButton = this.next_step_btn(key)

        selected =styles_for_selected
        text_box = (
          <div style={{position:'relative'}}>
          <textarea 
            data-isselected={true}
            autoFocus
            onChange={this.props.handle_step_text_box_input} 
            value={i.text}
            id='text_area' 
            placeholder={this.props.step}>
          </textarea>
          {NextButton}
          </div>

        )
      }
      let row = (
        <Row key={key} data-step-key={key} ref={row} onClick={this.props.set_step} data-step={i.title}>
          <div  
            style={{...styles.step_div, border:'1px solid '+i.color, ...selected}} 
            data-step={i.title}
            className='div_step'>
              
            
            {text_box}
          </div>
        </Row>
      )
      rows.push(row)
    })
    return rows

  }

  render(){
    console.log('rendering script_layout')
    return(
        <Row>
          <Col xs={12}>
            <div>
              {this.make_script_structure()}
            </div>
          </Col>
        </Row>
    )
  }
}
export default Script_layout


