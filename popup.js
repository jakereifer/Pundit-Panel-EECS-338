import React from 'react';
import ReactDOM from 'react-dom';

React.render(<h1>TEST!</h1>, document.getElementById('test'))

class Profile extends React.Component {
  render() { return (
    <blockquote class="people"> 
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
    <div class="people">
   		<h2>Our Pundits:</h2> 
   		<div class="people-panel">
          { this.props.people.map(p => 
            <Profile imgSource={p.imgSource} friendlyName={p.friendlyName} handle={p.handle} /> )
          }
  		</div>
 	</div>)
  }
}