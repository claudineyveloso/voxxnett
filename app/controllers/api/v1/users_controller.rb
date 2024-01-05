# frozen_string_literal: true

module Api
  module V1
    # UsersController
    class UsersController < ApplicationController
      before_action :set_user, only: %i[show edit update destroy]

      def index
        users = User.all
        render json: users, each_serializer: UserSerializer
      end

      def search
        filtered = User.where('email ILIKE ?', "%#{params[:filter]}%").order(email: :asc)
        render json: filtered, each_serializer: UserSerializer
      end

      def edit; end

      def update; end

      def show; end

      def destroy
        @user.destroy
        respond_with(@user)
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
                                     :salt,
                                     :encrypted_password)
        # customer_ids: [],
        # terminal_ids: [],
        # people_attributes: %i[id first_name last_name cpf_cnpj state_registration_identity dispatcher_organ],
        # addresses_attributes: %i[id description number_address complement neighborhood city state zip_code])
      end
    end
  end
end
