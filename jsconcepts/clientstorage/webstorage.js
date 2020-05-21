

const localStore=document.getElementById('local-storage');
const sessionStore=document.getElementById('session-storage');
const getLocal=document.getElementById('getLocal');
const getSession=document.getElementById('getSession');




function setlocal(){
    const getLocalVal=document.getElementById('localVal').value;
//Set data
localStorage.setItem('lname',getLocalVal);
}

function setsession(){
    const getSessionVal=document.getElementById('sessionVal').value;
   // Save data to sessionStorage
sessionStorage.setItem('sname', getSessionVal);
    }
function getlocal(a){

/* Local storage */
a.nextElementSibling.style.display='block';


//Fetch data
let myName = localStorage.getItem('lname');
localStore.innerHTML=myName;

//Remove data
//localStorage.removeItem('lname');

}

function getsession(a){
    a.nextElementSibling.style.display='block';
/* Session storage */



// Get saved data from sessionStorage
let data = sessionStorage.getItem('sname');
sessionStore.innerHTML=data;
//console.log('Session storage data -'+ data);

// Remove saved data from sessionStorage
//sessionStorage.removeItem('sname');

// Remove all saved data from sessionStorage
//sessionStorage.clear();
}


var chopperFn = function(){

    this.setOwner = (name) => this.owner = name;
    Object.assign(this,{
        owner: 'Jhon',
        getOwner: () => this.owner,
        getOwnera: function() {
            return this.owner;
        }
       
    })

}

var chopper = new chopperFn();
console.log(chopper.getOwner());
console.log(chopper.getOwnera());
