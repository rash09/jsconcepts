let db;
const firstnameInput = document.querySelector('#firstName');
const lastnameInput = document.querySelector('#lastName');
const form = document.querySelector('form');
const list = document.querySelector('ul');


window.onload = () => {
    let request = window.indexedDB.open('contacts', 1);

    request.onerror = function () {
        console.log('Database failed to open');
    }

    request.onsuccess = function () {
        console.log('Database opened successfully');

        db = request.result;
        displayData();

    }

    request.onupgradeneeded = function (e) {
        let db = e.target.result;
        let objectStore = db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });

        objectStore.createIndex('firstName', 'firstName', { unique: false });
        objectStore.createIndex('lastName', 'lastName', { unique: false });

        console.log('Database setup successfully');


    }

    form.onsubmit = addData;

    function addData(e) {
        e.preventDefault();

        let newItem = { firstName: firstnameInput.value, lastName: lastnameInput.value };

        let transaction = db.transaction(['contacts'], 'readwrite');

        let objectStore = transaction.objectStore('contacts');

        let request = objectStore.add(newItem);

        request.onsuccess = () => {
            firstnameInput.value = '';
            lastnameInput.value = '';
        };
        transaction.oncomplete = () => {
            console.log('Transaction completed on the database');
            displayData();
        }
        transaction.onerror = () => {
            console.log('Transaction not completed, error!!');
        }

    }

    function displayData() {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        let objectStore = db.transaction('contacts').objectStore('contacts');
        objectStore.openCursor().onsuccess = function (e) {
            let cursor = e.target.result;

            if (cursor) {
                let listItem = document.createElement('li');
                let first = document.createElement('p');
                let last = document.createElement('p');

                first.textContent = cursor.value.firstName;
                last.textContent = cursor.value.lastName;

                listItem.appendChild(first);
                listItem.appendChild(last);
                list.appendChild(listItem);

                listItem.setAttribute('data-contact-id', cursor.value.id);

                let deleteButton = document.createElement('button');
                listItem.appendChild(deleteButton);
                deleteButton.textContent = "Delete";

                deleteButton.onclick= deleteItem;

                cursor.continue();

            } else {
                if (!list.firstChild) {
                    let listItem = document.createElement('li');
                    listItem.textContent = 'No contacts in store';
                    list.appendChild(listItem);
                }
                console.log('Contacts displayed');
            }
        }
    }

    function deleteItem(e) {
        e.preventDefault();

        let contactId = Number(e.target.parentNode.getAttribute('data-contact-id'));

        let transaction = db.transaction(['contacts'], 'readwrite');
        let objectStore = transaction.objectStore('contacts');
        let request = objectStore.delete(contactId);

        transaction.oncomplete = () => {
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            console.log('Contact ${contactId} is deleted');

            if (!list.firstChild) {
                let listItem = document.createElement('li');
                listItem.textContent = 'No contacts in store';
                list.appendChild(listItem);
            }
           
        }


    }
}