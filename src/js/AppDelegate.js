/*jsl:import coherent*/


/**
  class flickr.AppDelegate
  
  For simple applications, the AppDelegate may be all you need to configure and
  manage your application. As the last item in the responder chain, any un-handled
  action messages can be handled in this class.
  
  In addition, your AppDelegate may handle messages from the shared Application
  object including `applicationDidFinishLaunching` and `hash
*/
flickr.AppDelegate= Class.create(coherent.Controller, {

  /**
    flickr.AppDelegate#applicationDidFinishLaunching(app)
  
    - app (coherent.Application): The shared application that has finished launching
    
    When the application has finished launching and all resources are available,
    the shared Application will call this method. If you need to perform one-time
    initialisation of your application, this is probably the best place to do it.
  */
  applicationDidFinishLaunching: function(app)
  {
  },
  
  /**
    flickr.AppDelegate#hashDidChange(hashValue)
    
    - hashValue (String): The new value of the hash on the URL
    
    Your application can present bookmarkable content by using the hash portion
    of the URL. When the visitor uses the back button on his browser, this
    method will be notified of the change.
  */
  hashDidChange: function(hashValue)
  {
  },
  
  /**
    flickr.AppDelegate#findUserByEmail(sender)
    
    - sender(coherent.TextField): The text field that generated this action
    
    This method will call the flickr.User.findByEmail method to load the user
    with the given email address.
   */
  findUserByEmail: function(sender)
  {
    var email= sender.value();
    if (this.__email==email)
      return;
    this.__email= email;
    
    var d= flickr.User.findByEmail(email);
    d.addCallback(this.oncompleteFindUserByEmail, this);
    d.addErrorHandler(this.onfailedFindUserByEmail, this);
  },

  /**
    flickr.AppDelegate#oncompleteFindUserByEmail(user)
    
    - user(flickr.User): The user with the specified email address
    
    After loading the user associated with the specified email address, this
    method stores the user in the user property (duh) and hides the user picker
    view.
   */
  oncompleteFindUserByEmail: function(user)
  {
    this.setValueForKey(user, 'user');
    this.userPicker.setVisible(false);
  },
  
  /**
    flickr.AppDelegate#onfailedFindUserByEmail(error)
    
    - error(Error): The error object that should explain what went wrong.
    
    This method is a total cop-out. It ought to display a meaningful error
    message for the visitor, instead it does nothing except log the error to the
    console.
   */
  onfailedFindUserByEmail: function(error)
  {
    console.error("Failed to find user:", error);
  }
  
});
