document.addEventListener("click" , function(x){
    if(x.target.classList.contains("edit-me"))
    {
        let a = prompt("Please enter your desired value");
        if(a)
        {
            axios.post("/update-item" ,{text:a , id:x.target.getAttribute("data-id")}).then(function(){
               x.target.parentElement.parentElement.querySelector(".item-text").innerHTML = a;
            }).catch(function(){
                alert("Error in updating item");
            });
        }
    }
    if(x.target.classList.contains("delete-me"))
    {
        if(confirm("Do you really want to delete it ??"))
        {
            axios.post("/delete-item" ,{id:x.target.getAttribute("data-id")}).then(function(){
               x.target.parentElement.parentElement.remove();
            }).catch(function(){
                alert("Error in deleting item");
            });
        }
    }
})