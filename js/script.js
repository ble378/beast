console.log("HELLO");

App = Ember.Application.create();

function bandDate(hour, minute){
 return new Date(2013, 3, 20, hour, minute);
}

App.Band = Ember.Object.extend({
  hour: 0,
  minute: 0,
  name: "",
  link: "#",
  time: function(){
    return bandDate(this.get('hour'), this.get('minute'));
  }.property('hour', 'minute'),
  prettyTime: function(){
    var time = this.get('time');
    return "" + time.getHours() + ":" + time.getMinutes();
  }.property('time')
});

App.bands = [
  App.Band.create({hour: 15, minute: 30, 
                   name: "Anastasia Marov", 
                   link: "https://soundcloud.com/anastasia-markov"}),
  App.Band.create({hour: 16, name: "Scuba Parade",
                   link: "https://soundcloud.com/scuba-parade"}),
  App.Band.create({hour: 17, name: "Gigantic Ant",
                   link: "http://giganticant.bandcamp.com/"}),
  App.Band.create({hour: 18, name: "The Ddaydreamers",
                   link: "http://thedaydreamersmusic.com/epk"}),
  App.Band.create({hour: 19, name: "thickthickfunksludge"}),
  App.Band.create({hour: 20, name: "Rolltreppe",
                   link: "http://www.rolltreppemusic.com"}),
  App.Band.create({hour: 21, name: "Mod Gun",
                   link: "http://modgun.bandcamp.com"}),
  App.Band.create({hour: 22, name: "Day Job",
                   link: "http://dayjob.bandcamp.com"})
];

// App.bands[0].get('prettyTime');