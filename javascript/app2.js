function bigger(){
	var bbt = document.getElementById("bbt")
	bbt.width+=5;
	bbt.height+=5;
}

function love(){
	var heart = document.getElementById("love");
	heart.src="pics/like.png";
	var nub = document.getElementById("nub");
	nub.innerHTML = Number(nub.innerHTML)+1;
	var likes = Number(nub.innerHTML);
	
	heart.width = 50+ likes/22;
	heart.height = 50 + likes/22;
	
	
	
}