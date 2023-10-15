const searchBar = document.querySelector('.sButton')
const actS = document.querySelector('.form-input-search')
const cardDom = document.querySelector('.main-cards')

const getFromQuery = async (n)=>{
  console.log(`trying for ${n}`)
  try{
    const{ data }= await axios.get(`/api/v1/search/${n}`)
    console.log(data);
    if(data.length<1){
      cardDom.innerHTML = '<h5 class "empty-list">No such users found</h5>'  //yo add this in css
      loagindDOM.style.visibility = 'hidden'  // yo add this in html and css
      return
    }

    const allRes = data.map((user)=>{
    const {name,_id} = user
    return `
    <div class="card text-center" style="width: 25vw;">
       <div class="card-body"  >
         <a href= "/jobsOther/?id=${_id}&name=${name}">${name}</a>
       </div>
    </div>
    `
    }).join('')
    cardDom.innerHTML = allRes
  }catch(error){
  console.log(error);
  }
}

if(window.location.search){
  let params = new URLSearchParams(window.location.search);
  const name =params.get('name');
  console.log(name);
  getFromQuery(name);
}


searchBar.addEventListener('click',async (e)=>{
  const el = e.target
 
    const searchFor = actS.value
    try{
      const{ data }= await axios.get(`/api/v1/search/${searchFor}`)
      console.log(data);
      if(data.length<1){
        cardDom.innerHTML = '<h5 class "empty-list">No such users found</h5>'  //yo add this in css
        loagindDOM.style.visibility = 'hidden'  // yo add this in html and css
        return
      }

      const allRes = data.map((user)=>{
      const {name,_id} = user
      return `
      <div class="card text-center" style="width: 25vw;">
         <div class="card-body"  >
           <a href= "/jobsOther/?id=${_id}&name=${name}">${name}</a>
         </div>
      </div>
      `
      }).join('')
      cardDom.innerHTML = allRes
    }catch(error){
    console.log(error);
  }

})