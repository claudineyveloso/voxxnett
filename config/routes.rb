# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
                                 sign_in: 'login',
                                 sign_out: 'logout',
                                 registration: 'signup'
                               },
                     controllers: {
                       sessions: 'api/v1/users/sessions',
                       registrations: 'api/v1/users/registrations'
                     }
  namespace :api do
    namespace :v1 do
      resources :customers, only: %i[index show edit create update destroy] do
        get '/:filter', to: 'customers#index', on: :collection, as: :customers_with_filter
      end

      resources :users, only: %i[index show edit create update destroy] do
        get '/:filter', to: 'users#index', on: :collection, as: :users_with_filter
        collection do
          post 'custom_create'
        end
      end
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
