# frozen_string_literal: true

# Address
class Address < ApplicationRecord
  belongs_to :addressable, polymorphic: true

  validates :street,
            length: { maximum: 100 },
            presence: true

  validates :neighborhood,
            :city,
            length: { maximum: 50 },
            presence: true

  validates :state,
            length: { maximum: 2 },
            presence: true

  validates :zip_code,
            length: { maximum: 15 },
            presence: true
end
