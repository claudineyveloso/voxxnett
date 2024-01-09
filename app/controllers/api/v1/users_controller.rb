# frozen_string_literal: true

module Api
  module V1
    # UsersController
    class UsersController < ApplicationController
      before_action :set_user, only: %i[show update destroy]

      def index
        users = params[:filter].nil? ? User.where(is_active: true).all.order(email: :asc) : User.where('email ILIKE ?', "%#{params[:filter]}%").where(is_active: true).order(email: :asc)
        # users = User.all.order(email: :asc)
        render json: users, each_serializer: UserSerializer
      end

      def custom_create
        # binding.break
        user = User.create!(user_params)
        if user
          render json: {
            status: { code: 200, message: 'Signed up successfully.' }
          }
        else
          render json: {
            status: { code: 400, message: 'Unprocessable entity.' }
          }
        end
      end

      def edit; end

      def update
        if @user.update(user_params)
          render json: @user
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      def show
        render json: @user
      end

      def destroy
        @user.destroy
        head :no_content
      end

      private

      def set_user
        @user = User.find(params[:id])
      end

      def user_params
        params.require(:user).permit(:user_name,
                                     :is_active,
                                     :user_type,
                                     :email,
                                     :password,
                                     people_attributes: %i[id first_name last_name cpf_cnpj identity_municipal_registration dispatcher birthday_date],
                                     addresses_attributes: %i[id street complement neighborhood city state zip_code])

        # customer_ids: [],
        # terminal_ids: [],
        # people_attributes: %i[id first_name last_name cpf_cnpj state_registration_identity dispatcher_organ],
        # addresses_attributes: %i[id description number_address complement neighborhood city state zip_code])
      end
    end
  end
end
