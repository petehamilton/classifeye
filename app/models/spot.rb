class Spot < ActiveRecord::Base
  validates_uniqueness_of :reference, :message => "must be unique"
  validates_uniqueness_of :url, :message => "must be unique"

  def image
    def remote_file_exists?()
      u = URI.parse(self.url)
      Net::HTTP.start(u.host, u.port) do |http|
        raise http
        return http.head(u.request_uri)['Content-Type'].start_with? 'image'
      end
    end
  end
end
