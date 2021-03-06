(function(){
	"use strict";
	const button=document.getElementById("button");
	const canvas=document.getElementById("canvas");
	const file=document.getElementById("file");
	const thumbnail=document.getElementById("thumbnail");
	const video=document.getElementById("video");
	let n=0;
	let current=0;
	firebase.initializeApp({
		apiKey: "AIzaSyD5wEyPHtuScsz_09cCUpscuWwm3W0LzLo",
		authDomain: "thumb-gen.firebaseapp.com",
		databaseURL: "https://thumb-gen.firebaseio.com",
		messagingSenderId: "812938749873",
		projectId: "thumb-gen",
		storageBucket: "thumb-gen.appspot.com"
	});
	const storage=firebase.storage();
	const rootRef=storage.ref("root");
	let SELECTED_FILE=null;
	button.addEventListener("click",function(event){
		file.click();
	},false);
	file.addEventListener("change",function(event){
		let firstChild=null;
		while((firstChild=thumbnail.firstChild)!=null){
			thumbnail.removeChild(firstChild);
		}
		SELECTED_FILE=event.target.files[0];
		video.src=URL.createObjectURL(SELECTED_FILE);
		rootRef.child(Date.now()+"/"+SELECTED_FILE.name).put(SELECTED_FILE).then(function(snapshot){
			window.alert("ファイル: "+SELECTED_FILE.name+"のサムネイルを作成しました。");
			SELECTED_FILE=null;
		}).catch(function(error){
			window.alert("エラー\n"+error);
		});
	},false);
	video.addEventListener("loadeddata",function(event){
		this.currentTime=0;
		n=0;
	},false);
	video.addEventListener("loadedmetadata",function(event){
		canvas.height=video.videoHeight;
		canvas.width=video.videoWidth;
	},false);
	video.addEventListener("seeked",function(event){
		if(n<Math.floor(video.duration/5)){
			const context=canvas.getContext("2d");
			context.drawImage(video,0,0);
			const img=document.createElement("img");
			img.src=canvas.toDataURL();
			thumbnail.append(img);
			this.currentTime+=5;
			n++;
			return;
		}
	},false);
})();