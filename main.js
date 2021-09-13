prediction = "";
Webcam.set({
	width: 350,
	height: 300,
	image_format: "png",
	png_quality: 90
});
cam = document.getElementById("camera");
Webcam.attach(cam);

function take_snapshot(data_uri) {
	Webcam.snap(function (data_uri) {
		document.getElementById("result").innerHTML = '<img src="' + data_uri + '" id="pic">';
	});
}
console.log("ml5 verson" + ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/TVex412FL/model.json", model_loaded);

function model_loaded(data) {
	console.log(data);
	console.log("model start");
}

function speak() {
	var synth = window.speechSynthesis;
	speakSay = "the first predition is" + prediction;
	var utterThis = new SpeechSynthesisUtterance(speakSay);
	synth.speak(utterThis);
}

function identify() {
	img = document.getElementById("pic");
	classifier.classify(img, got_res)
}

function got_res(error, res) {
	if (error) {
		console.error(error);
	} else {
		console.log(res);
		document.getElementById("res_hand").innerHTML = res[0].label;
		prediction = res[0].label;
		speak();
		if (res[0].label == "ok") {
			document.getElementById("update_hand").innerHTML = "&#128076;";
		}
		if (res[0].label == "ups") {
			document.getElementById("update_hand").innerHTML = "&#128077;";
		}
		if (res[0].label == "2") {
			document.getElementById("update_hand").innerHTML = "&#9996;";
		}
	}
}