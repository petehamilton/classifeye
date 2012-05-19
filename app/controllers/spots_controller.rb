class SpotsController < ApplicationController

  def fake_random_sample
    tma = []
    File.readlines("lib/assets/test_urls.txt").each do |line|
      url = line.strip
      reference = url.sub('http://chack.s3.amazonaws.com/','').sub('.jpg','')
      tma += [{reference: reference, url: url}]
    end

    render json: tma.sample

  end

  def image
    require 'open-uri'
    
    @spot = Spot.find(params[:id])
    file = Rails.cache.fetch("#{@spot.reference}.jpg") { open(@spot.url).read }
    send_data file, :filename => "#{@spot.reference}.jpg", :type => 'image/jpeg'
  end

  def random_sample
    require 'citizen_science'
    c = CitizenScience.new
    r = c.random_sample

    # Find/Add a record for the new sample
    s = Spot.find_or_create_by_reference_and_url(r["reference"],r["url"])
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
