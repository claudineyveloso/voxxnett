# frozen_string_literal: true

# AddressSerializer
class AddressSerializer < ActiveModel::Serializer
  attributes :id,
             :street,
             :complement,
             :neighborhood,
             :city,
             :state,
             :zip_code
end
