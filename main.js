// CRUDS -> Create | Read | Update | Delete | Search => Data

const inputs = document.querySelectorAll("input");
const totalElements = document.querySelector("#totalInputs").children;
const totalInputs = [...totalElements];
// const TOTAL_RESULT = totalInputs.pop();
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const title = document.getElementById("title");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.querySelector("small");
const count = document.getElementById("count");
const category = document.getElementById("category");
const createBtn = document.getElementById("createBtn");
const tableBody = document.getElementById("tableBody");

const state = {
  systemMode: "create",

  PRODUCTS_DATA: [],

  total: {
    totalResult: 0,

    active(value) {
      total.textContent = value;
      total.style.backgroundColor = "green";
    },

    disable(value) {
      total.textContent = value;
      total.style.backgroundColor = "#ff0000bd";
    },
  },
};

//-------------------------------------------

//_________________
// GET-TOTAL-OPERATION;
const toggleTotalStatus = (status = false, value = 0) => {
  const total = state.total;

  status ? total.active(value) : total.disable(value);
};

const getTotalHanlder = function () {
  const totalInputs = document.getElementById("totalInputs");
  const totalOperation = () => {
    //
    let totalResult = state.total.totalResult;

    if (price.value) {
      totalResult = +price.value + +taxes.value + +ads.value - +discount.value;
      toggleTotalStatus(true, totalResult);
    } else {
      toggleTotalStatus(false);
    }
  };

  [...totalInputs.children].forEach((input) =>
    input.addEventListener("keyup", totalOperation)
  );
  /*
  if (status === "create") {
    return [...totalInputs.children].forEach((input) =>
      input.addEventListener("keyup", totalOperation)
    );
  } else {
    return totalOperation();
  }
*/

  // /--------------------------
};
getTotalHanlder();

//_________________
// CLEAR-FIELDS-FUNCTION;
const clearInputs = () => {
  inputs.forEach((input, idx) => {
    setTimeout(() => {
      toggleTotalStatus(false);
      input.value = "";
    }, 500);
  });
};

const parseJSON = () => {
  if (localStorage.product != null) {
    state.PRODUCTS_DATA = JSON.parse(localStorage.product);
  } else {
    state.PRODUCTS_DATA = [];
  }
};

parseJSON();

// //__________________
// // Create-Opearation;

const createBtnHandler = (e) => {
  e.preventDefault();

  const productObj = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    category: category.value,
    total: total.textContent,
  };

  if (state.systemMode === "create") {
    state.PRODUCTS_DATA.push(productObj);
  } else {
    state.PRODUCTS_DATA[state.productId] = productObj;
  }

  localStorage.setItem("product", JSON.stringify(state.PRODUCTS_DATA));

  clearInputs();
  SHOW_PRODUCTS();
};

createBtn.addEventListener("click", createBtnHandler);

// //__________________
// DELETE-(ALL-PRODUCTS)-FUNCTION;

const deleteAllHandler = function (idxs) {
  const deleteAllBtn = document.querySelector(".outputs-delete__eng .btn");
  const data = state.PRODUCTS_DATA;

  if (data.length > 0) {
    deleteAllBtn.classList.remove("disable");
    deleteAllBtn.textContent = `delete all (${idxs + 1})`;
  }

  const deleteAllData = () => {
    localStorage.clear();
    data.splice(0);
    SHOW_PRODUCTS();
    deleteAllBtn.classList.add("disable");
  };

  deleteAllBtn.addEventListener("click", deleteAllData);
};

// //__________________
// DELETE-(PRODUCT)-OPERATION
const deleteProduct = (idx) => {
  state.PRODUCTS_DATA.splice(idx, 1);

  localStorage.product = JSON.stringify(state.PRODUCTS_DATA);
  SHOW_PRODUCTS();
};

// //__________________
// // SHOW-PRODUCTS-FUNCTION;

