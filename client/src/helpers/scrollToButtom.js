
import { animateScroll } from 'react-scroll'

export const scrollToBottom = (id) => {
    animateScroll.scrollToBottom({
        containerId: id,
        duration: 0.01
    })
}


export const scrollToBottomBeuty = (id) => {
    animateScroll.scrollToBottom({
        containerId: id,
        duration: 200
    })
}