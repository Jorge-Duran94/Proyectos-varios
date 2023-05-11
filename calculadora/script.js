const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

buttons.forEach((item)=>{
    item.onclick=()=>{
        if(item.id=="clear"){
            display.innerText="";
            //colocando comillas cambia el texto interior por nada o " "
        }else if(item.id=="BORRAR"){
            let string = display.innerText.toString();
            display.innerText=string.substr(0,string.length-1);
            //Extrae de string (variable) como la totalidad del dato, con el (-1) borra
            //el ultimo dato de la longitud
        }else if(display.innerText !="" && item.id=="equal"){
            display.innerText= eval(display.innerText);
        }else if (display.innerText=="" && item.id=="equal"){
            display.innerText="null";
            setTimeout(()=>(display.innerText=""),3000)
        }else {
            display.innerText+=item.id;
            //nos deja agregar al display los datos que vayamos ingresando
        }
    };
});

const themeToggleBtn = document.querySelector(".theme-toggler")
const calculator = document.querySelector(".calculator")
// const toggleIcon = document.querySelector(".toggler-icon")
let isDark = true;
themeToggleBtn.onclick = () => {
    calculator.classList.toggle("dark");
    themeToggleBtn.classList.toggle("active");
    isDark=!isDark;
}