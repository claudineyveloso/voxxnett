# frozen_string_literal: true

# CustomerSerializer
class CustomerSerializer
  include JSONAPI::Serializer
  attributes  :people_type,
              :phone,
              :cell_phone,
              :observation,
              :email,
              :active
end
