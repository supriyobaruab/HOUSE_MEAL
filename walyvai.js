// waly
//Text
const wdcount  = document.querySelector(".daily-waly");
const wtcount  = document.querySelector(".total-waly");
//Buttons
const wadd_btn = document.querySelector("#waly-add");
const wrm_btn  = document.querySelector("#waly-remove");
const w_submit = document.querySelector("#waly-submit");
let wd_count = 0;
let wt_count = 0;
console.log(wadd_btn);
//Button add
wadd_btn.addEventListener('click',()=>{
    wd_count +=1;
    if(wd_count>2){
        alert("You can't more than 2 meals per day");
        wd_count = 2;
    }
    wdcount.innerHTML = wd_count;
});
//Button remove
wrm_btn.addEventListener('click',()=>{
    wd_count -=1;
    if(wd_count<0){
        wd_count = 0;
    }
    wdcount.innerHTML = dd_count;
});w_submit.addEventListener('click',()=>{
    if(wd_count >= 2){
    w_submit.disabled = true;
    }
    wrm_btn.addEventListener('click',()=>{
        w_submit.disabled = false;
        wt_count = 0;
    })
    console.log(w_submit);

    wt_count += wd_count;
    wtcount.innerHTML = wt_count;
    wd_count = 0;
});