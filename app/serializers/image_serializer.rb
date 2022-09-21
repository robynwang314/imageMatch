class ImageSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :image_url, :host_url

  def image_url
    if object.image_file.attached?
      rails_blob_path(object.image_file)
    end
  end

  def host_url
    if object.image_file.attached?
      rails_blob_url(object.image_file)
    end
  end
end
