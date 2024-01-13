'use client';
import { useContext, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../../context/AuthContext';
import { createCustomer } from '@/app/components/api/page';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import HeaderVertical from '@/app/components/headerVertical/page';
import BrazilianStates from '@/app/components/brazilianStates';

export default function CustomerForm() {
  const customerSchema = z.object({
    people_type: z.string().refine(
      (valor) => {
        return valor.trim() !== '';
      },
      {
        message: 'Tipo de usuário não pode ficar vazio!'
      }
    ),
    phone: z.string().optional(true),
    cell_phone: z.string().optional(true),
    observation: z.string().optional(true),
    email: z.string().email('Informe um endereço de e-mail válido!'),
    active: z.string().optional(true)
  });

  const router = useRouter();

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
    customer: customerSchema,
    person: personSchema,
    address: addressSchema
  });

  const { authenticated, handleLogin } = useContext(AuthContext);

  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCellPhone, setCustomerCellPhone] = useState('');

  const firstName = useRef();
  const lastName = useRef();
  const cpf = useRef();
  const identity = useRef();
  const dispatcher = useRef();
  const birthday = useRef();

  // const [customerData, setCustomerData] = useState({
  //   customer: {
  //     people_type: '',
  //     phone: '',
  //     cell_phone: '',
  //     observation: '',
  //     email: '',
  //     active: '',
  //     people_attributes: [
  //       {
  //         first_name: '',
  //         last_name: '',
  //         cpf: '',
  //         identity: '',
  //         dispatcher: '',
  //         birthday_date: ''
  //       }
  //     ],
  //     addresses_attributes: [
  //       {
  //         street: '',
  //         complement: '',
  //         neighborhood: '',
  //         city: '',
  //         state: '',
  //         zip_code: ''
  //       }
  //     ]
  //   }
  // });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const optionsPeopleType = [
    { value: '', label: 'Selecione...' },
    { value: 'fisica', label: 'Física' },
    { value: 'juridica', label: 'Jurídica' }
  ];
  const defaultValue = '';

  const handleStateSelect = (selectedState) => {
    console.log('Estado selecionado:', selectedState);
    // Adicione a lógica para lidar com o estado selecionado, se necessário
  };

  const onSubmit = async (data) => {
    const objectState = {
      customer: {
        people_type: data.customer.people_type,
        phone: data.customer.phone,
        cell_phone: data.customer.cell_phone,
        observation: data.customer.observation,
        email: data.customer.email,
        active: data.customer.active,
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
    //setCustomerData(objectState);
    //debugger
    console.log('Claudiney Veloso', objectState);
    //const apiUrl = 'http://localhost:3001'
    await createCustomer(objectState, localStorage.getItem('voxxNettUseToken'))
      //axios.post(`${apiUrl}/api/v1/users/custom_create`, JSON.stringify(objectState), config)
      .then((response) => {
        console.log('Response:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Cliente cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // Redirecione para a listagem de usuários
          router.push('/pages/customers');
        });
      })
      .catch((error) => {
        console.error('Erro:', error);
        router.push('/pages/error');
      });
  };

  const handlePhoneMask = (event) => {
    let inputValue = event.target.value;
    let lengthInput = 0;
    event.target.name === 'customer.phone'
      ? (lengthInput = 9)
      : (lengthInput = 10);

    inputValue = inputValue.replace(/\D/g, '');
    if (inputValue.length >= 2) {
      inputValue = `(${inputValue.substring(0, 2)}) ${inputValue.substring(2)}`;
    }
    if (inputValue.length >= lengthInput) {
      inputValue = `${inputValue.substring(
        0,
        lengthInput
      )}-${inputValue.substring(lengthInput)}`;
    }
    event.target.name === 'customer.phone'
      ? setCustomerPhone(inputValue)
      : setCustomerCellPhone(inputValue);
  };

  const handlePeopleTypeChange = (type) => {
    switch (type) {
      case 'fisica':
        firstName.current.textContent = 'Nome';
        lastName.current.textContent = 'Sobrenome';
        cpf.current.textContent = 'CPF';
        identity.current.textContent = 'Identidade';
        dispatcher.current.textContent = 'Orgão Emissor';
        birthday.current.textContent = 'Data de Nascimento';
        break;
      case 'juridica':
        firstName.current.textContent = 'Razão Social';
        lastName.current.textContent = 'Nome Fantasia';
        cpf.current.textContent = 'CNPJ';
        identity.current.textContent = 'Inscrição Estadual';
        dispatcher.current.textContent = 'Orgão Emissor';
        birthday.current.textContent = 'Data da Fundação';
        break;
    }
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
                    <h4 className="card-title mb-0">Cadastro de clientes</h4>
                  </div>
                  <div className="card-body">
                    <div className="">
                      <form id="formCustomer" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="people-type-select"
                              >
                                Tipo de Pessoa
                              </label>
                              <select
                                {...register('customer.people_type')}
                                defaultValue={defaultValue}
                                id="people-type-select"
                                className="form-select"
                                aria-label="Floating label select example"
                                onChange={(e) =>
                                  handlePeopleTypeChange(e.target.value)
                                }
                              >
                                {optionsPeopleType.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                              <div className="invalid mt-1 ms-1">
                                {errors?.customer?.people_type && (
                                  <span>
                                    {errors?.customer?.people_type.message}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="phone-input"
                              >
                                Telefone
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                autoComplete="phone-input"
                                placeholder="(DDD) 1234-5678"
                                maxLength={14}
                                id="phone-input"
                                {...register('customer.phone')}
                                onChange={handlePhoneMask}
                                value={customerPhone}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="cell-phone-input"
                              >
                                Celular
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                autoComplete="cell-phone-input"
                                placeholder="(DDD) 99999-9999"
                                maxLength={15}
                                id="cell-phone-input"
                                {...register('customer.cell_phone')}
                                onChange={handlePhoneMask}
                                value={customerCellPhone}
                              />
                            </div>
                          </div>
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
                                {...register('customer.email')}
                              />
                              <div className="invalid mt-1 ms-1">
                                {errors?.customer?.email && (
                                  <span>{errors?.customer?.email.message}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="observation-input"
                              >
                                Observação
                              </label>
                              <input
                                type="textarea"
                                className="form-control"
                                autoComplete="observation-input"
                                id="observation-input"
                                rows={4}
                                cols={40}
                                style={{ height: '150px' }}
                                {...register('customer.observation')}
                              />
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
                                      htmlFor="firstName"
                                      ref={firstName}
                                    >
                                      Nome
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="first-name-input"
                                      maxLength={100}
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
                                      ref={lastName}
                                    >
                                      Sobrenome
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="last-name-input"
                                      maxLength={100}
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
                                      ref={cpf}
                                    >
                                      CPF
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="cpf-input"
                                      maxLength={15}
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
                                      ref={identity}
                                    >
                                      Identidade
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="identity-input"
                                      maxLength={20}
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
                                      ref={dispatcher}
                                    >
                                      Orgão Emissor
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="dispatcher-input"
                                      maxLength={10}
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
                                      ref={birthday}
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
                                      maxLength={100}
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
                                      maxLength={50}
                                      id="complement-input"
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
                                      maxLength={50}
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
                                      maxLength={50}
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
                                      maxLength={10}
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
                              href="/pages/customers"
                              className="btn btn-danger me-1"
                            >
                              <i className="bx bx-x me-1 align-middle"></i>
                              Voltar
                            </Link>
                            <button
                              type="submit"
                              className="btn btn-success"
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
