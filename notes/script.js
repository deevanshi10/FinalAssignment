let noteDataArray = JSON.parse(localStorage.getItem('data')) || [];
let isEdit = false;

function clearErrors() {
    let errorElements = document.querySelectorAll('.error-text');
    errorElements.forEach((errorElement) => {
        errorElement.style.display = 'none';
        errorElement.textContent = '';
    });
}

function closeAddNote() {
    document.getElementById("myNote").style.display = "none";
    document.getElementById("all").style.filter = "none";
    isEdit = false;
    document.getElementById('myNote').reset();
    clearErrors();
}

function showAddNote() {
    document.getElementById("myNote").style.display = "block";
    document.getElementById("all").style.filter = "blur(10px)";
}

function notesValidation() {
    let v = true;
    const title = document.getElementById('title').value.trim();
    if (!title) {
        displayErrorMessage('errorTitle', 'Please provide a title to your note');
        v = false;
    }

    const description = document.getElementById('description').value.trim();
    if (!description) {
        displayErrorMessage('errorDescription', 'Add your note here.');
        v = false;
    }
    return v;
}

function addNote(event) {
    event.preventDefault();
    clearErrors();
    if (notesValidation()) {
        if (!isEdit) {
            displayNotes();
            alert("Added Successfully!");
        }
        else {
            updateLocalStorageItem(currentIndex, {
                'title': document.getElementById('title').value.trim(),
                'description': document.getElementById('description').value.trim(),
            });
            updateTable();
            isEdit = false;

            document.getElementById('myNote').reset();
        }
        closeAddNote();
    }
}

function displayErrorMessage(errorId, errorMessage) {
    let errorEle = document.getElementById(errorId);
    if (errorEle) {
        errorEle.style.display = 'inline-block';
        errorEle.textContent = errorMessage;
    }
}

if (!localStorage.getItem('data')) {
    localStorage.setItem('data', JSON.stringify([]));
}

function displayNotes() {
    var userInput = {
        'title': document.getElementById('title').value.trim(),
        'description': document.getElementById('description').value.trim(),
    };

    noteDataArray.push(userInput);

    localStorage.setItem('data', JSON.stringify(noteDataArray));

    document.getElementById('myNote').reset();
    clearErrors();

    updateTable();
}

window.addEventListener('load', updateTable);

function updateTable() {
    let data = JSON.parse(localStorage.getItem('data')) || [];
    let tableBody = document.querySelector('#myTable tbody');
    tableBody.innerHTML = '';

    data.forEach((item, i) => {
        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('row-checkbox');
        cell1.appendChild(checkbox);

        checkbox.addEventListener('change', function () {
            selectAllCheckbox.checked = Array.from(document.querySelectorAll('.row-checkbox')).every(cb => cb.checked);
        });

        cell2.textContent = i + 1;

        cell3.textContent = item.title;
        cell3.classList.add('c3');

        cell3.addEventListener('click', function () {
            openModal(item);
        });

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');

        cell4.appendChild(deleteButton);
        deleteButton.addEventListener('click', function () {
            deleteRows(i);
        });

        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        cell5.appendChild(editButton);

        editButton.addEventListener('click', function () {
            isEdit = true;
            editModal(item, i);
        });
    });
}


function selectAllRows() {
    let selectAllCheckbox = document.getElementById('selectAllCheckbox');
    let checkboxes = document.querySelectorAll('.row-checkbox');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAllCheckbox.checked;
        checkbox.addEventListener('change', function () {
            if (!this.checked) {
                selectAllCheckbox.checked = false;
            }
        });
    });

    if (!selectAllCheckbox.checked) {
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }
}

function deleteSelectedRows() {
    let checkboxes = document.querySelectorAll('.row-checkbox');
    let selectedIndexes = [];

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedIndexes.push(index);
        }
    });

    if (selectedIndexes.length > 0) {
        deleteRows(selectedIndexes);
    }
}

function deleteRows(indexes) {
    let data = JSON.parse(localStorage.getItem('data')) || [];

    if (!Array.isArray(indexes)) {
        indexes = [indexes];
    }

    indexes.sort((a, b) => b - a);
    indexes.forEach(index => {
        data.splice(index, 1);
    });

    localStorage.setItem('data', JSON.stringify(data));
    noteDataArray = data;
    updateTable();
}



function openModal(item) {
    let modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <p>${item.description}</p>
    `;
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

function editModal(item, index) {
    showAddNote();
    let modal = document.createElement('div');
    modal.classList.add('edit-modal');

    currentIndex = index;

    document.getElementById('title').value = item.title;
    document.getElementById('description').value = item.description;

    document.getElementById('myNote').addEventListener('submit', function (event) {
        addNote(event);
        document.body.removeChild(modal);
        updateTable();
    });
}

function updateLocalStorageItem(index, newItem) {
    let data = JSON.parse(localStorage.getItem('data')) || [];
    data[index] = newItem;
    localStorage.setItem('data', JSON.stringify(data));
    alert("Edited Successfully");

}

function openDelModal() {
    document.getElementById('confirmationModal').style.display = 'block';
}

function closeDelModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

function deleteSelectedNote() {
    deleteSelectedRows();
    closeDelModal();
}

function deleteConfirm() {
    let checkboxes = document.querySelectorAll('.row-checkbox:checked');
    let selectedRowCount = checkboxes.length;

    if (selectedRowCount > 0) {
        openDelModal();
    } else {
        alert('Please select at least one!');
    }
}