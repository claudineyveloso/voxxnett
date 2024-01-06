'use client'
import { useState } from "react"
import { useForm} from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';


const createUserFormSchema = z.object({
  user_name: z.string().nonempty('Nome não pode ficar vazio!'),
  email: z.string().nonempty('Sobrenome não pode ficar vazio!'),
  password: z.string().nonempty('A senha não pode ficar vazio!').min(8, 'A senha de ter no mínimo 8 caracteres.'),
})

export default function ModalUser() {
  const optionsTypeUser = [
    { value: '', label: 'Selecione o Tipo de Usuário' },
    { value: 'administrador', label: 'Administrador' },
    { value: 'proprietario', label: 'Proprietário' },
    { value: 'atendimento', label: 'Atendimento' },
  ];

  const defaultValue = '';

  const { register, 
          handleSubmit, 
          formState: {errors},
          } = useForm({
            resolver: zodResolver(createUserFormSchema),
  });

  const createUser = async (data) => {
    debugger
    await console.log('eu')
  }

  

  const onSubmit = (data) => {
    debugger
    setUsers([...users, data]);
    reset();
    toggle();
  };

  return (
    <div className="modal fade" id="addInvoiceModal" tabIndex="-1" aria-labelledby="addInvoiceModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addInvoiceModalLabel">Cadastro de usuário</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  autoComplete='username'
                  placeholder="Usuário"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  autoComplete='new-password'
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      autoComplete='password'
                      placeholder="Senha"
                    />
                  </div>

                </div>
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
              <div className="row">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" data-bs-toggle="tab" href="#person-data" role="tab" aria-selected="true">
                    <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                    <span className="d-none d-sm-block">Dados Pessoais</span>    
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#address" role="tab" aria-selected="false">
                    <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                    <span className="d-none d-sm-block">Endereço</span>    
                    </a>
                  </li>
                </ul>

                <div className="tab-content p-3 text-muted">
                  <div className="tab-pane active" id="person-data" role="tabpanel">
                    
                    <p className="mb-0">
                      Raw denim you probably haven't heard of them jean shorts Austin.
                      Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
                      cliche tempor, williamsburg carles vegan helvetica. Reprehenderit
                      butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi,
                      qui irure terry richardson ex squid. Aliquip placeat salvia cillum
                      iphone. Seitan aliquip quis cardigan american apparel, butcher
                      voluptate nisi qui.
                    </p>
                  </div>
                  <div className="tab-pane" id="address" role="tabpanel">
                    <p className="mb-0">
                      Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                      single-origin coffee squid. Exercitation +1 labore velit, blog
                      sartorial PBR leggings next level wes anderson artisan four loko
                      farm-to-table craft beer twee. Qui photo booth letterpress,
                      commodo enim craft beer mlkshk aliquip jean shorts ullamco ad
                      vinyl cillum PBR. Homo nostrud organic, assumenda labore
                      aesthetic magna delectus.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12 text-end">
                  <button 
                    type="button" 
                    className="btn btn-danger me-1" 
                    data-bs-dismiss="modal"
                  >
                    <i className="bx bx-x me-1 align-middle"></i> 
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-success" 
                    data-bs-target="#success-btn" 
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

  )
}
