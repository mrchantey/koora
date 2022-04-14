

export class EventListener<T>{
	invoke(val: T): void{}
}


export class Event<T>{

	listeners: EventListener<T>[] = []
	addListener(listener: EventListener<T>): Event<T>{
		this.listeners.push(listener)
		return this
	}
	invoke(val: T): void{
		for (let i = 0; i < this.listeners.length; i++){
			this.listeners[i].invoke(val)
		}
	}
	removeListener(listener: EventListener<T>): Event<T>{
		this.listeners.splice(this.listeners.indexOf(listener), 1)
		return this
	}
}