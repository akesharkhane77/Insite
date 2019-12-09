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
	filesArray = [];
	let filesData = [];
	document.getElementById("loader").style.display = "block";

	//setTimeout(spinner,5000);

	let form = (document.getElementById('r1').checked == true) ? document.getElementById("folderForm") : document.getElementById("filesForm");
	filesData = [...form[0].files]; //Shallow Copy
	
	let xhttp = new XMLHttpRequest();
	//To get the names of checked files
	let checkboxes = document.getElementsByClassName("fileList");
	for(let i=0;i< checkboxes.length;i++){
		if(checkboxes[i].checked){
			filesArray.push(checkboxes[i].nextSibling.innerText);
		}
	}
	//To get the checked files data array
	let checkedFiles = []
	for(let i =0; i<filesData.length; i++){
		for(let j=0; j<filesArray.length; j++){
			if(filesArray[j] == filesData[i].name){
				checkedFiles.push(filesData[i]);
				break;
			}
		}
	}
	
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			spinner();
			document.getElementById("outputContent").innerHTML = this.responseText;
		}
	};

	xhttp.open("POST", "/testData", true);
	//xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	//xhttp.setRequestHeader("Content-Type", "multipart/form-data");
	let formData = new FormData();
	
	for(let entries of checkedFiles){
		formData.append("files[]", new Blob([entries]), entries.name);
	}
	//formData.append('param', filesData);
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
	document.querySelectorAll('input[type="submit"]')[0].disabled = true;
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
	let myFileList = (event.target.id == "folderItem")?document.getElementById("folderItem"):document.getElementById("fileItem");
	document.getElementById("display").innerHTML += '<ul id="sortable" class="unorderedList" ></ul>';
	for (let i = 0; i < myFileList.files.length; i++) {
		let fileName = myFileList.files[i].name;
		document.getElementById("sortable").innerHTML += '<li class="listItem" id="listItem' + i +'" draggable="true" ondragstart="dragStarted(event)" ondragover="draggingOver(event)" ondrop="dropped(event)" ondragleave="dragLeave(event)"></li>';
		//document.getElementById("listItem' + i + '")
		if (fileName.endsWith(".csv")) {

			document.getElementById("listItem"+i).innerHTML += '<input class="fileList" type="checkbox" id="fileList' + i + '" tabindex=' +i+ ' onchange="checkboxClicked()"><label for="fileList' + i +'">' + fileName + '</label><br>';
		}
	}
}

let source;

function dragStarted(event) {
	source = event.target;
	event.dataTransfer.setData("text/html", source);
}

function draggingOver(event) {
	event.preventDefault();
    let bounding = event.target.getBoundingClientRect();
    let offset = bounding.y + (bounding.height/2);
    if ( event.clientY - offset > 0 ) {
        event.target.style['border-bottom'] = 'solid 1px grey';
        event.target.style['border-top'] = '';
    } else {
        event.target.style['border-top'] = ' ';
        event.target.style['border-bottom'] = '';
    }
}

function dragLeave(event) {
	let target = event.target;
    target.style['border-bottom'] = '';
    target.style['border-top'] = '';
};

function dropped(event) {
	event.preventDefault();
    let target = event.target;
    if ( target.style['border-bottom'] !== '' ) {
        target.style['border-bottom'] = '';
        target.parentNode.insertBefore(source, event.target.nextSibling);
    } else {
        target.style['border-top'] = '';
        target.parentNode.insertBefore(source, event.target);
    }
}

function checkboxClicked(){
	var checkboxes = document.getElementsByClassName("fileList");
  var checkedOne = Array.prototype.slice.call(checkboxes).some(item => item.checked);

  document.querySelectorAll('input[type="submit"]')[0].disabled = true;
  if (checkedOne) {
    document.querySelectorAll('input[type="submit"]')[0].disabled = false;
  }
}

