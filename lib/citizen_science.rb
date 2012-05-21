require 'rubygems'
require 'httparty'
class CitizenScience
  include HTTParty
  base_uri 'http://localhost:3001/'

  # def initialize(u, p)
  #   @auth = {:username => u, :password => p}
  # end

  # which can be :friends, :user or :public
  # options[:query] can be things like since, since_id, count, etc.
  def random_sample(options={})
    options.merge!({:basic_auth => @auth})
    r = self.class.get("/fake_random_sample.json", options)
    return r.parsed_response
  end

  def classify(stuff)
    #Use 'stuff' to post back to citizen science
    # options = { :query => {:status => text}, :basic_auth => @auth }
    # self.class.post('/statuses/update.json', options)
  end
end