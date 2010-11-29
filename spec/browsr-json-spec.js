/*jsl:import coherent*/

describe("evri.convertFlickrUserJson", function() {
  
  beforeEach(function(){
  
    this.USER= {
      "person": {
        "id": "51164044@N00",
        "nsid": "51164044@N00",
        "ispro": 0,
        "iconserver": "83",
        "iconfarm": 1,
        "path_alias": "jeffwatkins",
        "username": {
          "_content": "jeffwatkins"
        },
        "realname": {
          "_content": "Jeff Watkins"
        },
        "location": {
          "_content": "Seattle, WA, USA"
        },
        "photosurl": {
          "_content": "http:\/\/www.browsr.com\/photos\/jeffwatkins\/"
        },
        "profileurl": {
          "_content": "http:\/\/www.browsr.com\/people\/jeffwatkins\/"
        },
        "mobileurl": {
          "_content": "http:\/\/m.browsr.com\/photostream.gne?id=790583"
        },
        "photos": {
          "firstdatetaken": {
            "_content": "2009-01-17 12:33:05"
          },
          "firstdate": {
            "_content": "1232738682"
          },
          "count": {
            "_content": 200
          }
        }
      },
      "stat": "ok"
    };
    
  });
  
  it("should include id", function() {
    var json= browsr.convertFlickrUserJson(this.USER);
    expect(json).toHaveProperty('id');
  });
  
});