function normalize(){

  const toNum = (v) => {
    const n = Number(v);
    return isNaN(n) ? 0 : n;
  };

  return {
    age: toNum(document.getElementById("ageNow")?.value),
    retire: toNum(document.getElementById("retireAge")?.value),
    status: document.getElementById("status")?.value || "single",
    deps: toNum(document.getElementById("deps")?.value),

    income: [...document.querySelectorAll(".incomeVal")]
      .map(i => toNum(i.value)),

    assets: [...document.querySelectorAll(".assetVal")]
      .map(i => toNum(i.value))
  };
}
