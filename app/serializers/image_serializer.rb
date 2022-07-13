class ImageSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :image_file

  def image_file
    if object.image_file.attached?
      {
        url: rails_blob_url(object.image_file)
      }
    end
  end
end
