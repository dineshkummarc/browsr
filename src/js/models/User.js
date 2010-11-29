/*jsl:import coherent*/

flickr.User= Model("User", {

  keyDependencies: {
    profileImageUrl: ['id', 'iconserver', 'iconfarm']
  },
  
  id: String,
  username: String,
  realname: String,
  iconserver: String,
  iconfarm: Number,
  location: String,
  photosUrl: String,
  profileUrl: String,
  
  /**
    flickr.User#profileImageUrl() -> String
    
    Generate the url of the user's profile image based on the id, iconserver and 
    iconfarm properties. According to flickr, this has the following format:
    
    http://farm{icon-farm}.static.flickr.com/{icon-server}/buddyicons/{nsid}.jpg
   */
  profileImageUrl: function()
  {
    var id= this.id();
    var iconfarm= this.valueForKey('iconfarm');
    var iconserver= this.valueForKey('iconserver');
    return ['http://farm', iconfarm, '.static.flickr.com/', iconserver,
            '/buddyicons/', id, '.jpg'].join('');
  }
  
});

/**
  flickr.User.findByEmail(emailAddress) -> coherent.Deferred
  
  - emailAddress(String): the email address of the user we'd like to find
  
  Look up a user via his email address. This method returns an instance of
  coherent.Deferred and actually makes multiple calls to the flickr API behind
  the scenes.
 */  
flickr.User.findByEmail= function(emailAddress)
{
  //  Convert the flickr user profile JSON data into a User Model instance
  function oncompleteGetInfo(data)
  {
    var user= flickr.convertFlickrUserJson(data.person);
    return new flickr.User(user);
  }
  
  //  Kick off another XHR request with the ID to get the user's profile
  function oncompleteFindByEmail(data)
  {
    var id= Object.get(data, 'user.id');
    if (!id)
      return new Error("Could not find user");
      
    var d= XHR.get(flickr.API_URL, {
                   method: 'flickr.people.getInfo',
                   api_key: flickr.API_KEY,
                   user_id: id,
                   format: 'json'
                  }, flickr.XHR_OPTIONS);
    d.addCallback(oncompleteGetInfo);
    return d;
  }

  //  Kick off the first XHR request to look up the user's ID from his email address
  var d= XHR.get(flickr.API_URL, {
                  method: 'flickr.people.findByEmail',
                  api_key: flickr.API_KEY,
                  find_email: emailAddress,
                  format: 'json'
                }, flickr.XHR_OPTIONS);
  d.addCallback(oncompleteFindByEmail);
  return d;
}
