'use client';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../../context/AuthContext';
import { createUser, getCustomers } from '@/app/components/api/page';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import HeaderVertical from '@/app/components/headerVertical/page';
import BrazilianStates from '@/app/components/brazilianStates';

export default function UserForm() {
  const userSchema = z
    .object({
      user_name: z.string().nonempty('Usuário não pode ficar vazio!'),
      email: z.string().email('Informe um endereço de e-mail válido!'),
      password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres.'),
      password_confirmation: z.string().optional(true),
      user_type: z.string().refine(
        (valor) => {
          return valor.trim() !== '';
        },
        {
          message: 'Tipo de usuário não pode ficar vazio!'
        }
      ),

      customer: z.string().refine(
        (valor) => {
          return valor.trim() !== '';
        },
        {
          message: 'Cliente não pode ficar vazio!'
        }
      )
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: 'A senha não corresponde com a confirmação de senha!',
      path: ['password_confirmation'] // path of error
    });

  const personSchema = z.object({
    first_name: z.string().nonempty('Nome não pode ficar vazio!'),
    last_name: z.string().nonempty('Sobrenome não pode ficar vazio!'),
    cpf: z.string().optional(true),
    identity: z.string().optional(true),
    dispatcher: z.string().optional(true),
    birthday_date: z
      .string()
      .nonempty('A data de aniversário não pode ficar vazio!')
  });

  const addressSchema = z.object({
    street: z.string().nonempty('Logradouro não pode ficar vazio!'),
    complement: z.string().optional(true),
    neighborhood: z.string().nonempty('Bairro não pode ficar vazio!'),
    city: z.string().nonempty('Cidade não pode ficar vazio!'),
    state: z.string().nonempty('Estado não pode ficar vazio!'),
    zip_code: z.string().nonempty('Cep não pode ficar vazio!')
  });

  const schema = z.object({
    user: userSchema,
    person: personSchema,
    address: addressSchema
  });

  const router = useRouter();

  const [customerData, setCustomerData] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState('');
  const { authenticated, handleLogin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const optionsTypeUser = [
    { value: '', label: 'Selecione...' },
    { value: 'administrador', label: 'Administrador' },
    { value: 'proprietario', label: 'Proprietário' },
    { value: 'atendimento', label: 'Atendimento' }
  ];
  const defaultValue = '';

  const handleStateSelect = (selectedState) => {
    console.log('Estado selecionado:', selectedState);
    // Adicione a lógica para lidar com o estado selecionado, se necessário
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCustomers(searchCustomer);
        //debugger;
        setCustomerData(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados do cliente:', error);
      }
    };
    fetchData();
  }, [searchCustomer]);

  const onSubmit = async (data) => {
    debugger;
    const objectState = {
      user: {
        email: data.user.email,
        user_name: data.user.user_name,
        user_type: data.user.user_type,
        password: data.user.password,
        people_attributes: [
          {
            first_name: data.person.first_name,
            last_name: data.person.last_name,
            cpf_cnpj: data.person.cpf,
            identity_municipal_registration: data.person.identity,
            dispatcher: data.person.dispatcher,
            birthday_date: data.person.birthday_date
          }
        ],
        addresses_attributes: [
          {
            street: data.address.street,
            complement: data.address.complement,
            neighborhood: data.address.neighborhood,
            city: data.address.city,
            state: data.address.state,
            zip_code: data.address.zip_code
          }
        ]
      }
    };
    //debugger
    console.log('Claudiney Veloso', objectState);
    //const apiUrl = 'http://localhost:3001'
    await createUser(objectState, localStorage.getItem('voxxNettUseToken'))
      //axios.post(`${apiUrl}/api/v1/users/custom_create`, JSON.stringify(objectState), config)
      .then((response) => {
        console.log('Response:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Usuário cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // Redirecione para a listagem de usuários
          router.push('/pages/users');
        });
      })
      .catch((error) => {
        console.error('Erro:', error);
        router.push('/pages/error');
      });
  };

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
                      <form id="formUser" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="email-input"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                autoComplete="email-input"
                                id="email-input"
                                {...register('user.email')}
                              />
                              <div className="invalid mt-1 ms-1">
                                {errors?.user?.email && (
                                  <span>{errors?.user?.email.message}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="user-name-input"
                              >
                                Usuário
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                autoComplete="user-name-input"
                                id="user-name-input"
                                {...register('user.user_name')}
                              />
                              <div className="invalid mt-1 ms-1">
                                {errors?.user?.user_name && (
                                  <span>{errors?.user?.user_name.message}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="password-input"
                              >
                                Senha
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                autoComplete="password-input"
                                id="password-input"
                                {...register('user.password')}
                              />
                              <div className="invalid mt-1 ms-1">
                                {errors?.user?.password && (
                                  <span>{errors?.user?.password.message}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="password-input"
                              >
                                Confirmar Senha
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                autoComplete="password-confirmation-input"
                                id="password-confirmation-input"
                                {...register('user.password_confirmation')}
                              />
                              <div className="invalid mt-1 ms-1">
                                {errors?.user?.password_confirmation && (
                                  <span>
                                    {
                                      errors?.user?.password_confirmation
                                        .message
                                    }
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="user-type-select"
                              >
                                Tipo de Usuário
                              </label>
                              <select
                                {...register('user.user_type')}
                                defaultValue={defaultValue}
                                id="user-type-select"
                                className="form-select"
                                aria-label="Floating label select example"
                              >
                                {optionsTypeUser.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                              <div className="invalid mt-1 ms-1">
                                {errors?.user?.user_type && (
                                  <span>{errors?.user?.user_type.message}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="user-type-select"
                              >
                                Cliente
                              </label>
                              <select
                                {...register('user.customer')}
                                defaultValue={defaultValue}
                                id="customer-select"
                                className="form-select"
                                aria-label="Floating label select example"
                              >
                                <option value="">Selecione...</option>
                                {customerData?.map((v, i) => {
                                  return (
                                    <option
                                      data={v.people?.first_name}
                                      key={v.id}
                                      value={v.id}
                                    >
                                      {v?.people[0]?.first_name}
                                    </option>
                                  );
                                })}
                              </select>
                              <div className="invalid mt-1 ms-1">
                                {errors?.user?.customer && (
                                  <span>{errors?.user?.customer.message}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="my-4" />
                        <div className="row">
                          <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item text-center">
                              <a
                                className="nav-link px-3 active"
                                data-bs-toggle="tab"
                                href="#person-data"
                                role="tab"
                                aria-selected="true"
                              >
                                <i className="bx bx-user-circle font-size-20"></i>
                                <span className="d-none d-sm-block">
                                  Dados Pessoais
                                </span>
                              </a>
                            </li>
                            <li className="nav-item text-center">
                              <a
                                className="nav-link px-3"
                                data-bs-toggle="tab"
                                href="#address"
                                role="tab"
                                aria-selected="false"
                              >
                                <i className="bx bx-home-circle font-size-20"></i>
                                <span className="d-none d-sm-block">
                                  Endereço
                                </span>
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content p-3 text-muted">
                            {/* Person data */}
                            <div
                              className="tab-pane active"
                              id="person-data"
                              role="tabpanel"
                            >
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="first-name-input"
                                    >
                                      Nome
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="first-name-input"
                                      id="first-name-input"
                                      {...register('person.first_name')}
                                    />
                                    <div className="invalid mt-1 ms-1">
                                      {errors?.person?.first_name && (
                                        <span>
                                          {errors?.person?.first_name.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="last-name-input"
                                    >
                                      Sobrenome
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="last-name-input"
                                      id="last-name-input"
                                      {...register('person.last_name')}
                                    />
                                    <div className="invalid mt-1 ms-1">
                                      {errors?.person?.last_name && (
                                        <span>
                                          {errors?.person?.last_name.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="cpf-input"
                                    >
                                      CPF
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="cpf-input"
                                      id="cpf-input"
                                      {...register('person.cpf')}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="identity-input"
                                    >
                                      Identidade
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="identity-input"
                                      id="identity-input"
                                      {...register('person.identity')}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="dispatcher-input"
                                    >
                                      Orgão Emissor
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="dispatcher-input"
                                      id="dispatcher-input"
                                      {...register('person.dispatcher')}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="birthday-date-input"
                                    >
                                      Data de Nascimento
                                    </label>
                                    <input
                                      type="date"
                                      className="form-control"
                                      autoComplete="birthday-date-input"
                                      id="birthday-date-input"
                                      {...register('person.birthday_date')}
                                    />
                                    <div className="invalid mt-1 ms-1">
                                      {errors?.person?.birthday_date && (
                                        <span>
                                          {
                                            errors?.person?.birthday_date
                                              .message
                                          }
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* person data end */}
                            <div
                              className="tab-pane"
                              id="address"
                              role="tabpanel"
                            >
                              {/* Address data */}
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="street-input"
                                    >
                                      Logradouro
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="street-input"
                                      id="street-input"
                                      {...register('address.street')}
                                    />
                                    <div className="invalid mt-1 ms-1">
                                      {errors?.address?.street && (
                                        <span>
                                          {errors?.address?.street.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="complement-input"
                                    >
                                      Complemento
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="complement-input"
                                      {...register('address.complement')}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="neighborhood-input"
                                    >
                                      Bairro
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="neighborhood-input"
                                      id="neighborhood-input"
                                      {...register('address.neighborhood')}
                                    />
                                    <div className="invalid mt-1 ms-1">
                                      {errors?.address?.neighborhood && (
                                        <span>
                                          {
                                            errors?.address?.neighborhood
                                              .message
                                          }
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="city-input"
                                    >
                                      Cidade
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="city-input"
                                      id="city-input"
                                      {...register('address.city')}
                                    />
                                    <div className="invalid mt-1 ms-1">
                                      {errors?.address?.city && (
                                        <span>
                                          {errors?.address?.city.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="state-input"
                                    >
                                      Estado
                                    </label>
                                    <BrazilianStates
                                      onSelect={handleStateSelect}
                                      register={register}
                                    />
                                    <div className="invalid mt-1 ms-1">
                                      {errors?.address?.state && (
                                        <span>
                                          {errors?.address?.state.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="zip-code-input"
                                    >
                                      Cep
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="zip-code-input"
                                      id="zip-code-input"
                                      {...register('address.zip_code')}
                                    />
                                    <div className="invalid mt-1 ms-1">
                                      {errors?.address?.zip_code && (
                                        <span>
                                          {errors?.address?.zip_code.message}
                                        </span>
                                      )}
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
                              href="/pages/users"
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
  );
}
