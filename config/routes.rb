Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'bands', to: 'bands#index'
    end
  end

  root 'api/v1/bands#index'
end
