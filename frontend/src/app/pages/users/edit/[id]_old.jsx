'use client'
import { useContext, useState } from "react"
import { useRouter } from 'next/navigation'
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import Link from "next/link"
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import HeaderVertical from "@/app/components/headerVertical/page"
import BrazilianStates from "@/app/components/brazilianStates";

export default function EditUserForm() {

  const userSchema = z.object({
    user_name: z.string().nonempty('Usuário não pode ficar vazio!'),
    email: z.string().email('Informe um endereço de e-mail válido!'),
    password: z.string().nonempty('A senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres.'),
    user_type: z.string().refine((valor) => {
      return valor.trim() !== "";
    }, {
      message: "Tipo de usuário não pode ficar vazio!",
    }),
  });

  const router = useRouter()

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
    user: userSchema,
    person: personSchema,
    address: addressSchema,
  });

  const { authenticated, handleLogin } = useContext(AuthContext)
  const [userData, setUserData] = useState({
    user: {
    user_name: '',
    email: '',
    user_type: '',
    password: '',
    people_attributes: [{ first_name: '', last_name: '', cpf_cnpj: '', identity_municipal_registration: '', dispatcher: '', birthday_date: '' }],
    addresses_attributes: [{ street: '', complement: '', neighborhood: '', city: '', state: '', zip_code: '' }],
    }

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

  const handleStateSelect = (selectedState) => {
    console.log('Estado selecionado:', selectedState);
    // Adicione a lógica para lidar com o estado selecionado, se necessário
  };

  const onSubmit = async (data) => {
    const objectState = {
      user: {
      email: data.user.email,
      user_name: data.user.user_name,
      user_type: data.user.user_type,
      password: data.user.password,
      people_attributes: [{ first_name: data.person.first_name, 
                last_name: data.person.last_name, 
                cpf_cnpj: data.person.cpf_cnpj, 
                identity_municipal_registration: data.person.identity_municipal_registration, 
                dispatcher: data.person.dispatcher, 
                birthday_date: data.person.birthday_date }],
      addresses_attributes: [{ street: data.address.street, 
                  complement: data.address.complement, 
                  neighborhood: data.address.neighborhood, 
                  city: data.address.city, 
                  state: data.address.state, 
                  zip_code: data.address.zip_code }],
        
      }
    }
    setUserData(objectState)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('voxxNettUseToken')}`,
      },
    };
    //debugger
    console.log('Claudiney Veloso', objectState)
    const apiUrl = 'http://localhost:3001'
    axios.post(`${apiUrl}/api/v1/users/custom_create`, JSON.stringify(objectState), config)
      .then(response => {
        console.log('Response:', response.data);
        router.push('/pages/users')
      })
      .catch(error => {
        console.error('Erro:', error);
        // Trate o erro conforme necessário
      });
  }

  return (
    <>
      <div id="layout-wrapper">
        <HeaderVertical />
      </div>
    </>
  )

}