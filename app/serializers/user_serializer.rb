# frozen_string_literal: true

# UserSerializer
class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :user_name, :user_type, :jti
end
