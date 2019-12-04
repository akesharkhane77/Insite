var filesArray = [];


function handleRadioChange() {
	if (document.getElementById('r1').checked == true) {
		document.getElementById("filesForm").style.display = "none";
		document.getElementById("folderForm").style.display = "block";
	} else {
		document.getElementById("filesForm").style.display = "block";
		document.getElementById("folderForm").style.display = "none";
	}
}

function sendData() {

	document.getElementById("loader").style.display = "block";

	//setTimeout(spinner,5000);

	let form = (document.getElementById('r1').checked == true) ? document.getElementById("folderForm") : document.getElementById("filesForm");

	let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			spinner();
			console.log((this.responseText));
			document.getElementById("outputContent").innerHTML = this.responseText;
		}
	};

	xhttp.open("POST", "/testData", true);
	//xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	//xhttp.setRequestHeader("Content-Type", "multipart/form-data");
	var formData = new FormData(form);
	//formData.append('param', filesArray[0]);
	xhttp.send(formData);
}

function resetData() {
	document.getElementById('fileDisplay').style.display = "none";
	document.getElementById('display').style.display = "none";
	document.getElementById("outputContent").style.display = "none";
	document.getElementById("display").innerHTML = '';
	document.getElementById("fileItem").value = '';
	document.getElementById("folderItem").value = '';
	document.getElementById("r1").checked = "checked";
	handleRadioChange();
}

function spinner(){
	document.getElementById("loader").style.display = "none";
	document.getElementById("outputContent").style.display = "block";
}


function handleUpload(event) {
    document.getElementById('fileDisplay').style.display = "block";
    document.getElementById('display').style.display = "block";
	document.getElementById("display").innerHTML = '';
	
    // Get input element
	var myFileList = (event.target.id == "folderItem")?document.getElementById("folderItem"):document.getElementById("fileItem");
	for (var i = 0; i < myFileList.files.length; i++) {
		var fileName = myFileList.files[i].name.toLowerCase();
		if (fileName.endsWith(".csv")) {
			document.getElementById("display").innerHTML += '<li style="line-height: 25px"; "overflow-y:auto";>' + fileName + '</li>';
		}
	}
    
}
