let addBasket = JSON.parse(localStorage.getItem("basket"));


let cart__items = document.querySelector("#cart__items");


function getBasket() {

if (addBasket === null || addBasket.lenght == 0){

console.log("le panier est vide");

}else{

    for (i = 0 ; i < addBasket.length ; i++) {
        let article = document.createElement("article");
        cart__items.appendChild(article);
        article.className = "cart__item";
        article.dataset.id =  addBasket[i].id;
        article.dataset.color = addBasket[i].color;
        // dataId = document.createAttribute("data-id");
        // dataId.value = addBasket[i].id;
        // article.setAttribute(dataId); 
        
    
            let divImg = document.createElement("div");
            let img = document.createElement("img");
            divImg.className ="cart__item__img";

            let newDiv1 = document.createElement("div");
            newDiv1.className = "cart__item__content";

                let description = document.createElement("div");
                description.className = "cart__item__content__titlePrice";
                let title = document.createElement("h2");
                let color = document.createElement("p");
                let price = document.createElement("p");

            let newDiv2 = document.createElement("div");
            newDiv2.className = "cart__item__content__settings";

                let newDiv3 = document.createElement("div");
                newDiv3.className = "cart__item__content__settings__quantity";
                let qty = document.createElement("p");

                let newDiv4 = document.createElement("div");
                newDiv4.className = "cart__item__content__settings__delete";
                let dlt = document.createElement("p");
                let productQuantity = document.createElement("input");
        

        newDiv2.appendChild(newDiv3);
        newDiv2.appendChild(newDiv4);

        newDiv3.appendChild(qty);
        newDiv3.appendChild(productQuantity);

        newDiv4.appendChild(dlt);
        
        document.getElementById("cart__items").appendChild(article);
    
        article.appendChild(divImg);
        article.appendChild(newDiv1);
        article.appendChild(newDiv2);
    
        divImg.appendChild(img);
        img.setAttribute('src', addBasket[i].img);
        img.setAttribute('alt', "Photographie d'un canapé");
        

        newDiv1.appendChild(description);
    
        description.appendChild(title);
        description.appendChild(color);
        description.appendChild(price);
    
    
        title.innerHTML = addBasket[i].name;
        color.innerHTML = "couleur : "+ addBasket[i].color;
        price.innerHTML = "prix : "+ addBasket[i].price + "€";


        qty.innerHTML = "quantité : ";
        
        productQuantity.value = addBasket[i].quantity;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");



        dlt.innerHTML = "supprimer";
        dlt.className = "deleteItem";

}}}
    getBasket()


    function getTotals(){

        let elQty = document.getElementsByClassName('itemQuantity');
        let myLength = elQty.length,
        totalQty = 0;
    
        for (let i = 0; i < myLength; ++i) {
            totalQty += elQty[i].valueAsNumber;
        }

        let productTotalQuantity = document.getElementById('totalQuantity');
        productTotalQuantity.innerHTML = totalQty;
        totalPrice = 0;

        for (let i = 0; i < myLength; ++i) {
            totalPrice += (elQty[i].valueAsNumber * addBasket[i].price);
        }
    
        let productTotalPrice = document.getElementById('totalPrice');
        productTotalPrice.innerHTML = totalPrice;

    }
    getTotals();

    function delProduct() {
        let delItem = document.querySelectorAll('.deleteItem');
        
        for (let i = 0; i < delItem.length; i++) {
            delItem[i].addEventListener('click', function(event) {
                let articleDelItemID = event.target.closest('article').getAttribute("data-id");
                let articleDelItemColor = event.target.closest('article').getAttribute("data-color");
                


                productToDel = addBasket.find(product => product.id !== articleDelItemID && product.color !== articleDelItemColor);

                newAddbasket = addBasket.filter(product => product.id !== articleDelItemID || product.color !== articleDelItemColor);
       

                  console.log(articleDelItemID);
                  console.log(articleDelItemColor);

                  localStorage.setItem('basket', JSON.stringify(newAddbasket));


                  location.reload();
    
    
            })
        };
    }
    delProduct();

    function changeQty() {
        let itemQty = document.querySelectorAll('.itemQuantity');
        for (let i = 0; i < itemQty.length; i++) {
          itemQty[i].addEventListener('change', (event) => {
          event.preventDefault();
            
          let newItemQty = itemQty[i].value;

          const newAddBasket = {
            id: addBasket[i].id,
            img: addBasket[i].img,
            alt: addBasket[i].alt,
            name: addBasket[i].name,
            color: addBasket[i].color,
            price: addBasket[i].price,   
            quantity: parseInt(newItemQty),
          };

          addBasket[i] = newAddBasket;
          localStorage.setItem('basket', JSON.stringify(addBasket));

          getTotals();
          })
        }
    }
    changeQty();


    
let form = document.querySelector(".cart__order__form");


let adressRegExp = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$");
let nameRegExp = new RegExp("^[A-zÀ-ú \-]+$");
let emailRegExp = new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$");

let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
form.firstName.addEventListener('change', function(e) {
    let value = e.target.value;
    if (nameRegExp.test(value)){
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'veuillez vérifier votre prénom.';
    }
});

let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');
form.lastName.addEventListener('change', function(e) {
    let value = e.target.value;
    if (nameRegExp.test(value)){
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'veuillez vérifier votre nom.';
    }
});

let adressErrorMsg = document.querySelector('#addressErrorMsg');
form.address.addEventListener('change', function(e) {
    let value = e.target.value;
    if (adressRegExp.test(value)){
        adressErrorMsg.innerHTML = '';
    } else {
        adressErrorMsg.innerHTML = 'veuillez vérifier votre adresse.';
    }
});

let cityErrorMsg = document.querySelector('#cityErrorMsg');
form.city.addEventListener('change', function(e) {
    let value = e.target.value;
    if (nameRegExp.test(value)){
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'veuillez vérifier votre ville.';
    }
});

let emailErrorMsg = document.querySelector('#emailErrorMsg');
form.email.addEventListener('change', function(e) {
    let value = e.target.value;
    if (emailRegExp.test(value)){
        emailErrorMsg.innerHTML = '';
    } else {
        emailErrorMsg.innerHTML = 'veuillez vérifier votre email.';
    }
});
    



        
   




  