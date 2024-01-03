# frozen_string_literal: true

# Customer
class Customer < ApplicationRecord
  has_many :people, as: :personable, dependent: :destroy
  has_many :addresses, as: :addressable, dependent: :destroy
  accepts_nested_attributes_for :people
  accepts_nested_attributes_for :addresses

  validates :people_type,
            presence: true

  validates :active,
            presence: true
end