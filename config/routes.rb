Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # get 'main/index'
  root 'main#index'
  # get '*path', to: 'main#index', via: :all

  
  get "/image", to: 'images#index'
  post "/image", to: 'images#create'
  post '/search_by_url', to: 'images#reverse_image_url_search'
end
