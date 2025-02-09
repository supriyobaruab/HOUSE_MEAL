// Supriyo
//Text
const sdcount  = document.querySelector(".daily-supriyo");
const stcount  = document.querySelector(".total-supriyo");
//Buttons
const sadd_btn = document.querySelector("#supriyo-add");
const srm_btn  = document.querySelector("#supriyo-remove");
const s_submit = document.querySelector("#supriyo-submit");
let sd_count = 0;
let st_count = 0;
console.log(sadd_btn);
//Button add
sadd_btn.addEventListener('click',()=>{
    sd_count +=1;
    if(sd_count>2){
        alert("You can't more than 2 meals per day");
        sd_count = 2;
    }
    sdcount.innerHTML = sd_count;
});
//Button remove
srm_btn.addEventListener('click',()=>{
    sd_count -=1;
    if(sd_count<0){
        sd_count = 0;
    }
    sdcount.innerHTML = sd_count;
});
s_submit.addEventListener('click',()=>{
    if(sd_count >= 2){
    s_submit.disabled = true;
    }
    srm_btn.addEventListener('click',()=>{
        s_submit.disabled = false;
        st_count = sd_count;
        
    })
    console.log(s_submit);

    st_count += sd_count;
    stcount.innerHTML = st_count;
    sd_count = 0;
});





