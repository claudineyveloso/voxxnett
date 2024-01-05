'use client'
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';

//import history from "../../components/history/index.js";
import { useRouter } from 'next/navigation'

const createUserFormSchema = z.object({
  email: z.string().email('Informe um endereço de e-mail válido'),
  password: z.string().nonempty('A senha é obrigatória').min(8, 'A senha de ter no mínimo 8 caracteres.'),
})


export default function Login() {
  const router = useRouter()
  const { authenticated, handleLogin } = useContext(AuthContext)
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(createUserFormSchema)
  })

  console.log('Claudiney', authenticated)



  async function createUser(data) {
    await handleLogin(data.email, data.password)
  }

  const togglePassword = () => {
    let togglePassword = document.getElementById("password-input");
    if (togglePassword.type === "password") {
      togglePassword.type = "text";
    } else {
      togglePassword.type = "password";
    }
  }


  return (
    
    <div className="authentication-bg min-vh-100">
      <div className="bg-overlay bg-light"></div>
      <div className="container">
        <div className="d-flex flex-column min-vh-100 px-3 pt-4">
          <div className="row justify-content-center my-auto">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5>Bem vindo(a)!</h5>
                    <p className="text-muted">Faça login para continuar no VoxxNett.</p>
                  </div>
                  <div className="p-2 mt-3">
                    <form onSubmit={handleSubmit(createUser)}>
                      <div className="mb-3">
                        <div className="position-relative input-custom-icon">
                          <input 
                            type="email"
                            className="form-control"
                            id="input-email" 
                            autoComplete='off'
                            placeholder="Informe o email" 
                            {...register('email')}
                          />
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <div className="invalid mt-1">
                          {errors.email && <span>{errors.email.message}</span>}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="position-relative auth-pass-inputgroup input-custom-icon">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-lock mt-0">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                          </span>
                          <input 
                            type="password"
                            className="form-control"
                            id="password-input" 
                            autoComplete='off'
                            placeholder="Informe a senha" 
                            {...register('password')}
                          />
                          <button type="button" className="btn btn-link position-absolute h-100 end-0 top-0 top-12" id="password-addon" onClick={togglePassword}>
                            <i className="mdi mdi-eye-outline font-size-18 text-muted"></i>
                          </button>
                        </div>
                        <div className="invalid mt-1">
                          {errors.password && <span>{errors.password.message}</span>}
                        </div>

                      </div>
                      <div className="mt-3">
                        <Link
                          href={"/pages/recoverpwd"}
                          className="text-muted text-decoration-underline"
                        >
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <div className="mt-3">
                        <button className="btn btn-primary w-100 waves-effect waves-light" type="submit">Entrar</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- end col --> */}
          </div>
          {/* <!-- end row --> */}
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center p-4">
                <p>
                  © {(new Date().getFullYear())} VoxxNett. Desenvolvido por AIC - Consultoria e Sistemas Ltda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end container --> */}
    </div>


  )
}







