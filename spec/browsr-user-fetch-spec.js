describe("User model", function() {
  
  it("can find a user by email address", function() {
    function oncompleteFindByEmail(user)
    {
      this.user= user;
    }
    
    runs(function(){
      var d= browsr.User.findByEmail('jeff@metrocat.org');
      d.addCallback(oncompleteFindByEmail, this);
    });
    
    waits(2000);
    
    runs(function(){
      expect(this.user).toBeInstanceOf(browsr.User);
      expect(this.user.username()).toBe("jeffwatkins");
      expect(this.user.id()).toBe("51164044@N00");
    });
  });
  
});