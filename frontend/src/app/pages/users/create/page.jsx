'use client'
import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext";
import Link from "next/link"
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import HeaderVertical from "@/app/components/headerVertical/page"

const createUserFormSchema = z.object({
  user_name: z.string().nonempty('Usuário não pode ficar vazio!'),
  email: z.string().email('Informe um endereço de e-mail válido!'),
  password: z.string().nonempty('A senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres.'),
  user_type: z.string().nonempty('Tipo de usuário não pode ficar vazio!')
})


export default function UserForm() {

  const { authenticated, handleLogin } = useContext(AuthContext)
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(createUserFormSchema)
  })


  const optionsTypeUser = [
    { value: '', label: 'Selecione o Tipo de Usuário' },
    { value: 'administrador', label: 'Administrador' },
    { value: 'proprietario', label: 'Proprietário' },
    { value: 'atendimento', label: 'Atendimento' },
  ];
  const defaultValue = '';

  async function onSubmit(data) {
    await handleLogin(data.email, data.password)
  }

  return (
    <>
      <div id="layout-wrapper">
        <HeaderVertical />
      </div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title mb-0">Cadastro de usuários</h4>
                  </div>
                  <div className="card-body">
                    <div className="">
                      <form>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="email-input">Email</label>
                              <input 
                                type="email" 
                                className="form-control" 
                                autoComplete="email-input"
                                id="email-input" 
                                {...register('email')}
                              />
                            </div>
                            <div className="invalid mt-1">
                              {errors.email && <span>{errors.email.message}</span>}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="user-name-input">Usuário</label>
                              <input 
                                type="text" 
                                className="form-control" 
                                autoComplete="user-name-input"
                                id="user-name-input" 
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <select 
                                defaultValue={defaultValue} 
                                className="form-select" 
                                aria-label="Floating label select example"
                              >
                                {optionsTypeUser.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <hr class="my-4" />
                        <div className="row">
                          <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item text-center">
                              <a class="nav-link px-3 active" data-bs-toggle="tab" href="#person-data" role="tab" aria-selected="true">
                                <i class="bx bx-user-circle font-size-20"></i>
                                <span class="d-none d-sm-block">Dados Pessoais</span>
                              </a>
                            </li>
                            <li className="nav-item text-center">
                              <a class="nav-link px-3" data-bs-toggle="tab" href="#address" role="tab" aria-selected="false">
                                <i class="bx bx-home-circle font-size-20"></i>
                                <span class="d-none d-sm-block">Endereço</span>
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content p-3 text-muted">
                            {/* Person data */}
                            <div className="tab-pane active" id="person-data" role="tabpanel">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="first-name-input">Nome</label>
                                    <input 
                                      type="text" 
                                      className="form-control" 
                                      autoComplete="first-name-input"
                                      id="first-name-input" 
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="last-name-input">Sobrenome</label>
                                    <input 
                                      type="text" 
                                      className="form-control" 
                                      autoComplete="last-name-input"
                                      id="last-name-input" 
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="cpf-input">CPF</label>
                                    <input 
                                      type="text" 
                                      className="form-control" 
                                      autoComplete="cpf-input"
                                      id="cpf-input" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="identity-input">Identidade</label>
                                    <input 
                                      type="text" 
                                      className="form-control" 
                                      autoComplete="identity-input"
                                      id="identity-input" />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="dispatcher-input">Orgão Emissor</label>
                                    <input 
                                      type="text" 
                                      className="form-control" 
                                      autoComplete="dispatcher-input"
                                      id="dispatcher-input" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="birthday-date-input">Data de Nascimento</label>
                                    <input 
                                      type="text" 
                                      className="form-control" 
                                      autoComplete="birthday-date-input"
                                      id="birthday-date-input" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* person data end */}
                            <div className="tab-pane" id="address" role="tabpanel">
                              {/* Address data */}
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="street-input">Logradouro</label>
                                    <input 
                                      type="text" 
                                      className="form-control" 
                                      autoComplete="street-input"
                                      id="street-input" 
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="complement-input">Complemento</label>
                                    <input 
                                      type="text" 
                                      className="form-control"
                                      autoComplete="complement-input"
                                      id="complement-input"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="neighborhood-input">Bairro</label>
                                    <input 
                                      type="text" 
                                      className="form-control" 
                                      autoComplete="neighborhood-input"
                                      id="neighborhood-input" 
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="city-input">Cidade</label>
                                    <input 
                                      type="text" 
                                      className="form-control"
                                      autoComplete="city-input"
                                      id="city-input"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="state-input">Estado</label>
                                    <input 
                                      type="text" 
                                      className="form-control" 
                                      autoComplete="state-input"
                                      id="state-input" 
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="zip-code-input">Cep</label>
                                    <input 
                                      type="text" 
                                      className="form-control"
                                      autoComplete="zip-code-input"
                                      id="zip-code-input"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Address data end */}
                        <div className="row mt-2">
                          <div className="col-12 text-end">
                            <Link 
                              href='/pages/users'
                              className="btn btn-danger me-1" 
                            >
                              <i className="bx bx-x me-1 align-middle"></i> 
                              Voltar
                            </Link>
                            <button 
                              type="submit" 
                              className="btn btn-success" 
                              data-bs-toggle='modal'
                              data-bs-target="#success-btn" 
                              id="btn-save-event"
                            >
                              <i className="bx bx-check me-1 align-middle"></i> 
                              Salvar
                            </button>
                          </div>
                        </div>                                            
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}