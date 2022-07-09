Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get 'main/index'
  root 'main#index'
  get '*path', to: 'main#index', via: :all
end
