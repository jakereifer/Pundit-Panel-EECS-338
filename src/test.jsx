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

  var options = {
    method: 'get',
    headers: {
        "Access-Control-Request-Headers": "*",
        "Access-Control-Request-Method": "*",
        tokens: {"subscription-key": "1b209a02877b88d918e8ad3522b9f0aa"}
    },
    mode: 'no-cors'
  }
async function test() {
await fetch("https://document-parser-api.lateral.io/?url=https://bleacherreport.com/articles/2790143-hue-jackson-reportedly-fired-by-browns-after-2-plus-seasons?utm_source=cnn.com&utm_medium=referral&utm_campaign=editorial", options)
  .then(function(response) {
      console.log(response.json());
  }).catch((e)=> console.log(e));
}
test();

ReactDOM.render(<ProfileList people={info} /> , document.getElementById('people-panel'));