const SHOW_PRODUCTS = () => {
  let table = "";

  const data = state.PRODUCTS_DATA;

  for (let i = 0; i < data.length; i++) {
    table += `
      <tr>
        <td>${i + 1 || "--"}</td>
        <td>${data[i].title || "--"}</td>
        <td>${data[i].price || "--"}</td>
        <td>${data[i].taxes || "--"}</td>
        <td>${data[i].ads || "--"}</td>
        <td>${data[i].discount || "--"}</td>
        <td>${data[i].total || "--"}</td>
        <td>${data[i].count || "--"}</td>
        <td class="category__data">${data[i].category || "--"}</td>

        <td class="edit__btn">
          <button onClick="updateProduct(${i})" class="btn"><span class="edit__icon">✏️</span></button>
        </td>

        <td class="delete__btn">
          <button onClick="deleteProduct( ${i})" class="btn"><span class="delete__icon">🗑️</span></button>
        </td>

      </tr>`;

    deleteAllHandler(i);
  }

  createBtn.textContent = "create";
  count.classList.remove("disable");

  return (tableBody.innerHTML = table);
};

SHOW_PRODUCTS();

// //__________________
// // Update-Opearation;

const updateProduct = (idx) => {
  // state.crudMode = "update";

  const {
    title: titleValue,
    price: priceValue,
    taxes: taxesValue,
    ads: adsValue,
    discount: discountValue,
    category: categoryValue,
  } = state.PRODUCTS_DATA[idx];

  title.value = titleValue;
  price.value = priceValue;
  taxes.value = taxesValue;
  ads.value = adsValue;
  discount.value = discountValue;
  category.value = categoryValue;

  // state.updateProductIdx = idx;
  getTotalHanlder("false");
  count.classList.add("disable");
  createBtn.textContent = "Update";

  state.productId = idx;
  state.systemMode = "update";
};

// //__________________
// // Search-Opearation;
// /*
//   - Search by title
//   - Search by category

// */

// const searchTitleBtn = document.getElementById("searchTitleBtn");
// const searchCategoryBtn = document.getElementById("searchCategoryBtn");

// const searchBtn = (id) => {
//   if (id === "searchTitleBtn") {
//     console.log(state.searchMode);
//   } else {
//     state.searchMode = "byCategory";
//     console.log(state.searchMode);
//   }
// };

// const SearchInput = (value) => {
//   state.PRODUCTS_DATA.forEach((product, idx) => {
//     if (product.title.includes(value)) {
//       SHOW_PRODUCTS();
//     } else {
//       console.log("not found");
//     }
//   });
// };

//-------------------------------------------

//==================================
//==================================
//==================================
//==================================
//==================================

// const price = document.getElementById("price");
// const taxes = document.getElementById("taxes");
// const title = document.getElementById("title");
// const ads = document.getElementById("ads");
// const discount = document.getElementById("discount");
// const total = document.querySelector("small");
// const count = document.getElementById("count");
// const category = document.getElementById("category");
// const createBtn = document.getElementById("createBtn");
// const tableBody = document.getElementById("tableBody");

// const state = {
//   crudMode: "create",
//   updateProductIdx: "",
//   searchMode: "byTitle",
// };

// let PRODUCT_DATA;

// if (localStorage.product != null) {
//   PRODUCT_DATA = JSON.parse(localStorage.product);
// } else {
//   PRODUCT_DATA = [];
// }

// //__________________
// // Delete All-Opearation;
// const deleteAll = (idxs) => {
//   const deleteAllBtn = document.querySelector(".outputs-delete__eng .btn");

//   if (PRODUCT_DATA.length > 0) {
//     deleteAllBtn.classList.remove("disable");
//     deleteAllBtn.textContent = `delete all (${idxs})`;

//     deleteAllBtn.addEventListener("click", () => {
//       localStorage.clear();
//       PRODUCT_DATA.splice(0);
//       showProducts();
//     });
//   } else {
//     deleteAllBtn.classList.add("disable");
//   }
// };

// ///============================|
// const showData = () => {
//   let table = "";

//   for (let i = 0; i < PRODUCT_DATA.length; i++) {
//     table += `
//       <tr>
//         <td>${i + 1 || "--"}</td>
//         <td>${PRODUCT_DATA[i].title || "--"}</td>
//         <td>${PRODUCT_DATA[i].price || "--"}</td>
//         <td>${PRODUCT_DATA[i].taxes || "--"}</td>
//         <td>${PRODUCT_DATA[i].ads || "--"}</td>
//         <td>${PRODUCT_DATA[i].discount || "--"}</td>
//         <td>${PRODUCT_DATA[i].total || "--"}</td>
//         <td>${PRODUCT_DATA[i].count || "--"}</td>
//         <td class="category__data">${PRODUCT_DATA[i].category || "--"}</td>

