'use client'
import { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContext";
import Link from "next/link"
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import HeaderVertical from "@/app/components/headerVertical/page"
import BrazilianStates from "@/app/components/brazilianStates";

// const createUserFormSchema = z.object({
//   user_name: z.string().nonempty('Usuário não pode ficar vazio!'),
//   email: z.string().email('Informe um endereço de e-mail válido!'),
//   password: z.string().nonempty('A senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres.'),
//   user_type: z.string().refine((valor) => {
//     return valor.trim() !== "";
//   }, {
//     message: "Tipo de usuário não pode ficar vazio!",
//   }),
//   first_name: z.string().nonempty('Nome não pode ficar vazio!'),
//   last_name: z.string().nonempty('Sobrenome não pode ficar vazio!'),
//   street: z.string().nonempty('Logradouro não pode ficar vazio!'),
//   neighborhood: z.string().nonempty('Bairro não pode ficar vazio!'),
//   city: z.string().nonempty('Cidade não pode ficar vazio!'),
//   state: z.string().nonempty('Estado não pode ficar vazio!'),
//   zip_code: z.string().nonempty('Cep não pode ficar vazio!'),
  
// })

export default function UserForm() {

  const customerSchema = z.object({
    user_name: z.string().nonempty('Usuário não pode ficar vazio!'),
    email: z.string().email('Informe um endereço de e-mail válido!'),
    password: z.string().nonempty('A senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres.'),
    user_type: z.string().refine((valor) => {
      return valor.trim() !== "";
    }, {
      message: "Tipo de usuário não pode ficar vazio!",
    }),
  });

  const personSchema = z.object({
    first_name: z.string().nonempty('Nome não pode ficar vazio!'),
    last_name: z.string().nonempty('Sobrenome não pode ficar vazio!'),
    birthday_date: z.string().nonempty('A data de aniversário não pode ficar vazio!'),
  })

  const addressSchema = z.object({
    street: z.string().nonempty('Logradouro não pode ficar vazio!'),
    neighborhood: z.string().nonempty('Bairro não pode ficar vazio!'),
    city: z.string().nonempty('Cidade não pode ficar vazio!'),
    state: z.string().nonempty('Estado não pode ficar vazio!'),
    zip_code: z.string().nonempty('Cep não pode ficar vazio!'),
  });

  const schema = z.object({
    customer: customerSchema,
    person: personSchema,
    address: addressSchema,
  });

  const { authenticated, handleLogin } = useContext(AuthContext)
  const [userData, setUserData] = useState({
    user_name: '',
    email: '',
    user_type: '',
    password: '',
    person: { first_name: '', last_name: '', cpf_cnpj: '', identity_municipal_registration: '', dispatcher: '', birthday_date: '' },
    address: { street: '', complement: '', neighborhood: '', city: '', state: '', zip_code: '' },
    //people_attributes: [{ first_name: '', last_name: '', cpf_cnpj: '', identity_municipal_registration: '', dispatcher: '', birthday_date: '' }],
    //addresses_attributes: [{ street: '', complement: '', neighborhood: '', city: '', state: '', zip_code: '' }],
  });

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(schema)
  })

  const optionsTypeUser = [
    { value: '', label: 'Selecione...' },
    { value: 'administrador', label: 'Administrador' },
    { value: 'proprietario', label: 'Proprietário' },
    { value: 'atendimento', label: 'Atendimento' },
  ];
  const defaultValue = '';

  // const handleAddressChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData({
  //     ...userData,
  //     address: {
  //       ...userData.address,
  //       [name]: value,
  //     },
  //   });
  // };

  const handleStateSelect = (selectedState) => {
    console.log('Estado selecionado:', selectedState);
    // Adicione a lógica para lidar com o estado selecionado, se necessário
  };



  function onSubmit() {
    debugger
    console.log('Claudiney Veloso')
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
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="email-input">Email</label>
                              <input 
                                type="email" 
                                className="form-control" 
                                autoComplete="email-input"
                                id="email-input" 
                                {...register('customer.email')}
                              />
                              <div className="invalid mt-1 ms-1">
                                {errors?.customer?.email && <span>{errors?.customer?.email.message}</span>}
                              </div>
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
                                {...register('customer.user_name')}
                              />
                              <div className="invalid mt-1 ms-1">
                                {errors?.customer?.user_name && <span>{errors?.customer?.user_name.message}</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="password-input">Senha</label>
                              <input 
                                type="password" 
                                className="form-control" 
                                autoComplete="password-input"
                                id="password-input" 
                                {...register('password')}
                                {...register('customer.password')}
                              />
                              <div className="invalid mt-1 ms-1">
                                {errors?.customer?.password && <span>{errors?.customer?.password.message}</span>}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="user-type-select">Tipo de Usuário</label>
                              <select  {...register('customer.user_type')}
                                defaultValue={defaultValue} 
                                id='user-type-select'
                                className="form-select" 
                                aria-label="Floating label select example"
                              >
                                {optionsTypeUser.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                              <div className="invalid mt-1 ms-1">
                                {errors?.customer?.user_type && <span>{errors?.customer?.user_type.message}</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="my-4" />
                        <div className="row">
                          <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item text-center">
                              <a className="nav-link px-3 active" data-bs-toggle="tab" href="#person-data" role="tab" aria-selected="true">
                                <i className="bx bx-user-circle font-size-20"></i>
                                <span className="d-none d-sm-block">Dados Pessoais</span>
                              </a>
                            </li>
                            <li className="nav-item text-center">
                              <a className="nav-link px-3" data-bs-toggle="tab" href="#address" role="tab" aria-selected="false">
                                <i className="bx bx-home-circle font-size-20"></i>
                                <span className="d-none d-sm-block">Endereço</span>
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
                                      {...register('person.first_name')}
                                    />
                                    <div className="invalid mt-1 ms-1">
                                      {errors?.person?.first_name && <span>{errors?.person?.first_name.message}</span>}
                                    </div>
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
                                      {...register('person.last_name')}
                                    />
                                    <div className="invalid mt-1 ms-1">
                                      {errors?.person?.last_name && <span>{errors?.person?.last_name.message}</span>}
                                    </div>
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
                                      type="date" 
                                      className="form-control" 
                                      autoComplete="birthday-date-input"
                                      id="birthday-date-input" 
                                      {...register('person.birthday_date')}
                                    />
                                    <div className="invalid mt-1 ms-1">
                                      {errors?.person?.birthday_date && <span>{errors?.person?.birthday_date.message}</span>}
                                    </div>
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
                                      {...register('address.street')}
                                    />
                                    <div className="invalid mt-1 ms-1">
                                      {errors?.address?.street && <span>{errors?.address?.street.message}</span>}
                                    </div>
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
                                      {...register('address.neighborhood')}
                                    />
                                    <div className="invalid mt-1 ms-1">
                                      {errors?.address?.neighborhood && <span>{errors?.address?.neighborhood.message}</span>}
                                    </div>
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
                                      {...register('address.city')}
                                    />
                                    <div className="invalid mt-1 ms-1">
                                      {errors?.address?.city && <span>{errors?.address?.city.message}</span>}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="state-input">Estado</label>
                                    <BrazilianStates 
                                      onSelect={handleStateSelect} 
                                      register={register} 
                                    />
                                    <div className="invalid mt-1 ms-1">
                                      {errors?.address?.state && <span>{errors?.address?.state.message}</span>}
                                    </div>
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
                                      {...register('address.zip_code')}
                                    />
                                    <div className="invalid mt-1 ms-1">
                                      {errors?.address?.zip_code && <span>{errors?.address?.zip_code.message}</span>}
                                    </div>
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
                              //data-bs-toggle='modal'
                              //data-bs-target="#success-btn" 
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