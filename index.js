// get time
function getTimeString(time) {
    const day = parseInt(time / 86400)
    let remainingSecond = parseInt(time % 86400)
    const hour = parseInt(remainingSecond / 3600)
    remainingSecond = parseInt(remainingSecond % 3600)
    const minute = parseInt(remainingSecond / 60)
    remainingSecond = parseInt(remainingSecond % 60)
    return ` ${hour} hour ${minute} minute ${remainingSecond} second ago`
}
console.log(getTimeString(5678))

let allVideos = [];




// remove active class
const removeActive = () => {
    const buttons = document.getElementsByClassName('active-btn')
    for (btn of buttons) {
        btn.classList.remove('activeColor')
    }


}

// sort
const sortVideo = () => {
    document.getElementById('sortId').addEventListener('click' , () =>{
   console.log('click')
   console.log(allVideos)
   const sorted = [...allVideos].sort((a,b)=> {
   const viewsA = parseInt(a.others.views.replace(/[^\d]/g, '')) || 0;
      const viewsB = parseInt(b.others.views.replace(/[^\d]/g, '')) || 0;
      return viewsB - viewsA;
     
   })
 displayCards(sorted)
})

}




const loadCards = (searchText='') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => {
         allVideos = data.videos;
         displayCards(data.videos)
        })
         

        //   sortVideo()
        .catch(err => console.log(err))
}



// display the categories data
const displayCards = (videos) => {
    console.log(videos)
    const allCards = document.getElementById('cards')
    allCards.innerHTML = ''
    if (videos.length === 0) {
        allCards.classList.remove('grid')
        allCards.innerHTML = `<div class="w-full flex flex-col gap-4 justify-center items-center">
         <img src="./assets/Icon.png" alt="">
         <h2 class="font-bold text-xl">Oops!! Sorry, There is no content here</h2>
         </div>`
        return;
    }
    else {
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
      <h4>${video.others.views}</h4>
      ${video.others.posted_date ? `<span class="absolute right-5 bottom-5 text-white bg-black rounded-lg px-10 py-1 text-xs">
        ${getTimeString(video.others.posted_date)}</span>` : ''}
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
  <button onClick="loadDetails('${video.video_id
}')" class="btn btn-sm btn-error text-white">Details</button>
</div>

        
        `;


        allCards.appendChild(div)

    });


}

// fetch load and display categories on html
console.log('connected')
// fetch the categories data
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log(err))
}


// display the categories data
const displayCategories = (categories) => {
    const allCategories = document.getElementById('allCategories')
    categories.forEach((category, index) => {
        console.log(category)
        // display all categories
        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = `<button id="btn-${category.category_id}" onClick="loadCategoriesById(${category.category_id})" 
    class="active-btn btn">${category.category}</button>`
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
        .then(data => {
            removeActive()
            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add('activeColor')
            displayCards(data.category
            )
        })
        .catch(err => console.log(err))
}





// load video details
const loadDetails= async(video_id)=>{
  console.log(video_id)
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`
   const res = await fetch(uri)
   const data = await res.json()
  displayVideoDetails(data.video)  

        

}

const displayVideoDetails = (video) => {
  console.log(video)
 const modalDetails = document.getElementById('modalDetails')
 modalDetails.innerHTML = 
 `
 <img src= '${video.thumbnail}'/>
 <p class="py-4">${video.description}</p>
    <div class="modal-action">
      <form method="dialog">
       <button class="btn">Close</button>
      </form>
    </div>
 `
//   show modal
// way-1
//  document.getElementById('modal-btn').click()
// way-2
document.getElementById('customModal').showModal()


}

// sort



// get search value
document.getElementById('searchInput').addEventListener('keyup', (e)=> {
 loadCards(e.target.value)
 
})

loadCategories()
loadCards()
 sortVideo();
loadDetails()