class DirectoryWidget
  constructor: (@configs) ->
    @FULL_WIDTH = 910
    @LARGE_WIDTH = 768
    @MEDIUM_WIDTH = 525
    @SMALL_WIDTH = 400

    @widget = $('#'+@configs.widgetId)
    @expand = @configs.expandOption || 'first_open'
    @cpnsUrl = @configs.cpnsUrl
    @clientUrn = @configs.clientUrn
    @table = @widget.find('.directory-table')
    @headers =  @widget.find('.directory-heading')

    @initResize()
    @initHeaders()
    @initPhones()
    @initIE()
    @openHeaders()

  initHeaders: ->
    @headers.on 'click', ((e)->
      header = $(e.currentTarget)
      isOpen = header.hasClass('open')
      locations = header.next('.directory-locations')
      if isOpen
        header.removeClass('open')
        locations.removeClass('open')
        locations.css({'max-height': 0})
      else
        header.addClass('open')
        locations.addClass('open')
        lHeight = locations.find('table').height()
        locations.css({'max-height': lHeight+100})
    )

  openHeaders: ->
    if @headers && @headers.length
      if @expand == 'first_open'
        @headers[0].click()
      else if @expand == 'all_open'
        @headers.each ->
          $(this).click()

  initResize: ->
    $(window).on 'resize orientationchange', =>
      @resize()
    @resize()

  resize: ->
    parentContainer = @table.parent('.widget')
    parentWidth = parentContainer.width()
    if parentWidth >= @FULL_WIDTH
      @setSizeClass('full')
    else if parentWidth >= @LARGE_WIDTH
      @setSizeClass('large')
    else if parentWidth >= @MEDIUM_WIDTH
      @setSizeClass('medium')
    else if parentWidth >= @SMALL_WIDTH
      @setSizeClass('small')
    else
      @setSizeClass('tiny')
    @resizeHeaders()

  resizeHeaders: ->
    @headers.each (idx, elem)->
      header = $(elem)
      if header.hasClass('open')
        locations = header.next('.directory-locations')
        locations.css({'max-height': 'none'})
        return


  setSizeClass: (size)->
    if !@table.hasClass(size)
      @clearSizeClasses()
      @table.addClass(size)

  clearSizeClasses: ->
    @table.removeClass('tiny').removeClass('small').removeClass('medium').removeClass('large').removeClass('full')

  initPhones: ->
    @phoneNumber = new PhoneNumber(@getPhoneConfigs())

  getPhoneConfigs: ->
    phoneConfigs =
      cpnsUrl: @cpnsUrl,
      clientUrn: @clientUrn,
      locationUrns: @locationUrns()

  locationUrns: ->
    @widget.find('.directory-row').map (idx, elem)=>
      locUrn = $(elem).attr('data-location-urn')
      return { urn: locUrn, scope: "tr[data-location-urn=#{locUrn}]" }

  initIE: ->
    @table.addClass('isIE') if @isIE()

  isIE: ->
    userAgent = navigator.userAgent
    !!(userAgent.match(/iemobile/i) || userAgent.match(/msie/i) || userAgent.match(/trident/i))

G5.loadWidgetConfigs('.directory .config', DirectoryWidget)

