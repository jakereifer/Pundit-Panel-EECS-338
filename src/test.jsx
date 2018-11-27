var ReactDOM = require('react-dom');
var React = require('react');
const {promisify} = require("es6-promisify");
require('es6-promise').polyfill();
require('isomorphic-fetch');
var Tw = require('react-twitter-embed');
var Twitter = require('@frizz925/twitter');
var Twit = require('twit');

var T = new Twit({
  consumer_key: 'TEEtF0XAUzSruWglwxFTsKXsc',
  consumer_secret: 'ZmBLEn47ps2wzOfxuOPhLdi2ZuoIkcwCQejpQZABEqqsLDDCMa',
  access_token: '1054523630657458178-gcNM8MiQJuoWmViEMhiBUKD8qzMN7r',
  access_token_secret: 'XAXNtQHXLbpblvAVTRyU0LngDFXJv7LQkfO4JMRUHH9O5'
});

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
      if (this.props.people.length > 0) {
      return (
      <div className="people">
             <h2>Our Pundits:</h2> 
             <div className="people-panel">
            { this.props.people.map((p,i) => 
              <Profile key={i} imgSource={p.imgSource} friendlyName={p.friendlyName} handle={p.handle} /> )
            }
            </div>
       </div>)
      }else {
        return <h1> NO PUNDITS </h1>
      }
    }

  }
  
  class MyTweets extends React.Component {
    render() { 
        if (this.props.ids.length > 0) {
          return (
            <div>
              {this.props.ids.map((id,j) => 
              <Tw.TwitterTweetEmbed tweetId={id} key={j}/>)}
            </div>
          )
        }
        else {
          return <h1> There are no tweets by our pundits! </h1>;
        }

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

var pundits = {
  "travel":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/798238483345240064/IrEN1eIc_400x400.jpg",
      friendlyName: "Nat Geo Travel",
      handle: "NatGeoTravel"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/3704055283/7830ca91dc1c7e34a27100568e628a93_400x400.png",
      friendlyName: "Travel + Leisure",
      handle: "TravelLeisure"
    },
  ],
  "technology and computing":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/972170159614906369/0o9cdCOp_400x400.jpg",
      friendlyName: "Elon Musk",
      handle: "elonmusk"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/969240943671955456/mGuud28F_400x400.jpg",
      friendlyName: "TechCrunch",
      handle: "TechCrunch"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/888061792630517761/OzaUjTz5_400x400.jpg",
      friendlyName: "Tech Insider",
      handle: "techinsider"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/1035649273721847809/B0f8n_oe_400x400.jpg",
      friendlyName: "Tim Cook",
      handle: "tim_cook"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X_400x400.jpg",
      friendlyName: "Bill Gates",
      handle: "BillGates"
    },
  ],
  "technology":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/972170159614906369/0o9cdCOp_400x400.jpg",
      friendlyName: "Elon Musk",
      handle: "elonmusk"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/969240943671955456/mGuud28F_400x400.jpg",
      friendlyName: "TechCrunch",
      handle: "TechCrunch"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/888061792630517761/OzaUjTz5_400x400.jpg",
      friendlyName: "Tech Insider",
      handle: "techinsider"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/1035649273721847809/B0f8n_oe_400x400.jpg",
      friendlyName: "Tim Cook",
      handle: "tim_cook"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X_400x400.jpg",
      friendlyName: "Bill Gates",
      handle: "BillGates"
    },
  ],
  "style":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/1038027161653927936/3SOWBypG_400x400.jpg",
      friendlyName: "NYFW",
      handle: "nyfw"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/537736236132474880/n0ugt0fg_400x400.jpeg",
      friendlyName: "Joan Rivers",
      handle: "Joan Rivers"
    },
  ],
  "sports":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/1027403255607746560/dIyhrGOz_400x400.jpg",
      friendlyName: "ESPN",
      handle: "espn"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/824007776489738241/pFk_8LLO_400x400.jpg",
      friendlyName: "FOX Sports",
      handle: "FOXSports"
    },
  ],
  "society":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/960856914132430848/p-G-U1jz_400x400.jpg",
      friendlyName: "Jake Tapper",
      handle: "jaketapper"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/477207730139049984/lUVfaw34_400x400.jpeg",
      friendlyName: "Megyn Kelly",
      handle: "megynkelly"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/801910537219088384/5j_VZ84y_400x400.jpg",
      friendlyName: "Nate Cohn",
      handle: "Nate_Cohn"
    },
  ],
  "shopping":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/949070360103698432/kXSiPeTk_400x400.jpg",
      friendlyName: "Amazon.com",
      handle: "amazon"
    },
  ],
  "science":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/378800000564879746/1b6204ccf804be6a180408c8f76ab923_400x400.png",
      friendlyName: "Science News",
      handle: "ScienceNews"
    },
  ],
  "religion":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/378800000564879746/1b6204ccf804be6a180408c8f76ab923_400x400.png",
      friendlyName: "Science News",
      handle: "ScienceNews"
    },
  ],
  "real estate":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/972170159614906369/0o9cdCOp_400x400.jpg",
      friendlyName: "Elon Musk",
      handle: "elonmusk"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/2044852218/NYT_Twitter_Krugman_400x400.png",
      friendlyName: "Paul Krugman",
      handle: "paulkrugman"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/991818020233404416/alrBF_dr_400x400.jpg",
      friendlyName: "Bloomberg",
      handle: "business"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/1231909459/C-thumbnail-copy_400x400.jpg",
      friendlyName: "Crain's Chicago",
      handle: "CrainsChicago"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/971415515754266624/zCX0q9d5_400x400.jpg",
      friendlyName: "The Wall Street Journal",
      handle: "WSJ"
    },
  ],
  "pets":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/840598231969079298/lY1uAFvx_400x400.jpg",
      friendlyName: "Pet Goals",
      handle: "PetGoals"
    },
  ],
  "personal finance":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/972170159614906369/0o9cdCOp_400x400.jpg",
      friendlyName: "Elon Musk",
      handle: "elonmusk"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/2044852218/NYT_Twitter_Krugman_400x400.png",
      friendlyName: "Paul Krugman",
      handle: "paulkrugman"
    },
  ],
  "nonstandard content":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/141128162/square_icon_400x400.png",
      friendlyName: "Know Your Meme",
      handle: "knowyourmeme"
    },
  ],
  "law and government and politics":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/960856914132430848/p-G-U1jz_400x400.jpg",
      friendlyName: "Jake Tapper",
      handle: "jaketapper"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/477207730139049984/lUVfaw34_400x400.jpeg",
      friendlyName: "Megyn Kelly",
      handle: "megynkelly"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/801910537219088384/5j_VZ84y_400x400.jpg",
      friendlyName: "Nate Cohn",
      handle: "Nate_Cohn"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/854112636287451138/8S0FsJtV_400x400.jpg",
      friendlyName: "Kellyanne Conway",
      handle: "KellyannePolls"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/1025494480303149056/TQxxSehL_400x400.jpg",
      friendlyName: "David Axelrod",
      handle: "davidaxelrod"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/668814368008708096/5HABV7bJ_400x400.png",
      friendlyName: "Nate Silver",
      handle: "NateSilver538"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/746059589146140672/ursN3OVD_400x400.jpg",
      friendlyName: "Ben Shapiro",
      handle: "benshapiro"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/967808988879482880/tCuE8jn9_400x400.jpg",
      friendlyName: "Michelle Obama",
      handle: "MichelleObama"
    },
  ],
  "illegal content":[],
  "health and fitness":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/875476478988886016/_l61qZdR_400x400.jpg",
      friendlyName: "World Health Organization (WHO)",
      handle: "WHO"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/591235840652619776/7Y6spghi_400x400.jpg",
      friendlyName: "FITNESS Magazine",
      handle: "FitnessMagazine"
    },
  ],
  "home and garden":[
     {
      imgSource: "https://pbs.twimg.com/profile_images/961608661494849536/zgTbBabS_400x400.jpg",
      friendlyName: "Sabrina Soto",
      handle: "sabrinasoto"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/591235840652619776/7Y6spghi_400x400.jpg",
      friendlyName: "FITNESS Magazine",
      handle: "FitnessMagazine"
    },],
  "hobbies and interests":[],
  "food and drink":[],
  "family and parenting":[],
  "education":[
  {
      imgSource: "https://pbs.twimg.com/profile_images/975787318954119168/Li0U1tnr_400x400.jpg",
      friendlyName: "Betsy Devos",
      handle: "betsydevosed"
    },
      {
      imgSource: "https://pbs.twimg.com/profile_images/682923684063870977/Cnr0_5cg_400x400.jpg",
      friendlyName: "Arne Duncan",
      handle: "arneduncan"
    },
     {
      imgSource: "https://pbs.twimg.com/profile_images/966837278617239552/XvOV8to6_400x400.jpg",
      friendlyName: "Randi Weingarten",
      handle: "rweingarten"
    },
    ],
  "careers":[

    {
      imgSource: "https://pbs.twimg.com/profile_images/2044852218/NYT_Twitter_Krugman_400x400.png",
      friendlyName: "Paul Krugman",
      handle: "paulkrugman"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/465901126684913664/sTJZxF5G_400x400.jpeg",
      friendlyName: "Indeed.com",
      handle: "Indeed"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/991818020233404416/alrBF_dr_400x400.jpg",
      friendlyName: "Bloomberg",
      handle: "business"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/1231909459/C-thumbnail-copy_400x400.jpg",
      friendlyName: "Crain's Chicago",
      handle: "CrainsChicago"
    },],
  "business":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/972170159614906369/0o9cdCOp_400x400.jpg",
      friendlyName: "Elon Musk",
      handle: "elonmusk"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/2044852218/NYT_Twitter_Krugman_400x400.png",
      friendlyName: "Paul Krugman",
      handle: "paulkrugman"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/991818020233404416/alrBF_dr_400x400.jpg",
      friendlyName: "Bloomberg",
      handle: "business"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/1231909459/C-thumbnail-copy_400x400.jpg",
      friendlyName: "Crain's Chicago",
      handle: "CrainsChicago"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/971415515754266624/zCX0q9d5_400x400.jpg",
      friendlyName: "The Wall Street Journal",
      handle: "WSJ"
    },
  ],
  "automotive":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/463796487604805632/lj-6WNq0_400x400.png",
      friendlyName: "Cars.com",
      handle: "carsdotcom"
    },
   {
      imgSource: "https://pbs.twimg.com/profile_images/972170159614906369/0o9cdCOp_400x400.jpg",
      friendlyName: "Elon Musk",
      handle: "elonmusk"
    },

    {
      imgSource: "https://pbs.twimg.com/profile_images/900399601282424832/sNDnYYZe_400x400.jpg",
      friendlyName: "Tesla Motors",
      handle: "Tesla"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/202644841/n650203102_2079561_8492-1_400x400.jpg",
      friendlyName: "David Shepardson",
      handle: "davidshepardson"
    },
  ],
  "arts and entertainment":[
    {
      imgSource: "https://pbs.twimg.com/profile_images/668939771914223616/EYUGQdtq_400x400.jpg",
      friendlyName: "Perez Hilton",
      handle: "PerezHilton"
    },
    
    {
      imgSource: "https://pbs.twimg.com/profile_images/900399601282424832/sNDnYYZe_400x400.jpg",
      friendlyName: "Taylor Swift",
      handle: "taylorswift13"
    },
    {
      imgSource: "https://pbs.twimg.com/profile_images/948698715220410368/EkNILtvi_400x400.jpg",
      friendlyName: "TMZ",
      handle: "TMZ"
    },
  ]
};

