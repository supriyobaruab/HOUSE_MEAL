const getInfo = async () => {
  const response1 = await fetch("http://localhost:3000/contribute");
  const response2 = await fetch("http://localhost:3000/info");
  const data1 = await response1.json();
  const data2 = await response2.json();

  let totalAmount = 0;
  let totalContribute = 0;
  let totalCount = {};
  let perPerson = {};
  let ceilmealRate = 0;

  data2.data.forEach((total) => {
    totalCount[total.name] = total.total_count;
    totalAmount += total.total_count;
  });

  data1.Result.forEach((results) => {
    if (results) {
      totalContribute += results.amount;
    }
  });

  const mealRate = totalContribute / totalAmount;
  ceilmealRate = Math.ceil(mealRate);

  data1.Result.forEach((results) => {
    if (results) {
      const personMealCount = totalCount[results.name] || 0;
      perPerson[results.name] = personMealCount * ceilmealRate;

      const table = document.getElementById("Table");
      const newtable = table.insertRow();
      const namecell = newtable.insertCell(0);
      const totalcell = newtable.insertCell(1);
      const amoutcell = newtable.insertCell(2);
      const costcell = newtable.insertCell(3);

      namecell.innerHTML = namecell.innerHTML =
        results.name.charAt(0).toUpperCase() + results.name.slice(1);
      totalcell.innerHTML = personMealCount;
      amoutcell.innerHTML = results.amount;
      costcell.innerHTML = perPerson[results.name];
    }
  });

  console.log(totalCount);
  console.log(ceilmealRate);
  console.log(perPerson);
};

getInfo();
