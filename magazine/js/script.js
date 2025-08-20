function myFunction() {
    var x = document.getElementsByClassName("nav-link");
    for (el of x) {
        if(el.classList.contains("appear")) {
            el.classList.remove("appear");
        }
        else {
            el.classList.add("appear");
        }
    }
}