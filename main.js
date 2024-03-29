let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submint = document.getElementById("submint");
let mood = "create";
let temp;

function gettotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}
let datapro;
if (localStorage.prodact != null) {
  datapro = JSON.parse(localStorage.prodact);
} else {
  datapro = [];
}

submint.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value!="" && price.value!="" && category!="") {
    if (mood === "create") {
        if (newpro.count > 1) {
          for (let index = 0; index < newpro.count; index++) {
            datapro.push(newpro);
          }
        } else {
          datapro.push(newpro);
        }
      } else {
        datapro[temp] = newpro;
        mood = "create";
        submint.innerHTML = "create";
        count.style.display = "block";
      }
      cleardata();
  } 
  localStorage.setItem("prodact", JSON.stringify(datapro));
  
  showdata();
};
function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
function showdata() {
  gettotal();
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `   <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button  onclick=" update(${i})" id="update">update</button></td>
    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    
</tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btndeleteall = document.getElementById("deleteall");
  if (datapro.length > 0) {
    btndeleteall.innerHTML = `<button onclick="deleteall()">delete all (${datapro.length})</button>`;
  } else {
    btndeleteall.innerHTML = "";
  }
}
showdata();

function deletedata(i) {
  datapro.splice(i, 1);
  localStorage.prodact = JSON.stringify(datapro);
  showdata();
}

function deleteall() {
  localStorage.clear();
  datapro.splice(0);
  showdata();
}
function update(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  gettotal();
  count.style.display = "none";
  category.value = datapro[i].category;
  submint.innerHTML = "update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
let searchmood = "title";
function getsearchmood(id) {
  let serach = document.getElementById("search");
  if (id == "stitle") {
    searchmood = "title";
    serach.placeholder = "search by title";
  } else {
    searchmood = "category";
    serach.placeholder = "search by category";
  }
  serach.focus();
  serach.value = "";
  showdata();
}
function searchdata(value) {
  let table;
  if (searchmood == "title") {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].title.includes(value.toLowerCase())) {
        table += `   <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button  onclick=" update(${i})" id="update">update</button></td>
    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    
</tr>`;
      }
    }
  } else {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].category.includes(value.toLowerCase())) {
        table += `   <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button  onclick=" update(${i})" id="update">update</button></td>
    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    
</tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
