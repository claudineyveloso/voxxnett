# frozen_string_literal: true

# PersonSerializer
class PersonSerializer < ActiveModel::Serializer
  attributes :id,
             :first_name,
             :last_name,
             :cpf_cnpj,
             :identity_municipal_registration,
             :dispatcher,
             :birthday_date
end
