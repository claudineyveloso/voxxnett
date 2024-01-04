# frozen_string_literal: true

# CustomerSerializer
class CustomerSerializer < ActiveModel::Serializer
  attributes :id,
             :people_type,
             :phone,
             :cell_phone,
             :observation,
             :email,
             :active
  has_many :people, serializer: PersonSerializer
  has_many :addresses, serializer: AddressSerializer
end