//         <td class="edit__btn">
//           <button onClick="updateProduct(${i})" class="btn"><span class="edit__icon">✏️</span></button>
//         </td>

//         <td class="delete__btn">
//           <button onClick="deleteProduct(${i})" class="btn"><span class="delete__icon">🗑️</span></button>
//         </td>

//       </tr>`;
//   }

//   tableBody.innerHTML = table;
// };

// showData();
// ///============================|

// //__________________
// // Delete-Opearation;

// const deleteProduct = (idx) => {
//   console.log(idx);

//   PRODUCT_DATA.splice(idx, 1);
//   console.log(PRODUCT_DATA);
//   localStorage.product = JSON.stringify(PRODUCT_DATA);
//   showProducts();
// };

// //__________________
// // Update-Opearation;

// const updateProduct = (id) => {
//   state.crudMode = "update";

//   const {
//     title: titleValue,
//     price: priceValue,
//     taxes: taxesValue,
//     ads: adsValue,
//     discount: discountValue,
//     category: categoryValue,
//   } = PRODUCT_DATA[id];

//   title.value = titleValue;
//   price.value = priceValue;
//   taxes.value = taxesValue;
//   ads.value = adsValue;
//   discount.value = discountValue;
//   category.value = categoryValue;

//   state.updateProductIdx = id;
//   getTotalHanlder("false");
//   count.classList.add("disable");
//   createBtn.textContent = "Update";
// };

// //__________________
// // Search-Opearation;
// /*
//   - Search by title
//   - Search by category

// */

// const searchTitleBtn = document.getElementById("searchTitleBtn");
// const searchCategoryBtn = document.getElementById("searchCategoryBtn");

// const searchBtn = (id) => {
//   if (id === "searchTitleBtn") {
//     console.log(state.searchMode);
//   } else {
//     state.searchMode = "byCategory";
//     console.log(state.searchMode);
//   }
// };

// const SearchInput = (value) => {
//   PRODUCT_DATA.forEach((product, idx) => {
//     if (product.title.includes(value)) {
//       console.log(product.title, idx);
//       showProductsHandler(product, idx);
//     } else {
//       console.log("not found");
//     }
//   });
// };

// //__________________
// // Status Of Total Handler
// const toggleTotalStatus = (status, value = 0) => {
//   if (status) {
//     total.textContent = value;
//     total.style.backgroundColor = "green";
//   } else {
//     total.textContent = value;
//     total.style.backgroundColor = "#ff0000bd";
//   }
// };

// //__________________
// // Get Total Handler

// const getTotalHanlder = function (status) {
//   const totalInputs = document.getElementById("totalInputs");

//   const totalOperation = () => {
//     if (price.value) {
//       let result = +price.value + +taxes.value + +ads.value - +discount.value;
//       toggleTotalStatus(true, result);
//     } else {
//       toggleTotalStatus(false);
//     }
//   };

//   if (status === "create") {
//     return [...totalInputs.children].forEach((input) =>
//       input.addEventListener("keyup", totalOperation)
//     );
//   } else {
//     return totalOperation();
//   }
// };

// getTotalHanlder("create");

// createBtn.addEventListener("click", (e) => {
//   e.preventDefault();

//   const product = {
//     title: title.value,
//     price: price.value,
//     taxes: taxes.value,
//     ads: ads.value,
//     discount: discount.value,
//     count: count.value,
//     category: category.value,
//     total: total.textContent,
//   };

//   // if (state.crudMode === "create") {
//   //   if (product.count > 1) {
//   //     // COUNT-OPERATION;
//   //     for (let i = 0; i < product.count; i++) PRODUCT_DATA.push(product);
//   //   } else {
//   //     PRODUCT_DATA.push(product);
//   //   }
//   // } else {
//   //   PRODUCT_DATA[state.updateProductIdx] = product;
//   // }

//   PRODUCT_DATA.push(product);

//   localStorage.setItem("product", JSON.stringify(PRODUCT_DATA));

//   clearInputs();
//   // showProducts();
//   // console.log(PRODUCT_DATA);
//   // showProduct();
//   showData();
// });
