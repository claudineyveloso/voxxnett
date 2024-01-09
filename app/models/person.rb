# frozen_string_literal: true

# Person
class Person < ApplicationRecord
  belongs_to :personable, polymorphic: true

  validates :first_name,
            :last_name,
            length: { maximum: 100 },
            presence: true

  validates :birthday_date,
            presence: true

  def full_name
    [first_name, last_name].reject(&:blank?).join(' ')
  end
end
