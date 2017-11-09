let $ = {
	id:(el)=>{
		return document.getElementById(el)
	},
  init_current_script:(script)=>{
    console.log('get a script? '+script)

    if(script === undefined || script === '' || script === null){
      console.log(
        'Please set a current script'
      )
      return false
    }else{
      console.log(script)
      return true
    }
  }
}


export default $