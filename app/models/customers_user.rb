# frozen_string_literal: true

# CustomersUser
class CustomersUser < ApplicationRecord
  belongs_to :customer
  belongs_to :user
end
