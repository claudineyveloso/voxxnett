# frozen_string_literal: true

module Api
  module V1
    # CustomersController
    class CustomersController < ApplicationController
      def index
        customers = Customer.all
        render json: customers
      end

      def new; end

      def edit; end

      def create; end

      def update; end

      def show
        customer = Customer.find(params[:id])
        render json: customer
      end

      def destroy; end

      private

      def set_customer
        @customer = Customer.find(params[:id])
      end

      def company_params
        params.require(:customer).permit(:people_type,
                                         :cell_phone,
                                         :observation,
                                         :email,
                                         :active,
                                         people_attributes: %i[id first_name last_name cpf_cnpj identity_municipal_registration dispatcher birthday_date],
                                         addresses_attributes: %i[id street complement neighborhood city state zip_code])
      end

      def serialize_customers(customers)
        options = {
          data: {
            customers: %i[people_type cell_phone observation email active],
            people: %i[first_name last_name cpf_cnpj identity_municipal_registration dispatcher birthday_date],
            addresses: %i[street complement neighborhood city state zip_code]
          }
        }
        CustomerSerializer.new(customers, options).serializable_hash.to_json
      end

      # def load_bucket
      #   @buckets = Bucket.all.map { |bucket| [bucket.name, bucket.id] }
      # end
    end
  end
end
