
const URL = process.env.REACT_APP_BACKENDURL

export const fetchNoToken = async (endPoint, data, method='GET') =>{
    
    const url = `${URL}/${endPoint}`
    if(method === 'GET')
    {
        const resp = await fetch(url,{mode: 'cors'})
        return await resp.json()
    }
    
    const resp = await fetch(url,{
        method,
        mode: 'cors',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await resp.json()
    
}

export const fetchToken = async (endPoint, data, method='GET') =>{
    
    const token = localStorage.getItem('token') || ''
    const url = `${URL}/${endPoint}`
    if(method === 'GET')
    {
        const resp = await fetch(url,{mode: 'cors'})
        return await resp.json()
    }
    
    const resp = await fetch(url,{
        method,
        mode: 'cors',
        headers:{
            'content-type': 'application/json',
            'x-token': token
        },
        body: JSON.stringify(data)
    })
    return await resp.json()
    
}