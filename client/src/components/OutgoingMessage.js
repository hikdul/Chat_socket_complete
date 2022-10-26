import React from 'react'
import { horaMes } from '../helpers/configHoraMes'

export const OutgoingMessage = (props) => {

    const {message,createdAt } = props.msg
    const date = horaMes(createdAt)

    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{message}</p>
                <span className="time_date"> {date} </span>
            </div>
        </div>
    )
}
