// get time
function getTimeString(time){
const day = parseInt(time/86400)
let remainingSecond = parseInt(time%86400)
const hour = parseInt(remainingSecond/3600)
remainingSecond = parseInt(remainingSecond%3600)
const minute = parseInt(remainingSecond/60)
remainingSecond = parseInt(remainingSecond%60)
return ` ${hour} hour ${minute} minute ${remainingSecond} second ago`
}
console.log(getTimeString(5678))

// fetch load and display categories on html
console.log('connected')
// fetch the categories data
const loadCategories = () => {
 fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
 .then(res => res.json())
 .then (data => displayCategories(data.categories))
 .catch(err => console.log(err))
}


// display the categories data
const displayCategories = (categories) => {
    const allCategories = document.getElementById('allCategories')
    categories.forEach((category,index) => {
    console.log(category)
    // display all categories
    const buttonContainer = document.createElement('div')
    buttonContainer.innerHTML = `<button onClick="loadCategoriesById(${category.category_id})" class="btn">${category.category}</button>`
    console.log(index)
//    if (index === 0) {
//     button.className = 'btn bg-[#d5345c] text-white';
// } else {
//     button.className= 'btn bg-gray-300';
// }

 allCategories.appendChild(buttonContainer)
    
  });


}

// display data by categories
const loadCategoriesById = (id) => {
     fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
 .then(res => res.json())
 .then (data => displayCards(data.category
))
 .catch(err => console.log(err))
}


const loadCards = () => {
 fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
 .then(res => res.json())
 .then (data => displayCards(data.videos))
 .catch(err => console.log(err))
}


// display the categories data
const displayCards = (videos) => {
     console.log(videos)
    const allCards = document.getElementById('cards')
    allCards.innerHTML = ''
    if(videos.length === 0){
        allCards.classList.remove('grid')
        allCards.innerHTML = `<div class="w-full flex flex-col gap-4 justify-center items-center">
         <img src="./assets/Icon.png" alt="">
         <h2 class="font-bold text-xl">Oops!! Sorry, There is no content here</h2>
         </div>`
        return;
    }
    else{
        allCards.classList.add('grid')
    }
   videos.forEach((video) => {
    console.log(video.thumbnail)
    // display all categories
    const div = document.createElement('div')
     div.innerHTML = `
         <div class="card bg-base-100 w-80 md:w-[340px] shadow-sm mx-auto ">
         <div class="relative">
         <img class="h-[214px] w-full object-cover "
      src="${video.thumbnail}"/>
      ${video.others.posted_date? `<span class="absolute right-5 bottom-5 text-white bg-black rounded-lg px-10 py-1 text-xs">
        ${getTimeString(video.others.posted_date)}</span>` :''}
         </div>
  
      
  <div class="card-body">
    <h2 class="card-title">
       <img class="avatar w-12 h-12 object-cover rounded-full" src="${video.authors[0].profile_picture}" />
    ${video.title}
     
    </h2>
    <p>${video.description}</p>
    <div class="text-gray-700">
      <p class="flex items-center space-x-8">${video.authors[0].profile_name} 
      ${video.authors[0].verified == true ? ` <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="text-primary h-5 w-5"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clip-rule="evenodd"
        />
      </svg>` : ''}
       
      </p>
      <p>${video.others.views}</p> 
    </div>
  </div>
</div>
        
        `;

       
 allCards.appendChild(div)
    
  });


}




loadCategories()
loadCards()
