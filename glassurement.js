// Elements
let row = 1;
let tArea = 0;
let tNumber = 0;
let tPrice = 0;
let check = 0;
let check2 = 0;
const addButton = document.querySelector(".addBtn");
const removeBtn = document.querySelector(".removeBtn");
const resetBtn = document.querySelector(".resetBtn");
const calculate = document.querySelector(".calculateBtn");
// const lr = Number(document.querySelector(".lr1").value);

// Naming columns
document.querySelector(".lCol").value = `Lenght`;
document.querySelector(".bCol").value = `Breadth`;
document.querySelector(".nCol").value = `Number`;
document.querySelector(".pCol").value = `Price`;

// Functions

let rC = function (lenght, breadth, number) {
  const rate = Number(document.querySelector(".rateInput").value);
  const price = ((lenght * breadth) / 144) * rate * number;
  return Math.round(price * 10) / 10;
};

document.querySelector(".inputDetailsContainer").addEventListener("click", (event) => {
  let currBtn;
  let rN;

  if(event.target.tagName === "BUTTON") {
    currBtn = event.target;
    rN = currBtn.getAttribute('data-cab');
  } else {
    return 0;
  }

  document.querySelector(`.op${rN}`).value = rC(
    document.querySelector(`.lr${rN}`).value,
    document.querySelector(`.br${rN}`).value,
    document.querySelector(`.nr${rN}`).value
  );

  for (i = 1; i <= row; i++) {
    tArea =
      tArea +
      Number(document.querySelector(`.lr${i}`).value) *
        Number(document.querySelector(`.br${i}`).value) *
        Number(document.querySelector(`.nr${i}`).value);
    tNumber += Number(document.querySelector(`.nr${i}`).value);
    tPrice += Number(document.querySelector(`.op${i}`).value);
  }
  
});

addButton.addEventListener("click", function () {
  tArea = 0;
  tNumber = 0;
  tPrice = 0;
  let r = ++row;
  document.querySelector(".inputDetailsContainer").insertAdjacentHTML(
    "beforeend",
    `
        <div class="row r${r}" data-row="${r}">
        <br>
            <span>${r}.&nbsp;</span>
            <input type="number" placeholder="L (in inch)" class="inputDetails lr${r}">
            <input type="number" placeholder="B (in inch)" class="inputDetails br${r}">
            <input type="number" placeholder="No." class=" inputDetails inputDetailsNumber nr${r}">
            <input readonly class="inputDetails outputPrice op${r} hidden">
            <button class="btn cAgain ca${r} hidden" data-cab = "${r}">&#x267B;</button>

        </div>
            `
  );

  document.querySelector(`.op${r - 1}`).classList.remove("hidden");
  document.querySelector(`.ca${r - 1}`).classList.remove("hidden");
  document.querySelector(`.op${r - 1}`).value = rC(
    document.querySelector(`.lr${r - 1}`).value,
    document.querySelector(`.br${r - 1}`).value,
    document.querySelector(`.nr${r - 1}`).value
  );

  document.querySelector(".totalOutput")?.classList.add("hidden");

  document.querySelector(`.lr${r}`).focus();

  check2 = 0;
});

removeBtn.addEventListener("click", function () {
  if (row > 1) {
    let r = row;
    document.querySelector(`.r${r}`).remove();
    row--;
    document.querySelector(`.op${r - 1}`).classList.add("hidden");
    document.querySelector(`.ca${r - 1}`).classList.add("hidden");
  }

  document.querySelector(".totalOutput")?.classList.add("hidden");

  check2 = 0;
});

resetBtn.addEventListener("click", function () {
  for (i = row; i > 1; i--) {
    document.querySelector(`.r${i}`).remove();
  }

  document.querySelector(".op1").classList.add("hidden");
  document.querySelector(".ca1").classList.add("hidden");
  document.querySelector(".totalOutput")?.classList.add("hidden");

  row = 1;

  document.querySelector(".rateInput").value = "";
  document.querySelector(".lr1").value = "";
  document.querySelector(".br1").value = "";
  document.querySelector(".nr1").value = "";

  check2 = 0;
});



calculate.addEventListener("click", function () {
  tArea = 0;
  tNumber = 0;
  tPrice = 0;

  // for(i = 1; i <= row; i++){
  //     document.querySelector(`.op${i}`).classList.remove("hidden");
  //     document.querySelector(`.op${i}`).value = rC(
  //         Number(document.querySelector(`.lr${i}`).value),
  //         Number(document.querySelector(`.br${i}`).value),
  //         Number(document.querySelector(`.nr${i}`).value),
  //     );
  // }

  if(check2 == 0) {

    document.querySelector(`.op${row}`).classList.remove("hidden");
    document.querySelector(`.ca${row}`).classList.remove("hidden");
    document.querySelector(`.op${row}`).value = rC(
      Number(document.querySelector(`.lr${row}`).value),
      Number(document.querySelector(`.br${row}`).value),
      Number(document.querySelector(`.nr${row}`).value)
    );

    check2++
  }


  for (i = 1; i <= row; i++) {
    tArea =
      tArea +
      Number(document.querySelector(`.lr${i}`).value) *
        Number(document.querySelector(`.br${i}`).value) *
        Number(document.querySelector(`.nr${i}`).value);
    tNumber += Number(document.querySelector(`.nr${i}`).value);
    tPrice += Number(document.querySelector(`.op${i}`).value);
  }

  if (check == 0) {
    document.querySelector(".inputDetailsContainer").insertAdjacentHTML(
      "afterend",
      `
            <div class=" totalOutput hidden">
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input readonly class="outputDetails totalArea">
                <input readonly class="outputDetails totalNumber">
                <input readonly class=" outputDetails totalPrice">
            </div>
                `
    );
    check++;
  }

  document.querySelector(".totalArea").value = `${
    Math.round((tArea / 144) * 10) / 10
  } Sq.ft`;
  document.querySelector(".totalNumber").value = tNumber;
  document.querySelector(".totalPrice").value = `₹ ${
    Math.round(tPrice * 10) / 10
  }`;

  document.querySelector(".totalOutput").classList.remove("hidden");
});
