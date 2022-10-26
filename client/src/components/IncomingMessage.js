import React from 'react'
import { horaMes } from '../helpers/configHoraMes'

export const IncomingMessage = (props) => {

    const {message,createdAt } = props.msg
    const date = horaMes(createdAt)
    return (
        <div className="incoming_msg">
            <div className="incoming_msg_img">
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>
                        {message}
                    </p>
                    <span className="time_date"> {date}</span>
                </div>
            </div>
        </div>
    )
}
