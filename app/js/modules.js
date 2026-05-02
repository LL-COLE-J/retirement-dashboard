function normalize(){

  return {
    age: Number(document.getElementById("ageNow").value),
    retire: Number(document.getElementById("retireAge").value),
    status: document.getElementById("status").value,
    deps: Number(document.getElementById("deps").value),

    income: [...document.querySelectorAll(".incomeVal")]
      .map(i=>Number(i.value)||0),

    assets: [...document.querySelectorAll(".assetVal")]
      .map(i=>Number(i.value)||0)
  };
}
