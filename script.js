window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js')
        console.log('Service worker register success', reg)
      } catch (e) {
        console.log('Service worker register fail')
        console.error(e)
      }
    }
})
    
    
    const selectAllCheckbox = document.querySelector('.select-all');

    selectAllCheckbox.addEventListener('change', function() {
        const rows = Array.from(document.querySelectorAll('table tr')).slice(1);
        
        const checkboxes = rows.map(function(row) {
            return row.children[0].querySelector('input[type="checkbox"]');
        });
        
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });

    var openButton = document.getElementById("add");
    openButton.addEventListener("click", function() {
        document.querySelector(".header-form").textContent = "Add students";
        document.querySelector(".popup").style.display = "flex";

        var inputs = document.querySelectorAll('.popup-content input');
        inputs.forEach(function(input) {
            input.value = '';
        });
    })

    document.getElementById("close").addEventListener("click", function() {
        document.querySelector(".popup").style.display = "none";
    })


    var clearField = document.getElementById('clearFields');
    clearField.addEventListener('click', function() {
        var inputs = document.querySelectorAll('.popup-content input');
        inputs.forEach(function(input) {
            input.value = '';
        });
    });

    var firstNameError = document.getElementById('first-name-error');
    var lastNameError = document.getElementById('last-name-error');
    var dateValueError = document.getElementById('date-value-error');

    var submitNameError = document.getElementById('submit-error');

    function validateName() {
        var firstNameValue = document.getElementById('input-first-name').value;

        if(firstNameValue == 0) {
            firstNameError.innerHTML = "First name cannot be empty";
            return false;
        }
        if(!firstNameValue.match(/^[A-Z][a-z]+(?:-[A-Z][a-z]+)*$/)) {
            firstNameError.innerHTML = "Write correct first name";
            return false;
        }
        firstNameError.innerHTML = '<i class="fa-solid fa-circle-check fa-2x" style="margin-top: 10px;"></i>';
        return true;
    }

    function validateLastName() {
        var lastNameValue = document.getElementById('input-last-name').value;
        if(lastNameValue == 0) {
            lastNameError.innerHTML = "Last name cannot be empty";
            return false;
        }
        if(!lastNameValue.match(/^[A-Z][a-z]+(?:-[A-Z][a-z]+)*$/)) {
            lastNameError.innerHTML = "Write correct first name";
            return false;
        }
        lastNameError.innerHTML = '<i class="fa-solid fa-circle-check fa-2x" style="margin-top: 10px;"></i>';
        return true;
    }

    function validateDate() {
        var dateNameValue = document.getElementById('input-date').value;

        var date = new Date(document.getElementById('input-date').value);

        var minDate = new Date(1924, 0, 1);
        var maxDate = new Date(2005, 11, 31);

        if (dateNameValue == 0) {
            dateValueError.innerHTML = "Date cannot be empty";
            return false;
        }

        if (date < minDate || date > maxDate) {
            dateValueError.innerHTML = "Write correct date";
            return false;
        }
        dateValueError.innerHTML = '<i class="fa-solid fa-circle-check fa-2x" style="margin-top: 10px;"></i>';
        return true;
    }




    var okButton = document.querySelector('.ok-button');
    okButton.addEventListener('click', function() {

    var groupValue = document.getElementById('input-group').value;
    var firstNameValue = document.getElementById('input-first-name').value;
    var lastNameValue = document.getElementById('input-last-name').value;
    var genderValue = document.getElementById('input-gender').value;
    var dateNameValue = document.getElementById('input-date').value;

    if (!validateName() || !validateLastName() || !validateDate()) {
        return;
    }


    if (genderValue === 'Female') {
        genderValue = 'F';
    } else if (genderValue === 'Male') {
        genderValue = 'M';
    }

    if (document.querySelector(".header-form").textContent === "Add students") {
        
    if (!localStorage.getItem('tableData')) {
        localStorage.setItem('tableData', JSON.stringify([]));
    }
    var table = document.getElementById('myTable');
    var newRow = table.insertRow();

    addUniqueIdToRow(newRow);
    try {
        var tableData = JSON.parse(localStorage.getItem('tableData')) || [];
        var newRowData = {
            group: groupValue,
            firstName: firstNameValue,
            lastName: lastNameValue,
            gender: genderValue,
            date: dateNameValue,
            id: newRow.id
        };
        tableData.push(newRowData);
        localStorage.setItem('tableData', JSON.stringify(tableData));
      } catch (error) {
        console.error("Помилка розбору даних localStorage:", error);
      
        // Очистити localStorage, якщо розбір не вдався
        localStorage.removeItem('tableData');
      }




    var cell0 = document.createElement("td");
    cell0.classList.add("cell-checkbox");
    cell0.innerHTML = '<input type="checkbox" class="group-select">';
    newRow.appendChild(cell0);


    var cell1 = document.createElement("td");
    cell1.classList.add("cell-group");
    cell1.innerHTML = groupValue;
    newRow.appendChild(cell1);

    var cell2 = document.createElement("td");
    cell2.classList.add("name");
    cell2.innerHTML = firstNameValue + " " + lastNameValue;
    newRow.appendChild(cell2);

    var cell3 = document.createElement("td");
    cell3.classList.add("cell-gender");
    cell3.innerHTML = genderValue;
    newRow.appendChild(cell3);

    var cell4 = document.createElement("td");
    cell4.classList.add("birthday");
    cell4.innerHTML = dateNameValue;
    newRow.appendChild(cell4);

    var cell5 = document.createElement("td");
    cell5.classList.add("cell-status");
    cell5.innerHTML = '<img src="../img/online.png" alt="Status: online" width="20" height="20">';
    newRow.appendChild(cell5);

    var cell6 = document.createElement("td");
    cell6.classList.add("cell-options");
    cell6.innerHTML = '<input type="image" src="../img/edit.png" alt="Edit" width="30" height="30" class="main-button" id="edit-button">' +
    '<input type="image" src="../img/remove.png" alt="Delete" width="30" height="30" class="delete-button" id="delete-button">';
    newRow.appendChild(cell6);

    updateDeleteButtons();
    updateEditButtons();
    document.querySelector(".popup").style.display = "none";

    emptyBox.push(newRow);

    console.log(emptyBox);

    displayPage(itemPerPage);
    pageGenerator(itemPerPage);
    getpagElement(itemPerPage);
    }
    else {
        var cell = rowGlobal.cells[1];
        cell.textContent = groupValue;
        
        cell = rowGlobal.cells[2];
        cell.textContent = firstNameValue + " " + lastNameValue;

        cell = rowGlobal.cells[3];
        cell.textContent = genderValue;

        cell = rowGlobal.cells[4];
        cell.textContent = dateNameValue;

        document.querySelector(".popup").style.display = "none";

        var tableData = JSON.parse(localStorage.getItem('tableData')) || [];
        var rowIndex = -1;
        for (var i = 0; i < tableData.length; i++) {
            if (tableData[i].id === rowGlobal.id) {
                rowIndex = i;
                break;
            }
        }

        console.log(rowIndex);
        
        tableData[rowIndex].group = groupValue;
        tableData[rowIndex].firstName = firstNameValue;
        tableData[rowIndex].lastName = lastNameValue;
        tableData[rowIndex].gender = genderValue;
        tableData[rowIndex].date = dateNameValue;
        
        localStorage.setItem('tableData', JSON.stringify(tableData));
    }
});

