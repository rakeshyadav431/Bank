function createAccount(){
  let acc = "ACC"+Date.now();

  db.collection("accounts").doc(acc).set({
    name:name.value,
    balance:0,
    transactions:[]
  });

  alert("Created "+acc);
}

function deposit(){
  let ref = getAccount(acc.value);

  ref.get().then(doc=>{
    let data = doc.data();
    let amtVal = parseInt(amt.value);

    if(amtVal <= 0) return alert("Invalid");

    data.balance += amtVal;
    data.transactions.push({
      type:"deposit",
      amount:amtVal,
      date:new Date().toLocaleString()
    });

    ref.set(data);
  });
}

function withdraw(){
  let ref = getAccount(acc.value);

  ref.get().then(doc=>{
    let data = doc.data();
    let amtVal = parseInt(amt.value);

    if(amtVal > data.balance) return alert("Insufficient");

    data.balance -= amtVal;
    data.transactions.push({
      type:"withdraw",
      amount:amtVal,
      date:new Date().toLocaleString()
    });

    ref.set(data);
  });
}

function loadTransactions(){
  getAccount(acc.value).get().then(doc=>{
    let t = doc.data().transactions;

    drawGraph(t);
  });
}

function drawGraph(t){
  let dep = t.filter(x=>x.type==="deposit").length;
  let wit = t.filter(x=>x.type==="withdraw").length;

  new Chart(chart,{
    type:"bar",
    data:{
      labels:["Deposit","Withdraw"],
      datasets:[{data:[dep,wit]}]
    }
  });
}

function downloadPDF(){
  const { jsPDF } = window.jspdf;
  let doc = new jsPDF();
  doc.text("Transactions",10,10);
  doc.save("passbook.pdf");
}
