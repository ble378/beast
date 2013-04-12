console.log("HELLO");

App = Ember.Application.create();

function bandDate(hour, minute){
  return new Date(2013, 3, 20, hour, minute);
}

App.info = Ember.Object.create({
  now: null,
  tick: function(){
    this.set('now', new Date().getTime());
  }
});

App.Band = Ember.Object.extend({
  hour: 0,
  minute: 0,
  duration: 60, // in minutes
  name: "",
  link: "#",
  
  isCurrent: function(){
    var bandStart = this.get('time').getTime();
    var bandEnd = bandStart + this.get('duration')*60*1000;
    var now = App.info.get('now');
    if (now < bandEnd && now >= bandStart){
      return true;
    } else {
      return false;
    }
  }.property('App.info.now'),
  
  time: function(){
    return bandDate(this.get('hour'), this.get('minute'));
  }.property('hour', 'minute'),
                               
  prettyTime: function(){
    var time = this.get('time');
    var hours = time.getHours();
    var ampm = "am";
    if (hours > 12) {
      hours -= 12;
      ampm = "pm";
    }
    var minutes = ""+time.getMinutes();
    if (minutes.length != 2) { minutes = "0"+minutes; }
  return "" + hours + ":" + minutes;
  }.property('time')
});

App.bands = [
  App.Band.create({hour: 15, minute: 30, duration: 30,
                   name: "Anastasia Markov", 
                   link: "https://soundcloud.com/anastasia-markov"}),
  App.Band.create({hour: 16, name: "Scuba Parade",
                   link: "https://soundcloud.com/scuba-parade"}),
  App.Band.create({hour: 17, name: "Gigantic Ant",
                   link: "http://giganticant.bandcamp.com/"}),
  App.Band.create({hour: 18, name: "The Daydreamers",
                   link: "http://thedaydreamersmusic.com/epk"}),
  App.Band.create({hour: 19, name: "thickthickfunksludge"}),
  App.Band.create({hour: 20, name: "Rolltreppe",
                   link: "http://www.rolltreppemusic.com"}),
  App.Band.create({hour: 21, name: "Mod Gun",
                   link: "http://modgun.bandcamp.com"}),
  App.Band.create({hour: 22, name: "Day Job", duration: 30,
                   link: "http://dayjob.bandcamp.com"})
];

App.bandView = Ember.View.create({
  templateName: 'bands',
  bandsBinding: 'App.bands',
});

$(document).ready(function(){
  // update every minute
  var timer = setInterval(App.info.tick, 1000*60);
  App.info.tick();
  App.bandView.appendTo("#bands");
});

// App.bands[0].get('prettyTime');
