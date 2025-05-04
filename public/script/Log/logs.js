const getInfo = async () => {
  const response1 = await fetch("http://localhost:3000/contribute");
  const response2 = await fetch("http://localhost:3000/info");
  const data1 = await response1.json();
  const data2 = await response2.json();
  let totalCount = {};
  data2.data.forEach((total) => {
    totalCount[total.name] = total.total_count;
  });
  console.log(totalCount);
  data1.Result.forEach((results) => {
    // console.log(results);
    if (results) {
      const table = document.getElementById("Table");
      const newtable = table.insertRow();
      const namecell = newtable.insertCell(0);
      const totalcell = newtable.insertCell(1);
      const amoutcell = newtable.insertCell(2);
      namecell.innerHTML = namecell.innerHTML =
        results.name.charAt(0).toUpperCase() + results.name.slice(1);
      totalcell.innerHTML = `${totalCount[results.name]}`;
      amoutcell.innerHTML = `${results.amount}`;
    }
  });
};
getInfo();
