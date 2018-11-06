var ReactDOM = require('react-dom');
var React = require('react');
const {getUrl} = require('../url.js');
const {promisify} = require("es6-promisify");
require('es6-promise').polyfill();
require('isomorphic-fetch');

/*
 * A simple React component
*/

class Profile extends React.Component {
    render() { 
      return  (
      <blockquote className="people"> 
          <img src={this.props.imgSource} /> 
          <p className="user_name">{this.props.friendlyName}</p>
          <a href={"https://twitter.com/" + this.props.handle + "?ref_src=twsrc%5Etfw"} className="twitter-follow-button" data-show-count="false">Follow @{this.props.handle}</a>
      </blockquote>)
    }
  }
  /*
    first get info in array and pass to profile list which renders each profile
  */
  
  class ProfileList extends React.Component {
    render() { 
      return (
      <div className="people">
             <h2>Our Pundits:</h2> 
             <div className="people-panel">
            { this.props.people.map((p,i) => 
              <Profile key={i} imgSource={p.imgSource} friendlyName={p.friendlyName} handle={p.handle} /> )
            }
            </div>
       </div>)
    }
  }
  
  /*
   * Render the above component into the div#app
   */
  var info = [{
    imgSource: "https://pbs.twimg.com/profile_images/1031996550556184578/Iqyxj6IZ_400x400.jpg",
    friendlyName: "Jake Reifer",
    handle: "J_reif97"
  }, {
   imgSource: "https://pbs.twimg.com/profile_images/1054526042134769664/DyNOEgZD_400x400.jpg",
    friendlyName: "Pundit Panel",
    handle: "PanelPundit"    
  }
  ];

  var header = {
        "Access-Control-Request-Headers": "*",
        "Access-Control-Request-Method": "*",
        "subscription-key": "02902c337eb01f2989400077cd196e37",
        "mode": 'no-cors'
}

/*
async function test() {
await fetch(url, header)
  .then(function(response) {
      console.log(response);
  })
}
test();
*/

function getMax(classify) {
  var max=0;
  var maxgroup;
  var length=Object.keys(classify).length;
  for (var a=0; a<length; a++) {
  if (Object.values(classify)[a]>max) {
  max=Object.values(classify)[a];
  maxgroup=Object.keys(classify)[a];
  }
  }
  return maxgroup;
}


var xhr = new XMLHttpRequest();

xhr.open("GET", "https://document-parser-api.lateral.io/?url=https://bleacherreport.com/articles/2790143-hue-jackson-reportedly-fired-by-browns-after-2-plus-seasons?utm_source=cnn.com&utm_medium=referral&utm_campaign=editorial", false);
xhr.setRequestHeader("Access-Control-Request-Headers", "*");
xhr.setRequestHeader("subscription-key", "02902c337eb01f2989400077cd196e37");
xhr.send();
var body = JSON.parse(xhr.responseText).body;
xhr.open("GET", "https://api.uclassify.com/v1/uClassify/IAB Taxonomy/classify/?readKey=WdFduIw0qrTL&text=" + body, false);
xhr.setRequestHeader("Access-Control-Request-Headers", "*");
xhr.send();
var classification = JSON.parse(xhr.responseText).body;



ReactDOM.render(<ProfileList people={info} /> , document.getElementById('people-panel'));
