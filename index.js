var recipe_name = document.querySelector('#searched');
const result_container= document.querySelector('.result-container');
const result_block= document.querySelector('.result-block');
const rec_block= document.querySelector('.rec-block');
const ser_msg= document.querySelector('.ser_msg');
const search = document.querySelector("#search").addEventListener("click",(e)=>{
   if(recipe_name.value==''){
      setTimeout(()=> {
         ser_msg.innerHTML='Field is empty...';
      },100)
      setTimeout(()=> {
         ser_msg.innerHTML='';
      },2000)  
   }
   else if(recipe_name.value !==''){
      setTimeout(()=> {
         ser_msg.innerHTML='Your Search Results...';
      },10)
      setTimeout(()=> {
         ser_msg.innerHTML='';
      },2000) 
      e.preventDefault();
      fetchapi();
      recipe_name.value='';
   }
});
async function fetchapi(){
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe_name.value.trim()}`)
  const data = await response.json();
  console.log(data);
  data.meals.forEach(e => {
   result_container.insertAdjacentHTML('afterbegin',`
   <div class="recipe-block">
      <img src="${e.strMealThumb}" height="150px" width="200px" alt="">
      <h2>${e.strMeal}</h2>
      <div class="">
      <p>${e.strCategory} </p>
      <button id="show">View Recipe</button>
      </div>
   </div>
   `)
   var btn = document.querySelector('#show').addEventListener('click',()=>{
      show(e);
   })
  });
}
const ingredients = (e)=>{
   let ing_ist = "";
  for (let i = 1; i <= 20; i++) {
  let list = e[`strIngredient${i}`];
   if(list){
      const measure = e[`strMeasure${i}`];
      ing_ist +=`<li>${measure} ${list}</li>`;
   }else{
      break;
   }
}
return ing_ist;
}
const show = (e)=>{
   document.body.insertAdjacentHTML('afterbegin',`
   <div class="show_box">
      <div class="dflex"><button class="cross"><ion-icon name="close" ></ion-icon></button></div>
      <h2 style="text-align:center; font-size:30px;">${e.strMeal}</h2>
      <div class="ins">
         <div class="ingredients-section"><h3>Ingredients:</h3><br><ul>${ingredients(e)}</ul></div>
         <div class="instruction-section"><p><h3>Instruction:</h3><br><br>${e.strInstructions}</p></div>
      </div>
   </div>
   
   `)
   const showbox= document.querySelector('.show_box');
   const cross= document.querySelector(".cross").addEventListener('click',()=>{
      showbox.remove();
   })
}



