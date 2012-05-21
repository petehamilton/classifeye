class SpotsController < ApplicationController

  def fake_random_sample
    tma = []
    File.readlines("lib/assets/test_urls.txt").each do |line|
      image = line.strip
      # reference = url.sub('http://chack.s3.amazonaws.com/','').sub('.jpg','')
      url = "http://www.inspiredpixel.net/openlabs/lowres/#{image}"
      tma += [{reference: image.sub(".jpg", ""), url: url}]
    end
    
    # ref = {reference: '20X_22004_49_256665F5-CB89-4114-8EDB-32F35B02A9CD', url: 'http://chack.s3.amazonaws.com/20X_22004_49_256665F5-CB89-4114-8EDB-32F35B02A9CD.jpg'}
    render json: tma.sample

  end

  def image
    @spot = Spot.find(params[:id])
    image = MiniMagick::Image.open(@spot.url)
    
    #Parameters
    hue = 142
    saturation = 92
    lightness = -30
    
    image.combine_options do |c|
      
      #Invert
      c.negate
      
      #Level adjustments to remove unecessary details
      c.level "15%,80%"
      
      #HSL Modifications
      c.modulate "#{hue},#{saturation},#{lightness}"
    end
    
    file = image.to_blob
    
    # file = Rails.cache.fetch("#{@spot.reference}.jpg") { file.to_blob }
    send_data file, :filename => "#{@spot.reference}.jpg", :type => 'image/jpeg'
  end

  def random_sample
    # require 'citizen_science'
    # c = CitizenScience.new
    # r = c.random_sample
    
    spots = []
    File.readlines("lib/assets/test_urls.txt").each do |line|
      image = line.strip.sub(".jpg", "")
      (0..24).each do |i|
        spots += ["#{image}.split#{i}"]
      end
    end
    
    
    rs = []
    spots.each do |s|
      url = "http://www.inspiredpixel.net/openlabs/split/#{s}.jpg"
      rs += [{reference: s, url: url}]
    end
    
    r = rs.sample
    # Find/Add a record for the new sample
    s = Spot.find_or_create_by_reference_and_url(r[:reference],r[:url])
    redirect_to spot_analyse_path(s)
  end

  def random_image
    s = Spot.all.sample
    redirect_to spot_image_path(s)
  end

  # The analysis page
  def analyse
    @spot = Spot.find(params[:id])

  end


  # GET /spots
  # GET /spots.json
  def index
    @spots = Spot.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @spots }
    end
  end

  # GET /spots/1
  # GET /spots/1.json
  def show
    @spot = Spot.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @spot }
    end
  end

  # GET /spots/new
  # GET /spots/new.json
  def new
    @spot = Spot.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @spot }
    end
  end

  # GET /spots/1/edit
  def edit
    @spot = Spot.find(params[:id])
  end

  # POST /spots
  # POST /spots.json
  def create
    @spot = Spot.new(params[:spot])

    respond_to do |format|
      if @spot.save
        format.html { redirect_to @spot, notice: 'Spot was successfully created.' }
        format.json { render json: @spot, status: :created, location: @spot }
      else
        format.html { render action: "new" }
        format.json { render json: @spot.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /spots/1
  # PUT /spots/1.json
  def update
    @spot = Spot.find(params[:id])

    respond_to do |format|
      if @spot.update_attributes(params[:spot])
        format.html { redirect_to @spot, notice: 'Spot was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @spot.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /spots/1
  # DELETE /spots/1.json
  def destroy
    @spot = Spot.find(params[:id])
    @spot.destroy

    respond_to do |format|
      format.html { redirect_to spots_url }
      format.json { head :no_content }
    end
  end
end
