/*jsl:import coherent*/

browsr.API_KEY= '9fea5ae0c33065f2d421b258da9546ca';
browsr.API_URL= 'http://api.flickr.com/services/rest';
browsr.XHR_OPTIONS= {
  jsonp: "jsoncallback"
};

browsr.convertFlickrUserJson= function(userJson)
{
  return {
    id: userJson.id,
    iconserver: userJson.iconserver,
    iconfarm: userJson.iconfarm,
    username: Object.get(userJson, 'username._content'),
    realname: Object.get(userJson, 'realname._content'),
    location: Object.get(userJson, 'location._content'),
    photosUrl: Object.get(userJson, 'photosurl._content'),
    profileUrl: Object.get(userJson, 'profileUrl._content')
  };
};


(function()
{

  coherent.Application.shared.setMainNib("Main");

})();