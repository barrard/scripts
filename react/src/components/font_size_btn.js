import React from 'react';
import {Glyphicon, Button} from 'react-bootstrap';

let styles= {
  top_right:{
    position:'absolute',
    top:'20px',
    right:'20px'
  }
}

class Font_size_btn extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }

    this.handle_click = this.handle_click.bind(this)
  }

  handle_click(e){
    let type = e.target.getAttribute('data-type')
    let textbox = this.props.textarea_id
    let t = document.getElementById(textbox)
    let style = t.style.fontSize
    console.log(style)
    if(!style) style = '1.0em'
    console.log(style)
    style =  parseFloat(style)

    if(type === 'plus'){
      console.log(style)
      style += 0.1
      console.log(style)
      t.style.fontSize=style+'em'
    }else if(type === 'minus'){
      style -= 0.1
      t.style.fontSize=style+'em'
    }
  }

  render(){
    return(
      <div style={styles.top_right}>
      <Button
        data-type='plus'
        onClick={this.handle_click}
        >
        <Glyphicon
          data-type='plus'
          glyph='plus'>
        </Glyphicon>      </Button>
      <Button
        data-type='minus'
        onClick={this.handle_click}
        >
        <Glyphicon
          data-type='minus'
          glyph='minus'>
        </Glyphicon>
      </Button>
      </div>
    )
  }
}
export default Font_size_btn