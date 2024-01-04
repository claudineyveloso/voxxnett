# frozen_string_literal: true

# CustomerSerializer
class UserSerializer < ActiveModel::Serializer
  attributes :id, :user_name, :user_type, :email, :jti
  has_many :customers, serializer: CustomerSerializer
end
