'use client';
import { useContext, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AuthContext } from '../../../context/AuthContext';
import { editUser, updateUser } from '@/app/components/api/page';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import moment from 'moment';
import HeaderVertical from '@/app/components/headerVertical/page';
import BrazilianStates from '@/app/components/brazilianStates';

export default function EditUser() {
  const userSchema = z.object({
    user_name: z.string().nonempty('Usuário não pode ficar vazio!'),
    email: z.string().email('Informe um endereço de e-mail válido!'),
    user_type: z.string().refine(
      (valor) => {
        return valor.trim() !== '';
      },
      {
        message: 'Tipo de usuário não pode ficar vazio!'
      }
    )
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

  const { authenticated, handleLogin } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    user: {
      user_name: '',
      email: '',
      user_type: '',
      people_attributes: [
        {
          first_name: '',
          last_name: '',
          cpf: '',
          identity: '',
          dispatcher: '',
          birthday_date: ''
        }
      ],
      addresses_attributes: [
        {
          street: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: '',
          zip_code: ''
        }
      ]
    }
  });
  const router = useRouter();
  const params = useParams();
  const [peopleId, setPeopleId] = useState(0);
  const [AddressId, setAddressId] = useState(0);

  console.log('Dados do usuario', userData);

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    //debugger;
    const fetchData = async () => {
      try {
        const response = await editUser(
          params.id,
          localStorage.getItem('voxxNettUseToken')
        );
        let defaultValues = {
          user: {},
          person: {},
          address: {}
        };

        console.log(
          'data formatada',
          moment
            .utc(response.data.people[0]?.birthday_date)
            .format('DD/MM/YYYY')
        );
        setPeopleId(response.data.people[0]?.id);
        setAddressId(response.data.addresses[0]?.id);
        defaultValues.user.user_name = response.data?.user_name;
        defaultValues.user.email = response.data?.email;
        defaultValues.user.user_type = response.data?.user_type;
        defaultValues.person.first_name = response.data.people[0]?.first_name;
        defaultValues.person.last_name = response.data.people[0]?.last_name;
        defaultValues.person.cpf = response.data.people[0]?.cpf_cnpj;
        defaultValues.person.identity =
          response.data.people[0]?.identity_municipal_registration;
        defaultValues.person.dispatcher = response.data.people[0]?.dispatcher;
        defaultValues.person.birthday_date = moment
          .utc(response.data.people[0]?.birthday_date)
          .format('YYYY-MM-DD');
        defaultValues.address.street = response.data.addresses[0]?.street;
        defaultValues.address.complement =
          response.data.addresses[0]?.complement;
        defaultValues.address.neighborhood =
          response.data.addresses[0]?.neighborhood;
        defaultValues.address.city = response.data.addresses[0]?.city;
        defaultValues.address.state = response.data.addresses[0]?.state;
        defaultValues.address.zip_code = response.data.addresses[0]?.zip_code;
        reset({ ...defaultValues });
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
  }, [setValue, params.id, reset]);

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

  const onCreate = async (data) => {
    //debugger;
    const objectState = {
      user: {
        email: data.user.email,
        user_name: data.user.user_name,
        user_type: data.user.user_type,
        people_attributes: [
          {
            id: peopleId,
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
            id: AddressId,
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
    setUserData(objectState);

    console.log('Claudiney Veloso', objectState);
    await updateUser(
      params.id,
      objectState,
      localStorage.getItem('voxxNettUseToken')
    )
      .then((response) => {
        console.log('Response:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Usuário atualizado com sucesso!',
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
                    <h4 className="card-title mb-0">Dados do usuários</h4>
                  </div>
                  <div className="card-body">
                    <div className="">
                      <form id="formUser" onSubmit={handleSubmit(onCreate)}>
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
                                id="email"
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
                              <label className="form-label" htmlFor="userName">
                                Usuário
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                autoComplete="userName-input"
                                id="userName"
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
                              <label className="form-label" htmlFor="userType">
                                Tipo de Usuário
                              </label>
                              <select
                                {...register('user.user_type')}
                                defaultValue={defaultValue}
                                id="userType"
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
                              id="person"
                              role="tabpanel"
                            >
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="firstName"
                                    >
                                      Nome
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="firstName"
                                      id="firstName"
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
                                      autoComplete="lastName"
                                      id="lastName"
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
                                      autoComplete="cpf"
                                      id="cpf"
                                      name="person.cpf"
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
                                      autoComplete="identity"
                                      id="identity"
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
                                      autoComplete="dispatcher"
                                      id="dispatcher"
                                      {...register('person.dispatcher')}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="birthday"
                                    >
                                      Data de Nascimento
                                    </label>
                                    <input
                                      type="date"
                                      className="form-control"
                                      autoComplete="birthday"
                                      id="birthday"
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
                                      htmlFor="street"
                                    >
                                      Logradouro
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="street"
                                      id="street"
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
                                      htmlFor="complement"
                                    >
                                      Complemento
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="complement"
                                      id="complement"
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
                                      htmlFor="neighborhood"
                                    >
                                      Bairro
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="neighborhood"
                                      id="neighborhood"
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
                                      htmlFor="city"
                                    >
                                      Cidade
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="city"
                                      id="city"
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
                                      htmlFor="state"
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
                                      htmlFor="zipCode"
                                    >
                                      Cep
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      autoComplete="zipCode"
                                      id="zipCode"
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