function getMax(classify) { // classify == the classification output from uClassify
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

const getUrl = () => new Promise((resolve, reject) => {
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function(tabs){
        var cururl=tabs[0].url;
        resolve(cururl);
})
});

const searchTwitter = (query) => new Promise((resolve,reject) => {
    T.get('search/tweets', { q: query, count: 10 }, function(err, data, response) {
      resolve(data);
    })
})

const searchTwitterUsers = (query, users) => new Promise((resolve,reject) => {
    for (var i = 0; i < pundits.length; i++) {
    //query keywords from handles
    
    
    tweetIds.concat(extract_ids(response));
 }
    searchTwitter()
})

function getPundits(classification){ // classification == the output for getMax

	var base_topic = classification.split("_")[0];
	//console.log(JSON.stringify(pundits));
	//console.log(pundits["automotive"]);
	return pundits[base_topic];
}
function queryBuilder(array) {
  var string = "";
  if (array.length == 1) {
    return array[0];
  }
  for(var i = 0; i < array.length; i++){
    if(i < array.length-1){
      string = string.concat(array[i], " OR ");
    } else{
      string = string.concat(array[i]);
    }
  }
  return string;
}
function extract_ids(array){
  var back_array = [];
  for(var i = 0; i < array.statuses.length; i++){
  back_array.push(array.statuses[i].id_str);
  }
  return back_array;
  }

  function getHandles(punditListTopic){
      var handles=[];
      for (var a=0; a<punditListTopic.length; a++) {
    handles.push(punditListTopic[a].handle);
    }
    return handles;
    }

