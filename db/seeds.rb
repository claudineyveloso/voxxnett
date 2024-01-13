# frozen_string_literal: true

# ser1 = User.create(email: 'user1@example.com', password: 'password1',
#                     profile_attributes: { nome: 'João', sobrenome: 'Silva' },
#                     address_attributes: { logradouro: 'Rua A', complemento: 'Apto 101' })

User.create(
  user_name: 'claudineyveloso',
  email: 'claudineyveloso@gmail.com',
  user_type: 'administrador',
  password: '12345678',
  people_attributes: [{
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    cpf_cnpj: '45623456789',
    identity_municipal_registration: 'MG-4.345-009',
    dispatcher: 'SSPMG',
    birthday_date: Faker::Date.birthday(min_age: 18, max_age: 65)
  }],
  addresses_attributes: [{
    street: Faker::Address.street_name,
    neighborhood: Faker::Address.community,
    city: Faker::Address.city,
    state: %w[SP MG RJ GO RS].sample,
    zip_code: '30000-000'
  }]
)

2.times do
  Customer.create!(
    people_type: %w[fisica juridica].sample,
    phone: Faker::PhoneNumber.cell_phone,
    cell_phone: Faker::PhoneNumber.cell_phone,
    email: Faker::Internet.email,
    people_attributes: [{
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      cpf_cnpj: '45623456789',
      identity_municipal_registration: 'MG-4.345-009',
      dispatcher: 'SSPMG',
      birthday_date: Faker::Date.birthday(min_age: 18, max_age: 65)
    }],
    addresses_attributes: [{
      street: Faker::Address.street_name,
      complement: Faker::Address.city,
      neighborhood: Faker::Address.community,
      city: Faker::Address.city,
      state: %w[SP MG RJ GO RS].sample,
      zip_code: '30000-000'
    }]
  )
end

# user.customers << Customer.find(user_data[:roles_ids]) if user_data[:roles_ids].present?

# 130.times do
#   User.create(
#     user_name: "#{Faker::Name.first_name}""#{Faker::Name.last_name}",
#     email: Faker::Internet.email,
#     user_type: %w[administrador proprietario atendimento].sample,
#     password: '12345678',
#     people_attributes: [{
#       first_name: Faker::Name.first_name,
#       last_name: Faker::Name.last_name,
#       cpf_cnpj: '45623456789',
#       identity_municipal_registration: 'MG-4.345-009',
#       dispatcher: 'SSPMG',
#       birthday_date: Faker::Date.birthday(min_age: 18, max_age: 65)
#     }],
#     addresses_attributes: [{
#       street: Faker::Address.street_name,
#       neighborhood: Faker::Address.community,
#       city: Faker::Address.city,
#       state: %w[SP MG RJ GO RS].sample,
#       zip_code: '30000-000'
#     }]
#   )
# end

# 200.times do
#   Customer.create!(
#     people_type: %w[fisica juridica].sample,
#     phone: Faker::PhoneNumber.cell_phone,
#     cell_phone: Faker::PhoneNumber.cell_phone,
#     email: Faker::Internet.email,
#     people_attributes: [{
#       first_name: Faker::Name.first_name,
#       last_name: Faker::Name.last_name,
#       cpf_cnpj: '45623456789',
#       identity_municipal_registration: 'MG-4.345-009',
#       dispatcher: 'SSPMG',
#       birthday_date: Faker::Date.birthday(min_age: 18, max_age: 65)
#     }],
#     addresses_attributes: [{
#       street: Faker::Address.street_name,
#       neighborhood: Faker::Address.community,
#       city: Faker::Address.city,
#       state: %w[SP MG RJ GO RS].sample,
#       zip_code: '30000-000'
#     }]
#   )
# end

# CustomersUser.create!(customer_id: Customer.first.id, user_id: User.first.id)
