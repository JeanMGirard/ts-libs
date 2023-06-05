import {debounce} from './debounce'
import {isObject} from '../guards/is-object'

export function throttle(func, wait, options) {
    let leading = true
    let trailing = true

    if (typeof func !== 'function') {
        throw new TypeError('Expected a function')
    }
    if (isObject(options)) {
        leading = 'leading' in options ? !!(options as any).leading : leading
        trailing = 'trailing' in options ? !!(options as any).trailing : trailing
    }
    return debounce(func, wait, {
        leading,
        trailing,
        'maxWait': wait
    })
}
