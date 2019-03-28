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
	button.addEventListener("click",function(event){
		file.click();
	},false);
	file.addEventListener("change",function(event){
		const selected=event.target.files[0];
		video.src=URL.createObjectURL(selected);
		rootRef.child(selected.name).put(selected).then(function(snapshot){
			window.alert("ファイル: "+selected.name+"のサムネイルを作成します。");
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
		window.alert("サムネイルの作成が完了しました。");
	},false);
})();