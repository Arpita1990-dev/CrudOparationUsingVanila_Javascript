var selectedRow = null;
var el = document.getElementById('name_list');
var names = [];
var data = '';

ListAll();
function ListAll() {
	 // Creating Our XMLHttpRequest object
	 let xhr = new XMLHttpRequest();
 
	 // Making our connection 
	 var url = 'http://localhost:3000/data';
	 xhr.open("GET", url, true);
  
	 // function execute after request is successful
	 xhr.onreadystatechange = function () {
		 if (this.readyState == 4 && this.status == 200) {

			 names =  JSON.parse( this.responseText)  ;
			 console.log(names);
			 
	if (names.length > 0) {
		for (i = 0; i < names.length; i++) {

let stringfy = '';

			data += '<tr>';
			data += '<td>' + names[i].courseid + '</td>' + '<td>' + names[i].coursename + '</td>' + '<td>' + names[i].category + '</td>' + '<td>' + names[i].description + '</td>' ;
			data +=  `<td colspan="2"><a href="#" onClick='onEdit(this)'>Edit</a>
            <a href="#" onClick='onDelete(this)'>Delete</a><td>`;
		}
	}
	
	el.innerHTML = data;
		 }
	 }
	 // Sending our request
	 xhr.send();

};
function onFormSubmit(e){
    event.preventDefault();
    var formData = readFormData();
    if(selectedRow === null){
        insertNewRecord(formData);
    }else{
        updateRecord(formData)
    }
    resetForm();
    }
// Read operation using this function
function readFormData(){
    var formData = {};
    formData["Courseid"] = document.getElementById("Courseid").value;
    formData["coursename"] = document.getElementById("coursename").value;
    formData["category"] = document.getElementById("category").value;
    formData["description"] = document.getElementById("description").value;
    return formData;
}

// Create operation
function insertNewRecord(data){
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.Courseid;
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.coursename;
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.category;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.description;
    var cell5 = newRow.insertCell(4);
        cell5.innerHTML = `<a href="#" onClick='onEdit(this)'>Edit</a>
                        <a href="#" onClick='onDelete(this)'>Delete</a>`;

                        let  datain = {};

datain = {
        "courseid": data.Courseid,
        "coursename": data.coursename,
        "category": data.category,
        "description": data.description
    }

		let postdata = JSON.stringify(datain);

	let url = 'http://localhost:3000/createui';
	var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function()
        {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                alert(xmlHttp.responseText);
            }
        }
        xmlHttp.open("post", url,true); 
		xmlHttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8')

        xmlHttp.send(postdata);

}

// To Reset the data of fill input
function resetForm(){
    document.getElementById('Courseid').value = '';
    document.getElementById('coursename').value = '';
    document.getElementById('category').value = '';
    document.getElementById('description').value = '';
    selectedRow = null;
}

// For Edit operation
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('Courseid').value = selectedRow.cells[0].innerHTML;
    document.getElementById('coursename').value = selectedRow.cells[1].innerHTML;
    document.getElementById('category').value = selectedRow.cells[2].innerHTML;
    document.getElementById('description').value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.Courseid;
    selectedRow.cells[1].innerHTML = formData.coursename;
    selectedRow.cells[2].innerHTML = formData.category;
    selectedRow.cells[3].innerHTML = formData.description;

    let  datatobeedited = {};

	datatobeedited = {
        "courseid": formData.Courseid,
        "coursename": formData.coursename,
        "category": formData.category,
        "description": formData.description
    }

		let postdata = JSON.stringify(datatobeedited)

	let url = `http://localhost:3000/update/${formData.Courseid}`;
	var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function()
        {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                alert(xmlHttp.responseText);
            }
        }
        xmlHttp.open("put", url,true); 
		xmlHttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8')

        xmlHttp.send(postdata); 
}
function onDelete(td){
    if(confirm('Are you sure you want to delete this record?')){
        row = td.parentElement.parentElement;
        document.getElementById('Courseid').value = row.cells[0].innerHTML;
        document.getElementById('employeeList').deleteRow(row.rowIndex);
        resetForm();
let courseid = row.cells[0].innerHTML ;
        let url = `http://localhost:3000/delete/${courseid}`;
        var xmlHttp = new XMLHttpRequest();

        let  datatobeedited = {};

        datatobeedited = {
            "courseid": row.cells[0].innerHTML,
            "coursename": row.cells[1].innerHTML,
            "category": row.cells[2].innerHTML,
            "description": row.cells[3].innerHTML
        }
    
            let postdata = JSON.stringify(datatobeedited);


            xmlHttp.onreadystatechange = function()
            {
                if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
                {
                    alert(xmlHttp.responseText);
                }
            }
            xmlHttp.open("delete", url,true); 
            xmlHttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    
            xmlHttp.send(postdata); 


    }    
}