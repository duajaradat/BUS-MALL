'use strict'
// lab11

//get the elements fromHTML by ID

let section = document.getElementById("img-section");
let leftImg = document.getElementById("left-img");
let centerImg = document.getElementById("center-img");
let rightImg = document.getElementById("right-img");




let products = []; // array for constructor function 
let allProducts = []; // array for the name of the products
let picksArray = []; // array for num of pick each product
let viewsArray = []; // array show how many time each product display 
let attempts = 1;
let maxAttempts = 25; // how many time you  can pick the products you want

let noRepeatSndI = []; // array to make sure that the products will not repeat in the later iteration

let localPicksArray=[];

//constructor fuction 

function Products(productName) {
    this.Name = productName.split('.')[0];
    this.path = "images/" + productName
    this.view = 0;
    this.pick = 0;
    products.push(this);
    allProducts.push(this.Name);
    localPicksArray.push(this.pick);
}


// array contains the products 

let listOfProducts = ["bag.jpg", "banana.jpg", "bathroom.jpg", 
                    "boots.jpg", "breakfast.jpg", 
                    "bubblegum.jpg", "chair.jpg", 
                    "cthulhu.jpg", "dog-duck.jpg", 
                    "dragon.jpg", "pen.jpg", "pet-sweep.jpg", 
                    "scissors.jpg", "shark.jpg", "sweep.png", 
                    "tauntaun.jpg", "unicorn.jpg", "water-can.jpg", "wine-glass.jpg"];


for (let i = 0; i < listOfProducts.length; i++) {
    new Products(listOfProducts[i], "images/" + listOfProducts[i]);
}


let leftIndex;
let centerIndex;
let rightIndex;

function randomDisplyProduct() {
    return Math.floor(Math.random() * products.length);
}


function renderRandomProduct() {


    leftIndex = randomDisplyProduct();
    centerIndex = randomDisplyProduct();
    rightIndex = randomDisplyProduct();

    /* use while to make sure that the products in the same iteration dont repeat , also we use the built-in function (includes) 
        to make sure that the products in the later iteration don't match the previous ones. */

    while (leftIndex === rightIndex
        || centerIndex === rightIndex
        || centerIndex === leftIndex
        || noRepeatSndI.includes(leftIndex)
        || noRepeatSndI.includes(centerIndex)
        || noRepeatSndI.includes(rightIndex)) {

        leftIndex = randomDisplyProduct();
        centerIndex = randomDisplyProduct();
        rightIndex = randomDisplyProduct();

    }


    noRepeatSndI[0] = leftIndex;
    noRepeatSndI[1] = centerIndex;
    noRepeatSndI[2] = rightIndex;


    leftImg.setAttribute("src", products[leftIndex].path);
    products[leftIndex].view++;


    centerImg.setAttribute("src", products[centerIndex].path);
    products[centerIndex].view++;

    rightImg.setAttribute("src", products[rightIndex].path);
    products[rightIndex].view++;


    console.log(noRepeatSndI);
}
renderRandomProduct();






// to make an event 
let button = document.getElementById("result");


// click handle 
leftImg.addEventListener("click", clickProduct);
centerImg.addEventListener("click", clickProduct);
rightImg.addEventListener("click", clickProduct);


function showResult() {
    for (let i = 0; i < products.length; i++) {
        let pEl = document.createElement("p");
        section.appendChild(pEl)
        pEl.textContent = `${products[i].Name} displayed ${products[i].view} times and picked ${products[i].pick} times`;

        picksArray.push(products[i].pick);
        localPicksArray[i] += picksArray[i];
        
        viewsArray.push(products[i].view);
        
    }
    saveLocal();
    resultChartRender();
}


// console.log(localPicksArray);


function clickProduct(event) {

    if (attempts <= maxAttempts) {

        let picked = event.target.id;

        if (picked === "left-img") {

            products[leftIndex].pick++

        } else if (picked === "center-img") {

            products[centerIndex].pick++

        } else if (picked === "right-img") {

            products[rightIndex].pick++
        }       
        
        renderRandomProduct();

    } else {

        button.textContent = "View Result";
        section.appendChild(button);
        button.addEventListener("click", showResult);
        

        leftImg.removeEventListener("click", clickProduct);
        centerImg.removeEventListener("click", clickProduct);
        rightImg.removeEventListener("click", clickProduct); 
        

    }

    attempts++;
   
}









// chart function

function resultChartRender() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: allProducts,
            datasets: [{
                label: '# of Picks',
                data: localPicksArray,
                backgroundColor: ['black',
                    'black', 'black', 'black',
                    'black', 'black', 'black',
                    'black', 'black', 'black',
                    'black', 'black', 'black',
                    'black', 'black', 'black',
                    'black', 'black', 'black']
                ,
                borderColor: ['black']
                ,
                borderWidth: 1
            }, {
                label: '# of Views',
                data: viewsArray,
                backgroundColor: [
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)',
                    'rgb(16, 80, 59)'
                ],
                borderColor: [
                    'brgb(16, 80, 59)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

// local Storge 

function saveLocal() {

let localPicks=JSON.stringify(localPicksArray);
localStorage.setItem("localPicks", localPicks);
}

function getItemsLocal(){

   let data = localStorage.getItem("localPicks");
    let key=JSON.parse(data);
    if(key !== null){
        localPicksArray=key;
    }

}
getItemsLocal();







