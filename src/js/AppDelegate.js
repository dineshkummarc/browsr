/*jsl:import coherent*/


/**
  class browsr.AppDelegate
  
  For simple applications, the AppDelegate may be all you need to configure and
  manage your application. As the last item in the responder chain, any un-handled
  action messages can be handled in this class.
  
  In addition, your AppDelegate may handle messages from the shared Application
  object including `applicationDidFinishLaunching` and `hash
*/
browsr.AppDelegate= Class.create(coherent.Controller, {

  /**
    browsr.AppDelegate#applicationDidFinishLaunching(app)
  
    - app (coherent.Application): The shared application that has finished launching
    
    When the application has finished launching and all resources are available,
    the shared Application will call this method. If you need to perform one-time
    initialisation of your application, this is probably the best place to do it.
  */
  applicationDidFinishLaunching: function(app)
  {
  },
  
  /**
    browsr.AppDelegate#hashDidChange(hashValue)
    
    - hashValue (String): The new value of the hash on the URL
    
    Your application can present bookmarkable content by using the hash portion
    of the URL. When the visitor uses the back button on his browser, this
    method will be notified of the change.
  */
  hashDidChange: function(hashValue)
  {
  },
  
  /**
    browsr.AppDelegate#findUserByEmail(sender)
    
    - sender(coherent.TextField): The text field that generated this action
    
    This method will call the browsr.User.findByEmail method to load the user
    with the given email address.
   */
  findUserByEmail: function(sender)
  {
    var email= sender.value();
    if (this.__email==email)
      return;
    this.__email= email;
    
    var d= browsr.User.findByEmail(email);
    d.addCallback(this.oncompleteFindUserByEmail, this);
    d.addErrorHandler(this.onfailedFindUserByEmail, this);
  },

  /**
    browsr.AppDelegate#oncompleteFindUserByEmail(user)
    
    - user(browsr.User): The user with the specified email address
    
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
    browsr.AppDelegate#onfailedFindUserByEmail(error)
    
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
