import { ExternID } from './types'

//@ts-ignore external
@external("host", "log")
export declare function log(val: string): void

//@ts-ignore external
@external("host", "log_f64")
export declare function log_f64(val: f64): void
export function log_i8(val: i8): void { log_f64(<f64>val) }
export function log_u8(val: u8): void { log_f64(<f64>val) }
export function log_i16(val: i16): void { log_f64(<f64>val) }
export function log_u16(val: u16): void { log_f64(<f64>val) }
export function log_i32(val: i32): void { log_f64(<f64>val) }
export function log_u32(val: u32): void { log_f64(<f64>val) }
export function log_i64(val: i64): void { log_f64(<f64>val) }
export function log_u64(val: u64): void { log_f64(<f64>val) }
export function log_f32(val: f32): void { log_f64(<f64>val) }

//@ts-ignore external
@external("host", "log")
export declare function log_externref(val: externref): void

//@ts-ignore external
@external("host", "elapsed")
export declare function elapsed(): f32

//@ts-ignore external
@external("host", "now")
export declare function now(): f64





//@ts-ignore external
@external("host", "get")
export declare function get(id: ExternID): externref

//@ts-ignore external
@external("host", "set")
export declare function set(val: externref): ExternID

//@ts-ignore external
@external("host", "delete")
export declare function remove(id: ExternID): void