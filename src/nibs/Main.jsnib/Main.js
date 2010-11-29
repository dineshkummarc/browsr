/*jsl:import coherent*/
/*jsl:import ../../js/AppDelegate.js*/

NIB('Main', {

  'Main': VIEW({
  
    ':root': coherent.View({
      //  Set up necessary bindings and configuration information for your
      //  root view here.
    }),
    
    '#user-picker': coherent.View({
      animate: {
        visible: 500
      }
    }),
    
    '#user-picker input': coherent.TextField({
      placeholder: 'you@example.com',
      action: 'findUserByEmail',
      target: 'AppDelegate'
    })
    
  }),


  //  Instantiate your AppDelegate and configure it.
  AppDelegate: browsr.AppDelegate({
    //  Place configuration options for your application delegate here
    userPicker: REF('Main #user-picker')
  }),

  
  //  For the main interface bundle, the owner is the Application itself 
  owner:
  {
    //  Connect your AppDelegate to the Application as a delegate
    delegate: REF('AppDelegate')
  }
  
});