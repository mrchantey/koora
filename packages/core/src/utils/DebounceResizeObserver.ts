
import debounce from 'lodash.debounce'

export const DebounceResizeObserver = (cb: ResizeObserverCallback, delay = 1) => 
	new ResizeObserver(debounce(cb, delay))

export type DebounceResizeObserver = ReturnType<typeof DebounceResizeObserver>
