# frozen_string_literal: true

# PeopleSerializer
class PersonSerializer
  include JSONAPI::Serializer
  attributes  :first_name,
              :last_name,
              :cpf_cnpj,
              :identity_municipal_registration,
              :dispatcher,
              :birthday_date
end
