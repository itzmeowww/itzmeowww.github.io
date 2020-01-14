
function count_up(){
    var mhs = document.getElementById("countup");
    var from = "Apr 22, 2019 22:22:00";
    from = new Date(from).getTime();
    var now = new Date().getTime();
    var dtime = now - from;
    var days = Math.floor(dtime/(1000*60*60*24));
    var hours = Math.floor(dtime%(1000*60*60*24) / (1000*60*60));
    var mins = Math.floor((dtime % (1000 * 60 * 60)) / (1000 * 60));
    var secs = Math.floor((dtime % (1000 * 60)) / 1000);
    var ret = "We've been together for " + days + " Days " + hours + " Hours " + mins + " Mins " + secs + " Secs";
    mhs.innerHTML = ret;
};

setInterval(count_up,1000);