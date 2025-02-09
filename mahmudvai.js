// Mahmud Vaiya
//Text
const mdcount  = document.querySelector(".daily-mahmud");
const mtcount  = document.querySelector(".total-mahmud");
//Buttons
const madd_btn = document.querySelector("#mahmud-add");
const mrm_btn  = document.querySelector("#mahmud-remove");
const m_submit = document.querySelector("#mahmud-submit");
let md_count = 0;
let mt_count = 0;
console.log(madd_btn);
//Button add
madd_btn.addEventListener('click',()=>{
    md_count +=1;
    if(md_count>2){
        alert("You can't more than 2 meals per day");
        md_count = 2;
    }
    mdcount.innerHTML = md_count;
});
//Button remove
mrm_btn.addEventListener('click',()=>{
    md_count -=1;
    if(md_count<0){
        md_count = 0;
    }
    mdcount.innerHTML = md_count;
});
m_submit.addEventListener('click',()=>{
    if(md_count >= 2){
    m_submit.disabled = true;
    }
    mrm_btn.addEventListener('click',()=>{
        m_submit.disabled = false;
        mt_count = 0;
    })
    console.log(m_submit);

    mt_count += md_count;
    mtcount.innerHTML = mt_count;
    md_count = 0;
});





