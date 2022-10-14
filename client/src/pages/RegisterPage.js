import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import swal from 'sweetalert2'

export const RegisterPage = () => {
    
    // TODO: obtener {name, password, email}
    // TODO: conpletar la funcion del registro en el authProvider
    const {register} = useContext(AuthContext)
    
    const[form, setForm] = useState({
        email:'',
        password: '',
        name: ''
    })
    
    const onChange = ({target}) =>{
        const {name, value} = target
        setForm({...form,[name]:value})
    }
    
    const onSubmit = async ev =>{
        ev.preventDefault()
        const {email, password, name} = form
         
        if(!await register(email,password, name))
            swal.fire('Error', 'Datos ingresados no validos', 'error')
        // si es correcta... debe de ir al chat
    }
    
    return (
        <form 
            onSubmit={onSubmit}
            className="login100-form validate-form flex-sb flex-w">
            <span className="login100-form-title mb-3">
                Chat - Registro
            </span>

            <div className="wrap-input100 validate-input mb-3">
                <input 
                    className="input100"
                    type="text" 
                    name="name" 
                    placeholder="Nombre"
                    checked={form.name}
                    onChange={onChange}
                     />
                <span className="focus-input100"></span>
            </div>

            
            <div className="wrap-input100 validate-input mb-3">

                <input
                  className="input100" 
                  type="email" 
                  name="email" 
                  placeholder="Email"
                  checked={form.email}
                  onChange={onChange}
                   />
                <span className="focus-input100"></span>
            </div>
            
            
            <div className="wrap-input100 validate-input mb-3">
                <input 
                    className="input100" 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    checked={form.password}
                    onChange={onChange}
                     />
                <span className="focus-input100"></span>
            </div>
            
            <div className="row mb-3">
                <div className="col text-right">
                    <Link to="/auth/login" className="txt1">
                        Ya tienes cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button className="login100-form-btn">
                    Crear cuenta
                </button>
            </div>

        </form>
    )
}
