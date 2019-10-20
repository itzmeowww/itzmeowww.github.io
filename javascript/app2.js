function bigger(){
	var bbt = document.getElementById("bbt")
	bbt.width+=5;
	bbt.height+=5;
}


var allnub=0;
function love(add){
	var heart = document.getElementById("love");
	heart.src="pics/like.png";
	var nub = document.getElementById("nub");
	nub.innerHTML = Number(nub.innerHTML)+1+add;
	var likes = Number(nub.innerHTML);
	heart.width = 50+ likes/22;
	heart.height = 50 + likes/22;
	var updates = {};
	updates['love'] = likes;
	console.log(likes)
	console.log(updates);
	return firebase.database().ref().update(updates);
}
function m_over_love(){
	allnub = allnub+1;
}

function m_out_love(){
	love(allnub);
	allnub= 0 ;
}