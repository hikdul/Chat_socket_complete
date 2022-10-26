import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import swal from 'sweetalert2'

export const LoginPage = () => {
    const {login} = useContext(AuthContext)
    
    const[form, setForm] = useState({
        email:'',
        password: '',
        rememberme: true
    })
    
    const onChange = ({target}) =>{
        const {name, value} = target
        setForm({...form,[name]:value})
    }

    const toggleCheck = () =>{
        setForm({...form, rememberme:!form.rememberme})
    }
    
    const onSubmit = async ev =>{
        ev.preventDefault()
        const {email, password} = form
        if(!await login(email,password))
            swal.fire('Error', 'verifique Usuario y contrasena', 'error')
        // si es correcta... debe de ir al log 
    }
    
    return (
        <form 
            onSubmit={onSubmit}
            className="login100-form validate-form flex-sb flex-w">
            <span className="login100-form-title mb-3">
                Chat - Ingreso
            </span>
            
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
                    value={form.password}
                    onChange={onChange} />
                <span className="focus-input100"></span>
            </div>
            
            <div className="row mb-3">
                <div
                    onClick={()=>toggleCheck()}
                    className="col">
                    <input 
                        className="input-checkbox100" 
                        id="ckb1" 
                        type="checkbox" 
                        name="rememberme"
                        value={form.rememberme}
                        readOnly />
                    <label className="label-checkbox100">
                        Recordarme
                    </label>
                </div>

                <div className="col text-right">
                    <Link to="/auth/register" className="txt1">
                        Nueva cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button className="login100-form-btn">
                    Ingresar
                </button>
            </div>

        </form>
    )
}
