# frozen_string_literal: true

# AddressSerializer
class AddressSerializer
  include JSONAPI::Serializer
  attributes  :street,
              :complement,
              :neighborhood,
              :city,
              :state,
              :zip_code
end
