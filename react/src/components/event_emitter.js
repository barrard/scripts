
class CustomEventEmitter {
	constructor() {
		this.events = {}
	}

	on(event_name, event_handler){
		if(!this.events[event_name]){
			console.log('new event added: '+event_name)

			this.events[event_name]=[event_handler]
		}else{
			console.warn('ADDING TWO EVENT HANDLERS')
			this.events[event_name].push(event_handler)
			console.log(this.events)
		}
		
	}
	emit(event_name, event_details){
		if(!this.events[event_name]) return false
		// console.log('emit : '+event_name)
		// console.log(event_details)

		this.events[event_name].forEach((i)=> i(event_details))
	}
	off(event_name, event_handler){
		var index = this.events[event_name][event_handler]
		this.events[event_name].splice(index, 1)
		console.log('event_handler '+ event_handler +' removed')

	}
}

let event_emitter = new CustomEventEmitter()

export default event_emitter