function createWanderingDiv() {
    var img, seed, vx, vy, left, top, counter, interval;

    var date = new Date();
    seed = date.getSeconds()/60+date.getMinutes()/60; 

    img = document.createElement('img');

    img.src = "bee.png";

    vx = seed*Math.random();
    vy = seed*Math.random();
    left = $(window).width()*Math.random();
    top  = $(window).height()*Math.random();
    img.style.position = "absolute";
    img.style.left = left + "px";
    img.style.top = top + "px";
    img.style.width = "100px";  // Make these match the image...
    img.style.height = "87px"; // ...or leave them out.
    img.onclick = function() {
      if (img.src.indexOf("bee")!=-1) {
        img.src = "falafel.png";
      } else {
        $("#dinobarf").toggle();
        $("#gemini").toggle();
      }
    }

    document.body.appendChild(img);

    counter = 100;
    interval = 50; // ms
    window.setTimeout(wanderAround, interval);

    function wanderAround() {

    --counter;
    if (counter < 0)
    {
        // Done; remove it
        document.body.removeChild(img);
    }
    else
    {
      // Animate a bit more
        
      vy += seed*Math.random()-0.5;
      left += Math.floor(vy);
      if (left < 0) {
        vy = -vy*1.1;
        left = 0;
      }
      if (left >= $(window).width()) {
        vy = -vy*1.1;
        left = $(window).width();
      }
      vx += seed*Math.random()-0.5;
      top  += Math.floor(vx);
      if (top < 0) {
        vx = -vx*1.1;
        top = 0;
      }
      if (top >= $(window).height()) {
        vx = -vx*1.1;
        top = $(window).height();
      }
      img.style.left = left + "px";
      img.style.top  = top  + "px";

      // Re-trigger ourselves
      window.setTimeout(wanderAround, interval);
    }
  }
}

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

  $("#dinobarf").hover(
    function() {this.src="dinobarf_purple.png";},
    function() {this.src="dinobarf.png";}
  );

  $("#dinobarf").click(function() {
    $("#gremlin1").toggle('slow');
    $("#preg").hide();
    $("#pregexplosion").hide();
    $("#pregbaby").hide();
    $("#notpreg").hide();
    $("#baby").hide();
    $("body").css("background-image","");
  });

  $("#gremlin1").hover(function() {
    $("#gremlin2").toggle();
  });

  $("#gremlin1").click(function() {
    $("#preg").toggle();
    $("#gremlin1").toggle();
  });

  $("#preg").click(function(){
    $("#preg").toggle();
    $("#pregexplosion").toggle();
  });

  $("#pregexplosion").click(function(){
    $("#pregexplosion").toggle();
    $("#pregbaby").toggle();
  });

  $("#pregbaby").click(function(){
    $("#pregbaby").toggle();
    $("#notpreg").toggle();
    $("#baby").toggle();
  });

  $("#notpreg").click(function(){
    $("#notpreg").toggle();
    $("#preg").toggle();
    $("#baby").toggle();
  });

  $("#baby").click(function(){
    $("#baby").toggle();
    $("#notpreg").toggle();
    $("#gremlin2").toggle();
  });

  $("#gremlin2").click(function(){
    createWanderingDiv();
  }); 

  $("#gemini").click(function(){
    $("body").css("background-image","url('squirrel.png')");
  });

});

// App.bands[0].get('prettyTime');