function addPunditQuery(queryString, pundits) {
  if (pundits.length == 1) {
    return queryString.concat(" from:", pundit[0]);
  }
  for(var i = 0; i < pundits.length; i++){
    if(i < pundits.length-1){
      queryString = queryString.concat(" from:", pundits[i], " OR ");
    } else{
      queryString = queryString.concat(" from:", pundits[i]);
    }
  }
  return queryString;

}

getUrl().
  then((x) => {
    console.log(x);
    console.log("https://document-parser-api.lateral.io/?url=" + x);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://document-parser-api.lateral.io/?url=" + x, false);
    xhr.setRequestHeader("subscription-key", "02902c337eb01f2989400077cd196e37");
    xhr.send()
    console.log(xhr.responseText);
    var body = JSON.parse(xhr.responseText).body;
    var keywords = JSON.parse(xhr.responseText).keywords;
    var queryString = queryBuilder(keywords);
    console.log(queryString);

    if (body) {
        xhr.open("GET", "https://api.uclassify.com/v1/uClassify/IAB Taxonomy/classify/?readKey=WdFduIw0qrTL&text=" + body, false);
        xhr.send();
        console.log(xhr.responseText);
        var classification = JSON.parse(xhr.responseText);
        var result=getMax(classification);
        console.log("result:", result);
        var punditListTopic= getPundits(result);
        console.log(punditListTopic);
        ReactDOM.render(<ProfileList people={punditListTopic} /> , document.getElementById('people-panel'));
    }

    //var pundits = getHandles(punditListTopic);
    queryString = addPunditQuery(queryString, getHandles(punditListTopic));
    console.log("new query string:");
    console.log(queryString);
    return searchTwitter(queryString);
  })
  .then((x) => {
    console.log(x);
    var tweetIds = extract_ids(x);
    console.log(tweetIds);
    ReactDOM.render(<MyTweets ids={tweetIds}/> , document.getElementById("tweet-feed"));
         
    }
)