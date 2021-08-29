/*Created by Suzan Ejura*/
let pdfList = [];
let inputEl = document.getElementById("input-el");
const addnewpdfEl = document.getElementById("addnewpdf-el");
const savepdfEl = document.getElementById("savepdf-el")
const showallpdfEL =document.getElementById("showallpdf-el")
const deletepdfEL =document.getElementById("deletepdf-el")
let errorMessage = document.getElementById("error")
let resultContainer = document.getElementById("result-container")

/*show all pdfs in result container if any exists in the local storage*/
const linksFromLocalStorage = JSON.parse(localStorage.getItem("pdfList"));
console.log(linksFromLocalStorage);

if(linksFromLocalStorage){
	pdfList = linksFromLocalStorage;
	//renderpdfList(pdfList);
}


/*create new pdf file by inputing a title and getting pdf link from chrome tab*/
addnewpdfEl.addEventListener("click", createFileName)
function createFileName(){
	
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		let linkArr =  tabs[0].url 
		let newInput = {
			pdftitle : inputEl.value,
			pdflinks: linkArr
		}
		if(inputEl.value === ""){
			errorMessage.innerText = "* please enter a valid pdf title to save pdf";
			errorMessage.classList.add("error-message");
		}else if(inputEl.value !== " "){
			pdfList.push(newInput)
			inputEl.value = " ";
			localStorage.setItem("pdfList", JSON.stringify(pdfList))
		    //renderpdfList(pdfList)
		    errorMessage.innerText = "* PDF file added. You can click 'Show all PDF to access your file'";
		    errorMessage.classList.add("error-message");
		}
		
		
	});

}


/*this function when called will also display the pdf list in the pdfList array*/
 function renderpdfList (pdfs){
	let text = "";
	let value = "";
	   text = `<h2>All saved pdfs </h2>`
	   resultContainer.innerHTML = text
	   let row = pdfs.length;
	   for(var i = 0; i < row; i++){    
		  value = `<li><a href ='${pdfs[i].pdflinks}' target='_blank'>${pdfs[i].pdftitle}</a></li>`
		  resultContainer.innerHTML += value	
		  resultContainer.classList.add("result-container"); 			
	  		
	  	}

}

/*This function deletes all pdf in local storage and */
deletepdfEL.addEventListener("dblclick", deletePdfFiles)
function deletePdfFiles(){
	localStorage.clear();
	pdfList.splice(0, pdfList.length)
	resultContainer.innerText = "";
	resultContainer.classList.add("result-container");
}

/*This function display all pdf files available in the local storage*/
showallpdfEL.addEventListener("click", showAllPdf)
function showAllPdf(){
	if(pdfList.length === 0){
		errorMessage.innerText = "* no pdf file saved yet. You can save a new pdf by creating a new file";
		errorMessage.classList.add("error-message")
		
	}else{
		 renderpdfList(pdfList)
	}
	
}



//  function renderpdfList (Alllist){
// 	//let text = "";
// 	let value = "";
// 	 resultContainer.innerHTML = "";
// 	    let row = pdfList.length;
// 	  	for(var i = 0; i < row; i++){
// 	      let items = pdfList[i].pdflinks.length
// 	      text = `<h2>${pdfList[i].pdftitle} </h2>`
// 	      resultContainer.innerHTML += text
// 	  		 for(let j = 0; j < items; j++){
// 		  			value = `<li><a href ='${pdfList[i].pdflinks[j]}' target='_blank'>${pdfList[i].pdftitle}</a></li>`
// 		  			// console.log(value)
// 		  			 resultContainer.innerHTML += value	  			
	  
// 	  		  }
	  		
// 	  	}

// }


