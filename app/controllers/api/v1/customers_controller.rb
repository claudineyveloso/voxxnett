# frozen_string_literal: true

module Api
  module V1
    # CustomersController
    class CustomersController < ApplicationController
      def index
        customers = Customer.includes(:people).all
        response_data = customers.map do |customer|
          {
            people_type: customer.people_type,
            phone: customer.phone,
            cell_phone: customer.cell_phone,
            observation: customer.observation,
            email: customer.email,
            active: customer.active,
            people: customer.people.as_json(only: %i[ first_name
                                                      last_name
                                                      cpf_cnpj
                                                      identity_municipal_registration
                                                      dispatcher
                                                      birthday_date]),
            addresses: customer.addresses.as_json(only: %i[ street
                                                            complement
                                                            neighborhood
                                                            city
                                                            state
                                                            zip_code]),
            status: :ok,
            code: 200

          }
        end
        render json: { data: response_data }
      end

      def new; end

      def edit; end

      def create; end

      def update; end

      def show; end

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
