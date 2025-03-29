 
 const showloading =()=>{
     document.getElementById('loader').classList.remove("hidden");
     document.getElementById('video-container').classList.add("remove");
 }
 
 const removeShowloading =()=>{
   
  document.getElementById('loader').classList.add("hidden");
     document.getElementById('video-container').classList.remove("remove");
     
 }
 
 
 function loadCategories(){

//    fetch the data
   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
   .then((res)=> res.json())
   .then((data)=> displayCategories(data.categories));
 }

   const removeActiveClass = ()=>{
      const activeButton= document.getElementsByClassName(`active`);
      for(let active of activeButton){
          active.classList.remove("active");
      }
   }
 
 const videoCategories = (id)=>{ 
  showloading();
  const url =`https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
  .then((res)=>res.json())
  .then((data) =>{
    removeActiveClass();
    const btnclass = document.getElementById(`btn-${id}`);
    
     btnclass.classList.add('active');
    displayVideo(data.category)
  });

}  

const videoDetails=(detail)=>{
   const url =`https://openapi.programming-hero.com/api/phero-tube/video/${detail}`;
   fetch(url)
   .then((res)=> res.json())
   .then((data)=> displayVideoDetail(data.video) )

}

 const displayVideoDetail =(video)=>{

   document.getElementById('show_detail').showModal();
   const detailContainer = document.getElementById('detail-Container');
   detailContainer.innerHTML = `

  <div class="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img src="${video.thumbnail}"
    </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>


   
   `

 }


 function displayCategories(categories){
    //   get the container
     const categorycontainer = document.getElementById("category-container");
    // loop operation of array on object
    for(let cat of categories){
    // create the element 
      const createlement = document.createElement('div');
      createlement.innerHTML=`
         <button id="btn-${cat.category_id}" onclick="videoCategories(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category} </button>
      `
      categorycontainer.append(createlement);

      // append the element
    }
 }

      
  function loadVideos(searchVideos = ''){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title= ${searchVideos}` )
    .then((res)=> res.json())
    .then((data)=>{
        const btnall = document.getElementById("btn-all");
        btnall.classList.add('active');
      displayVideo(data.videos)
    });
}
 

  //  object cover means image streche cut 
  const displayVideo =(videos)=>{
      const vid_container = document.getElementById('video-container');
      vid_container.innerHTML = "";
      if(videos.length == 0){
        vid_container.innerHTML=`
        <div class="col-span-full
         flex flex-col py-40 justify-center items-center ">
        <img class="w-[120px] " src="img-src/Icon.png" alt="">
        <h2 class="font-bold  text-xl">oops!Sorry no content here</h2>
       </div>
        
        `;
        return ;
      }
       videos.forEach((video)=>{
           const container = document.createElement("div");
           container.innerHTML = `
          
         <div class=" bg-base-100 ">
            <figure class="relative">
               <img class="w-full h-[180px] object-cover rounded-lg"  
                src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white bg-black text-sm rounded-4">3hrs 56 min ago</span>
            </figure>
            <div class=" flex gap-4 px-0">
              <div class="profile"><div class="avatar">
                <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                  <img src="${video.authors[0].profile_picture}" />
                </div>
              </div></div>
              <div class="body-contex">
                
                <p>${video.title} </p>
                    <h2 class="tex-xl font-bold flex ">Awlad Hossain ${video.authors[0].verified == true ? `<img class="w-6 ml-4" src="https://img.icons8.com/?size=60&id=59733&format=png" alt="">`  : `not verified` } </h2>
               <h2>${video.others.views}</h2>
              </div>

             
            </div>
            <button onclick="videoDetails('${video.video_id}')" class="btn btn-block">show details</button>
          </div>


           `;
           vid_container.append(container);
       });
 
       removeShowloading ();
        
      
     
  }

  document.getElementById("input").addEventListener("keyup",(e)=>{
      const inputValue = e.target.value;
     
       loadVideos(inputValue);


  }
  )
  loadCategories()
   
