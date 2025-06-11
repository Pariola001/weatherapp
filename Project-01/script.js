function $(sel){
    return document.querySelector(sel);
}
window.addEventListener("load", () => {
    $("#menu_btn").addEventListener("click",(event)=>{
        event.stopImmediatePropagation();
        $(".nav-links").style.display="block";
    })
document.body.addEventListener("click", ()=>{
        $(".nav-links").style.display="none";
});
$(".nav-links").addEventListener("click", (event)=>{
    event.stopImmediatePropagation();
})
});