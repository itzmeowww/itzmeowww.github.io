window.onload = function(){
    countUpFromDate("Apr 22, 2019 22:22:00", 'countup1');
}
function countUpFromDate(date,id){
    date = new Date(date).getTime();
    //console.log(date);
    var now = new Date().getTime();
    //console.log(now);
    var dtime = now - date;

    var days = Math.floor(dtime/(1000*60*60*24));
    var hours = Math.floor(dtime%(1000*60*60*24) / (1000*60*60));
    var mins = Math.floor((dtime % (1000 * 60 * 60)) / (1000 * 60));
    var secs = Math.floor((dtime % (1000 * 60)) / 1000);

    var counter = document.getElementById(id);
    counter.getElementsByClassName('days')[0].innerHTML = days;
    counter.getElementsByClassName('hours')[0].innerHTML = hours;
    counter.getElementsByClassName('minutes')[0].innerHTML = mins;
    counter.getElementsByClassName('seconds')[0].innerHTML = secs;

    var to = new Date("Jun 20, 2020 0:0:00").getTime();
    var bar = document.getElementById("myBar");   
    var dtime2 = to - now;
    //console.log(dtime2);
    var width = (1 - (dtime2/25621604792)*100);
    //console.log(width);
    bar.style.width = width + '%'; 
    

    clearTimeout(countUpFromDate.interval);
    countUpFromDate.interval = setTimeout(function(){ countUpFromDate(date, id); }, 1000);
}
