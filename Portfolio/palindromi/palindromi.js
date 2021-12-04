var alue = document.getElementById("inputt");
var text = document.getElementById("moroz").value;
alue.addEventListener(
  "keyup",
  (event) => {
    var name = event.key;
    if (name === "Enter") {
      alert(run(alue.value));
    }
  },
  false
);

const input = document.getElementById("inputt").value;

function run(a) {
  var z = false;
  let väärinpäin = "";
  for (var i = a.length - 1; i >= 0; i--) {
    väärinpäin += a[i];
  }

  if (a == väärinpäin) {
    z = true;
    moroz.innerHTML = "SE ON !!!!!!!!!!";
  } else {
    moroz.innerHTML = "ei oo ei...";
  }

  return z;
}
