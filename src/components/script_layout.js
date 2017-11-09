import React from 'react';
import { Row, Col} from 'react-bootstrap';
import Events from './event_emitter.js'

let styles = {
  step_div:{
    height:'150px',
    border:'1px solid black',
    whiteSpace: 'pre-wrap'
  }
}

class Script_layout extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      step:'',
      steps_array:[
        {title:'Intro',
          text:'testing text',
          objections:{
            // 'No':{
            //   1:'Thank you very much, good-bye',
            //   2:'Can we schedule a chat for later?',
            //   3:'you risk missing the boat!, act now!'
            // },
            // 'Yes'
          },
          types:['Gate Keeper', 'Target Prospect'],
          color:'blue'},
        {title:'Grab Attention',
          text:'',
          objections:[],
          types:['Name Drop', 'Product Value'],
          color:'yellow'},
        {title:'Disqualify Statement',
          text:'',
          objections:[],
          types:[],
          color:'yellow'},
        {title:'Qualifying Questions',
          text:'',
          objections:[],
          types:[],
          color:'yellow'},
        {title:'Common Pain Examples',
          text:'',
          objections:[],
          types:[],
          color:'yellow'},
        {title:'Build Interest',
          text:'',
          objections:[],
          types:['Details','ROI','Name drop', 'Treats of non-action'],
          color:'yellow'},
        {title:'Close',
          text:'',
          objections:[],
          types:[],
          color:'red'}]

    }
    this.set_step = this.set_step.bind(this)
  }

  componentWillMount(){
    Events.on('step_input_change', (data)=>{
      console.log(data)
      console.log(this.state.step)
      this.get_text_via_mode(this.state.steps_array, this.state.step, (obj)=>{
        let state = this.state.steps_array
        let index = state.indexOf(obj)
        console.log('obj')
        console.log(obj)
        console.log('index')
        console.log(index)
        obj.text=data

        // this.setState({

        // })
      })
    })
  }

  get_text_via_mode(obj_array, mode, callback){
    console.log('obj_array')
    console.log(obj_array)
    console.log('mode')
    console.log(mode)
    obj_array.filter((obj)=>{
      if(obj.title === mode){
        // console.log(obj)
        // console.log(obj.text)
        let index = obj_array.indexOf(obj)
        callback(obj, index)
      }
      // // console.log(obj.title === mode)
      // return obj.title == mode
    })
  }

  set_step(e){
    console.log(e.target)
    let data={}

    data.mode = e.target.getAttribute('data-step')

    this.get_text_via_mode(this.state.steps_array, data.mode, (obj, index)=>{
      // console.log(obj)
      data.obj = obj
      console.log('emitting set_step')
      Events.emit('set_step', data)
      this.setState({
        step:data.mode
      })


    })

  }

  make_script_structure(){
    let rows = []
    let styles_for_selected={
      // filter:'drop-shadow(5px 5px 10px black)',
      boxShadow:'5px 5px 10px black',
      fontSize:'2em',
      // textShadow: '1px 1px 1px #000, 3px 3px 5px white'


    }
    let data = this.state.steps_array
    data.forEach((i, key)=>{
      let selected = {}
      if(i.title === this.state.step) selected =styles_for_selected
      let row = (
        <Row key={key} onClick={this.set_step} data-step={i.title}>
          <div  style={{...styles.step_div, border:'1px solid '+i.color, ...selected}} data-step={i.title}>
            {i.title}:  
            {i.text}

          </div>
        </Row>
      )
      rows.push(row)
    })
    return rows

  }

  render(){
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


