# frozen_string_literal: true

# User
class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :customers_users
  has_many :customers, through: :customers_users

  # enum user_type: { Administrador: 1, Proprietário: 2, Atendimento: 3 }

  # def display_user_type
  #   case user_type
  #   when 1
  #     'Administrator'
  #   when 2
  #     'Proprietário'
  #   else
  #     'Atendimento'
  #   end
  # end
end
