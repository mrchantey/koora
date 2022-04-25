import { Component } from '../../base'


export class Time extends Component{
	start: f32
	last: f32
	elapsed: f32
	now: f32
	delta: f32
	frame: u64
}