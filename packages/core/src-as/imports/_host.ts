import { ExternID } from './types'

//@ts-ignore external
@external("host", "log")
export declare function log(val: string): void

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