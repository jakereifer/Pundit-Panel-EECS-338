'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactDOM = require('react-dom');
var React = require('react');

var _require = require('../url.js'),
    getUrl = _require.getUrl;

var _require2 = require("es6-promisify"),
    promisify = _require2.promisify;

require('es6-promise').polyfill();
require('isomorphic-fetch');

/*
 * A simple React component
*/

var Profile = function (_React$Component) {
  _inherits(Profile, _React$Component);

  function Profile() {
    _classCallCheck(this, Profile);

    return _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).apply(this, arguments));
  }

  _createClass(Profile, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'blockquote',
        { className: 'people' },
        React.createElement('img', { src: this.props.imgSource }),
        React.createElement(
          'p',
          { className: 'user_name' },
          this.props.friendlyName
        ),
        React.createElement(
          'a',
          { href: "https://twitter.com/" + this.props.handle + "?ref_src=twsrc%5Etfw", className: 'twitter-follow-button', 'data-show-count': 'false' },
          'Follow @',
          this.props.handle
        )
      );
    }
  }]);

  return Profile;
}(React.Component);
/*
  first get info in array and pass to profile list which renders each profile
*/

var ProfileList = function (_React$Component2) {
  _inherits(ProfileList, _React$Component2);

  function ProfileList() {
    _classCallCheck(this, ProfileList);

    return _possibleConstructorReturn(this, (ProfileList.__proto__ || Object.getPrototypeOf(ProfileList)).apply(this, arguments));
  }

  _createClass(ProfileList, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'people' },
        React.createElement(
          'h2',
          null,
          'Our Pundits:'
        ),
        React.createElement(
          'div',
          { className: 'people-panel' },
          this.props.people.map(function (p, i) {
            return React.createElement(Profile, { key: i, imgSource: p.imgSource, friendlyName: p.friendlyName, handle: p.handle });
          })
        )
      );
    }
  }]);

  return ProfileList;
}(React.Component);

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
}];

var header = {
  "Access-Control-Request-Headers": "*",
  "Access-Control-Request-Method": "*",
  "subscription-key": "02902c337eb01f2989400077cd196e37",
  "mode": 'no-cors'

  /*
  async function test() {
  await fetch(url, header)
    .then(function(response) {
        console.log(response);
    })
  }
  test();
  */

};function getMax(classify) {
  var max = 0;
  var maxgroup;
  var length = Object.keys(classify).length;
  for (var a = 0; a < length; a++) {
    if (Object.values(classify)[a] > max) {
      max = Object.values(classify)[a];
      maxgroup = Object.keys(classify)[a];
    }
  }
  return maxgroup;
}

var xhr = new XMLHttpRequest();

xhr.open("GET", "https://document-parser-api.lateral.io/?url=https://bleacherreport.com/articles/2790143-hue-jackson-reportedly-fired-by-browns-after-2-plus-seasons?utm_source=cnn.com&utm_medium=referral&utm_campaign=editorial", false);
xhr.setRequestHeader("Access-Control-Request-Headers", "*");
xhr.setRequestHeader("subscription-key", "02902c337eb01f2989400077cd196e37");
xhr.send();
console.log(xhr.responseText);

var body = JSON.parse(xhr.responseText).body;
xhr.open("GET", "https://api.uclassify.com/v1/uClassify/IAB Taxonomy/classify/?readKey=WdFduIw0qrTL&text=" + body, false);
xhr.setRequestHeader("Access-Control-Request-Headers", "*");
xhr.send();

console.log(xhr.responseText);

ReactDOM.render(React.createElement(ProfileList, { people: info }), document.getElementById('people-panel'));