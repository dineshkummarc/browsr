/*jsl:import coherent*/

browsr.Photo= Model("Photo", {

  keyDependencies: {
    tinyImageUrl: ['id', 'secret', 'server', 'farm'],
    thumbnailImageUrl: ['id', 'secret', 'server', 'farm'],
    smallImageUrl: ['id', 'secret', 'server', 'farm'],
    mediumImageUrl: ['id', 'secret', 'server', 'farm'],
    largeImageUrl: ['id', 'secret', 'server', 'farm'],
    veryLargeImageUrl: ['id', 'secret', 'server', 'farm']
  },
    
  id: String,
  secret: String,
  server: String,
  farm: Number,
  title: String,
  datetaken: Date,

  tinyImageUrl: function()
  {
    return this.__tinyImageUrl ||
           (this.__tinyImageUrl=this.urlOfImageWithSize(browsr.Photo.SizeTiny));
  },
  
  thumbnailImageUrl: function()
  {
    return this.__thumbnailImageUrl ||
           (this.__thumbnailImageUrl=this.urlOfImageWithSize(browsr.Photo.SizeThumbnail));
  },

  smallImageUrl: function()
  {
    return this.__smallImageUrl ||
           (this.__smallImageUrl=this.urlOfImageWithSize(browsr.Photo.SizeSmall));
  },

  mediumImageUrl: function()
  {
    return this.__mediumImageUrl ||
           (this.__mediumImageUrl=this.urlOfImageWithSize(browsr.Photo.SizeMedium));
  },

  largeImageUrl: function()
  {
    return this.__largeImageUrl ||
           (this.__largeImageUrl=this.urlOfImageWithSize(browsr.Photo.SizeLarge));
  },

  veryLargeImageUrl: function()
  {
    return this.__veryLargeImageUrl ||
           (this.__veryLargeImageUrl=this.urlOfImageWithSize(browsr.Photo.SizeVeryLarge));
  },
  
  /**
    browsr.Photo#urlOfImageWithSize(size) -> String
    
    * size(flick.Photo.Size): The constant identifying the size of the image
    
    This method creates a URL for the image with the specified size according to
    the general photo URL rule:
    
    http://farm{farm-id}.static.browsr.com/{server-id}/{id}_{secret}[_{size}].jpg
   */
  urlOfImageWithSize: function(size)
  {
    return ['http://farm', this.farm(), '.static.flickr.com/', this.server(),
            '/', this.id(), '_', this.secret(),
            (size!==browsr.Photo.SizeMedium ? '_'+size : ''),
            '.jpg'].join('');
  }
  
});

Object.extend(browsr.Photo, {

  SizeTiny: 's',
  SizeThumbnail: 't',
  SizeSmall: 'm',
  SizeMedium: '-',
  SizeLarge: 'z',
  SizeVeryLarge: 'b'
  
});
