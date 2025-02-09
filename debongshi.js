// debongshi
//Text
const ddcount  = document.querySelector(".daily-debongshi");
const dtcount  = document.querySelector(".total-debongshi");
//Buttons
const dadd_btn = document.querySelector("#debongshi-add");
const drm_btn  = document.querySelector("#debongshi-remove");
const d_submit = document.querySelector("#debongshi-submit");
let dd_count = 0;
let dt_count = 0;
 console.log(d_submit);
console.log(dadd_btn);
//Button add
dadd_btn.addEventListener('click',()=>{
    dd_count +=1;
    if(dd_count>2){
        alert("You can't more than 2 meals per day");
        dd_count = 2;
    }
    ddcount.innerHTML = dd_count;
});
//Button remove
drm_btn.addEventListener('click',()=>{
    dd_count -=1;
    if(dd_count<0){
        dd_count = 0;
    }
    ddcount.innerHTML = dd_count;
});
d_submit.addEventListener('click',()=>{
    if(dd_count >= 2){
    d_submit.disabled = true;
    }
    drm_btn.addEventListener('click',()=>{
        d_submit.disabled = false;
        dt_count = 0;
    })
   

    dt_count += dd_count;
    dtcount.innerHTML = dt_count;
    dd_count = 0;
});