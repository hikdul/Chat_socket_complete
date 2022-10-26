import moment  from 'moment'

export const horaMes = (date) =>{
    const fecha = moment(date)
    return fecha.format('HH:mm a | MMMM Do')
    
}