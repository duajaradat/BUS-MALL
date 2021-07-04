'use strict'
// lab11

//get the elements fromHTML by ID

let section=document.getElementById("img-section"); 
let leftImg=document.getElementById("left-img");
let centerImg=document.getElementById("center-img");
let rightImg=document.getElementById("right-img");
let button=document.getElementById("result");
section.appendChild(button);

let products=[];
let attempts=1;
let maxAttempts=25;

//constructor fuction 

function  Products(productName){
    this.Name=productName.split('.')[0];
    this.path="images/"+productName
    this.view=0;
    this.pick=0;
    products.push(this);
    
}


let listOfProducts=["bag.jpg","banana.jpg","bathroom.jpg","boots.jpg","breakfast.jpg","bubblegum.jpg","chair.jpg","cthulhu.jpg","dog-duck.jpg","dragon.jpg","pen.jpg","pet-sweep.jpg","scissors.jpg","shark.jpg","sweep.png","tauntaun.jpg","unicorn.jpg","water-can.jpg","wine-glass.jpg"];


for(let i=0;i<listOfProducts.length;i++){
    new Products(listOfProducts[i],"images/"+listOfProducts[i]);
}
// console.log(products);


let leftIndex;
let centerIndex;
let rightIndex;

function randomDisplyProduct(){
    return Math.floor(Math.random()*products.length);
}

function renderRandomProduct(){
    leftIndex=randomDisplyProduct();
    centerIndex=randomDisplyProduct();
    rightIndex=randomDisplyProduct();
    
    //no repeat products in the same attempt
    
    while (leftIndex===centerIndex || leftIndex===rightIndex || centerIndex===rightIndex){
        leftIndex=randomDisplyProduct();
        centerIndex=randomDisplyProduct();
    }
    
    leftImg.setAttribute("src",products[leftIndex].path);
    centerImg.setAttribute("src",products[centerIndex].path);
    rightImg.setAttribute("src",products[rightIndex].path);
    
    products[leftIndex].view++;
    products[centerIndex].view++;
    products[rightIndex].view++;
} 
renderRandomProduct();

function showResult(){
    for(let i=0;i<products.length;i++){
        let pEl=document.createElement("p");
        section.appendChild(pEl)
        pEl.textContent=`${products[i].Name} displayed ${products[i].view} times and picked ${products[i].pick} times`;
    }
}






leftImg.addEventListener("click",clickProduct);
centerImg.addEventListener("click",clickProduct);
rightImg.addEventListener("click",clickProduct);


function clickProduct(event){
    if (attempts<maxAttempts){
        let picked =event.target.id;
        
        if(picked==="left-img"){
            products[leftIndex].pick++
        }
        else if(picked==="center-img"){
            products[centerIndex].pick++
        }else if (picked==="right-img"){
            products[rightIndex].pick++
        }
        renderRandomProduct();
        console.log(products);
    }else{
        
        
        button.textContent="View Result";
    button.addEventListener("click",showResult);

    leftImg.removeEventListener("click",clickProduct);
centerImg.removeEventListener("click",clickProduct);
rightImg.removeEventListener("click",clickProduct);
}

attempts++;
}




