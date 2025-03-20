 
 function loadCategories(){

//    fetch the data
   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
   .then((res)=> res.json())
   .then((data)=> displayCategories(data.categories));
 }

 function displayCategories(categories){
    //   get the container
     const categorycontainer =document.getElementById("category-container");
    // loop operation of array on object
    for(let cat of categories){
    // create the element 
      const createlement = document.createElement('div');
      createlement.innerHTML=`
         <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category} </button>
      `
      categorycontainer.append(createlement);

    // append the element
    }
 }
   
  function loadVideos(){
      fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
      .then((res)=> res.json())
      .then((data)=>displayVideo(data.videos));
  }
   
  const displayVideo =(videos)=>{
      const vid_container = document.getElementById('video-container');
       videos.forEach((video)=>{
           const container = document.createElement("div");
           container.innerHTML = `
          
         <div class=" bg-base-100 ">
            <figure class="relative">
              <img class="w-full h-[180px]"
                src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white bg-black text-sm rounded-4">3hrs 56 min ago</span>
            </figure>
            <div class=" flex gap-4 px-0">
              <div class="profile"><div class="avatar">
                <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div></div>
              <div class="body-contex">
                
                <p>${video.title} </p>
                    <h2 class="tex-xl font-bold flex ">Awlad Hossain <img class="w-6 ml-4" src="https://img.icons8.com/?size=60&id=59733&format=png" alt=""> </h2>
               <h2>91K views</h2>
              </div>

             
            </div>
          </div>


           `;
           vid_container.append(container);
       });

      //  append the video container
        
      
     
  }

   loadVideos();
 loadCategories();