updateDeleteButtons();
updateEditButtons();

function updateDeleteButtons() {
    var deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var row = this.parentNode.parentNode;
            var confirmBtn = document.getElementById("confirmBtn");
            var cancelBtn = document.getElementById("cancelBtn");
            var modalContent = document.querySelector(".modal-content");
    

            // var nameCell = row.cells[2];

            modalContent.style.display = "flex";
    
            confirmBtn.onclick = function() {
                modalContent.style.display = "none";
                var tableData = JSON.parse(localStorage.getItem('tableData')) || [];

                // Знайти рядок для видалення в JSON
                var rowIndex = -1;
                for (var i = 0; i < tableData.length; i++) {
                    if (tableData[i].id === row.id) {
                        rowIndex = i;
                        break;
                    }
                }

                // Видалити рядок з JSON, якщо знайдено
                if (rowIndex !== -1) {
                    tableData.splice(rowIndex, 1);
                } else {
                    console.error("Не знайдено рядок для видалення:");
                }

            // Оновити localStorage
                localStorage.setItem('tableData', JSON.stringify(tableData));
                
                row.parentNode.removeChild(row);
                emptyBox.pop();
                console.log(emptyBox);
            }
    
                cancelBtn.onclick = function() {
                    modalContent.style.display = "none";
                }
        }
    )});
}

    var rowGlobal;

    function updateEditButtons() {
        var editButton = document.querySelectorAll(".main-button");
        editButton.forEach(function(button) {
            button.addEventListener('click', function() {
            document.querySelector(".header-form").textContent = "Edit students";
            document.querySelector(".popup").style.display = "flex";
            var inputs = document.querySelectorAll('.popup-content input');
            inputs.forEach(function(input) {
                input.value = '';
            });
            

            var row = this.parentNode.parentNode;
            var nameCell = row.cells[1];
            document.getElementById('input-group').value = nameCell.textContent;

            nameCell = row.cells[2];
            var parts = nameCell.textContent.split(" ");


            document.getElementById('input-first-name').value = parts[0];
            document.getElementById('input-last-name').value = parts.slice(1).join(" ");;

            nameCell = row.cells[3];

            if(nameCell.textContent === 'M') {
                document.getElementById('input-gender').value = 'Male';
            }
            else {
                document.getElementById('input-gender').value = 'Female';
            }

            nameCell = row.cells[4];
            document.getElementById('input-date').value = nameCell.textContent;

            rowGlobal =  row;
        })
    })
    }


		
