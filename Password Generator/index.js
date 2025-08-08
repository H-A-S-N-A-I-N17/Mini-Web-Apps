const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[dataLengthNumber]");
const passwordDisplay = document.querySelector("[PasswordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copy-message]");
const upperCaseCheck=document.querySelector("#uppercase");
const lowerCaseCheck= document.querySelector("#lowercase");
const numberCheck=document.querySelector("#numbers");
const symbolCheck= document.querySelector("#symbols");
const indicator = document.querySelector("[data-Indicator]");
const generateButton=document.querySelector(".generateBtn");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");

let password="";
let passwordLength=10;
let checkCount=1;
const symbols='~!@#$%^&*()_+=-{}[]|\:">.<,';
console.log(symbols[0],symbols[1]);
setIndicator("#ccc");
handleSlider();

// fixes the default ui of the slider and the corresponding number
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize= ( (passwordLength - min)*100/(max - min)) + "% 100%";
    

}

//strength ke corresponding div ka color change karta hai
function setIndicator(color){
    indicator.style.backgroundColor= color;
    //adding shadow is in homework
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}


function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNumber(){
    return getRandomInteger(0,9);
}
function generateLowerCase(){
    console.log("hello");
     let a=String.fromCharCode(getRandomInteger(97,123));
     console.log(a+"jklsd");
      return a;
}
function generateUpperCase(){
    let b=String.fromCharCode(getRandomInteger(65,91));
    return b;
}
function generateSymbols(){
    
    let c=symbols.length;
   const rando= getRandomInteger(0,c);
   //console mein jab symbols[rand] print karwa rhe toh ek hi symbol baar baar kyu aa rha tha change kyu nhi ho rha tha
   //bhaiya method
   return symbols.charAt(rando);
   //mera method
    // return symbols[rando];
    

}
//password strength check kar ke batti ko green ya red kar dega

function calculateStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSymbol=false;
    if(upperCaseCheck.checked)
    hasUpper=true;
    if(lowerCaseCheck.checked)
    hasLower=true;
    if(numberCheck.checked)
    hasNum=true;
    if(symbolCheck.checked)
    hasSymbol=true;

    //logic to check password length
    if(hasUpper && hasLower && (hasNum||hasSymbol) && passwordLength>=8)
    setIndicator("green");
    else 
    setIndicator("red");
}
async function copyContent(){
    try{
         await navigator.clipboard.writeText(passwordDisplay.value );
          copyMsg.innerText="copied" ;
    }
    catch(e){
         copyMsg.innerText="failed";
    }
    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
}
inputSlider.addEventListener("input",(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})
copybtn.addEventListener("click",()=>{
    if(passwordDisplay)
    {
        copyContent();
    }
})
//everytime there is any change , handleCheckBoxChange will take care of it and will update the checkcount
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{if(checkbox.checked){
        checkCount++;
    }})
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        //for ui updation
        handleSlider();
    }
}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener("click",handleCheckBoxChange);
})

//Fisher Yates Method
function shufflePassword(array) {
    
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

//generate button code
generateButton.addEventListener("click",()=>{
    if(checkCount==0)
    return ;
    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        //to update the ui 
        handleSlider();
    }
    //removing old password
    //check it 
    password="";
    //creating an array which stores all the function to create characters for password
    let funcArr=[];

    if(upperCaseCheck.checked)
    {
        funcArr.push(generateUpperCase);
    }
    if(lowerCaseCheck.checked)
    {
        funcArr.push(generateLowerCase);
        // funcArr.push(generateRandomNumber);
    }
    if(numberCheck.checked)
    {
        funcArr.push(generateRandomNumber);
    }
    if(symbolCheck.checked)
    {
        funcArr.push(generateSymbols);
    }
    //compulsory addition
    for(let i=0;i<funcArr.length;i++)
    {
        password+=funcArr[i]();

    }

    //remaining addition
    for(let i=0;i<passwordLength-funcArr.length;i++)
    {
        let randIndex=getRandomInteger(0,funcArr.length);
        password+=funcArr[randIndex]();
    }

    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calculateStrength();
    

})




