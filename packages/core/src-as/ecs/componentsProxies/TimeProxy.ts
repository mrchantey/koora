

export class TimeProxy {
	get stride(): u32{ return 32 }
	get start(): f32{ return load<f32>(changetype<usize>(this) + 0) }
	set start(value: f32){ store<f32>(changetype<usize>(this) + 0, value) }
	get last(): f32{ return load<f32>(changetype<usize>(this) + 4) }
	set last(value: f32){ store<f32>(changetype<usize>(this) + 4, value) }
	get elapsed(): f32{ return load<f32>(changetype<usize>(this) + 8) }
	set elapsed(value: f32){ store<f32>(changetype<usize>(this) + 8, value) }
	get now(): f32{ return load<f32>(changetype<usize>(this) + 12) }
	set now(value: f32){ store<f32>(changetype<usize>(this) + 12, value) }
	get delta(): f32{ return load<f32>(changetype<usize>(this) + 16) }
	set delta(value: f32){ store<f32>(changetype<usize>(this) + 16, value) }
	get frame(): u64{ return load<u64>(changetype<usize>(this) + 24) }
	set frame(value: u64){ store<u64>(changetype<usize>(this) + 24, value) }

}

	