//////////////////////////////////////////////////////////////////////
function generateUniqueId() {
    var randomId = Math.random().toString(36).substring(2);
    return randomId;
}

function isIdUnique(id) {
    return !document.getElementById(id);
}

function addUniqueIdToRow(row) {
    var uniqueId;
    do {
        uniqueId = generateUniqueId(); 
    } while (!isIdUnique(uniqueId));

    row.id = uniqueId;
}

//////////////////////////////////////////


    var tbody = document.querySelector("tbody");
    var pageUl = document.querySelector(".pagination");
    var itemShow = document.querySelector("#itemperpage");
    var tr = tbody.querySelectorAll("tr");
    var emptyBox = [];
    var index = 1;
    var itemPerPage = 5;

    for(let i=0; i<tr.length; i++){ emptyBox.push(tr[i]);}
    emptyLoad();

    console.log(emptyBox);


    function emptyLoad() {
        var tableData = JSON.parse(localStorage.getItem('tableData'));
    if (tableData) {
      // Відновити дані таблиці з localStorage
      for (var i = 0; i < tableData.length; i++) {
        var rowData = tableData[i];
        // Створити новий рядок і заповнити осередки значеннями з rowData
        var table = document.getElementById('myTable');
        var newRow = table.insertRow();
        newRow.id = rowData.id;
        var cell0 = document.createElement("td");
        cell0.classList.add("cell-checkbox");
        cell0.innerHTML = '<input type="checkbox" class="group-select">';
        newRow.appendChild(cell0);
    
    
        var cell1 = document.createElement("td");
        cell1.classList.add("cell-group");
        cell1.innerHTML = rowData.group;
        newRow.appendChild(cell1);
    
        var cell2 = document.createElement("td");
        cell2.classList.add("name");
        cell2.innerHTML = rowData.firstName + " " + rowData.lastName;
        newRow.appendChild(cell2);
    
        if (rowData.gender === 'Female') {
            rowData.gender = 'F';
        } else if (rowData.gender === 'Male') {
            rowData.gender = 'M';
        }

        var cell3 = document.createElement("td");
        cell3.classList.add("cell-gender");
        cell3.innerHTML = rowData.gender;
        newRow.appendChild(cell3);
    
        var cell4 = document.createElement("td");
        cell4.classList.add("birthday");
        cell4.innerHTML = rowData.date;
        newRow.appendChild(cell4);
    
        var cell5 = document.createElement("td");
        cell5.classList.add("cell-status");
        cell5.innerHTML = '<img src="../img/online.png" alt="Status: online" width="20" height="20">';
        newRow.appendChild(cell5);
    
        var cell6 = document.createElement("td");
        cell6.classList.add("cell-options");
        cell6.innerHTML = '<input type="image" src="../img/edit.png" alt="Edit" width="30" height="30" class="main-button" id="edit-button">' +
        '<input type="image" src="../img/remove.png" alt="Delete" width="30" height="30" class="delete-button" id="delete-button">';
        newRow.appendChild(cell6);

       
        emptyBox.push(newRow);
      }
      updateDeleteButtons();
      updateEditButtons();
    }
    }

    function displayPage(limit){
        tbody.innerHTML = '';
        for(let i=0; i<limit; i++){
            tbody.appendChild(emptyBox[i]);
        }
        const  pageNum = pageUl.querySelectorAll('.list');
        pageNum.forEach(n => n.remove());
    }
    displayPage(itemPerPage);

    function pageGenerator(getem){
        const num_of_tr = emptyBox.length;
        if(num_of_tr <= getem){
            pageUl.style.display = 'none';
        }else{
            pageUl.style.display = 'flex';
            const num_Of_Page = Math.ceil(num_of_tr/getem);
            for(i=1; i<=num_Of_Page; i++){
                const li = document.createElement('li'); li.className = 'list';
                const a =document.createElement('a'); a.href = '#'; a.innerText = i; a.className="a";
                a.setAttribute('data-page', i);
                li.appendChild(a);
                pageUl.insertBefore(li,pageUl.querySelector('.next'));
            }
        }
    }
    pageGenerator(itemPerPage);
    let pageLink = pageUl.querySelectorAll("a");
    let lastPage =  pageLink.length - 2;

    function pageRunner(page, items, lastPage, active){
        for(button of page){
            button.onclick = e=>{
                const page_num = e.target.getAttribute('data-page');
                const page_mover = e.target.getAttribute('id');
                if(page_num != null){
                    index = page_num;

                }else{
                    if(page_mover === "next"){
                        index++;
                        if(index >= lastPage){
                            index = lastPage;
                        }
                    }else{
                        index--;
                        if(index <= 1){
                            index = 1;
                        }
                    }
                }
                pageMaker(index, items, active);
            }
        }

    }
    var pageLi = pageUl.querySelectorAll('.list'); pageLi[0].classList.add("active");
    pageRunner(pageLink, itemPerPage, lastPage, pageLi);

    function getpagElement(val){
        let pagelink = pageUl.querySelectorAll("a");
        let lastpage =  pagelink.length - 2;
        let pageli = pageUl.querySelectorAll('.list');
        pageli[0].classList.add("active");
        pageRunner(pagelink, val, lastpage, pageli);
        
    }



    function pageMaker(index, item_per_page, activePage){
        const start = item_per_page * index;
        const end  = start + item_per_page;
        const current_page =  emptyBox.slice((start - item_per_page), (end-item_per_page));
        tbody.innerHTML = "";
        for(let j=0; j<current_page.length; j++){
            let item = current_page[j];					
            tbody.appendChild(item);
        }
        Array.from(activePage).forEach((e)=>{e.classList.remove("active");});
        activePage[index-1].classList.add("active");
    }





// //search content 
// var search = document.getElementById("search");
// search.onkeyup = e=>{
//     const text = e.target.value;
//     for(let i=0; i<tr.length; i++){
//         const matchText = tr[i].querySelectorAll("td")[2].innerText;
//         if(matchText.toLowerCase().indexOf(text.toLowerCase()) > -1){
//             tr[i].style.visibility = "visible";
//         }else{
//             tr[i].style.visibility= "collapse";
//         }
//     }
// }



