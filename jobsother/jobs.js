const tasksDOM = document.querySelector('.jobs')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const taskInputDOMpos = document.querySelector('.task-inputp')
const taskInputDOMstat = document.querySelector('.task-inputs')
const formAlertDOM = document.querySelector('.form-alert')
const addJobDOM = document.querySelector('.new-job')
const newComm = document.querySelector('.commBtn')
const searchBar = document.querySelector('.sButton')
const actS = document.querySelector('.form-input-search')

let currComm = 0;

const showJobs = async () => {
  loadingDOM.style.visibility = 'visible'
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const name = params.get('name');
  try {
    const {
      data: { jobs },
    } = await axios.get(`/api/v1/jobs/visit/${id}`,{
      headers: {
        authorization: `Bearer ${sessionStorage.token}`
      }
    })
    if (jobs.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No jobs in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const promises = await Promise.all(jobs
      .map(async (job) => {
        const { status, _id: jobID, company,position } = job
        let commStr =`<p class="p-0 m-0 h5"><strong>No Comments Present<strong></p>`
        console.log(jobID)
        try{
          const {
            data: {comments}
          } = await axios.get(`/api/v1/comments/${jobID}`,{
            headers: {
              authorization: `Bearer ${sessionStorage.token}`
            }
          })
          console.log(comments)
          if(comments.length>=1){
             commStr = comments.map((comm)=>{
              const {content , author } = comm
              return `<div class = "single-comm p-2">
              <p class="p-0 m-0 h5"><strong>${author}<strong></p>
              <p class="p-0 m-0 h6">${content}</p>
            </div>`
            }).join('')
          }

        }catch(err){
          console.log(err);
        }
        return `
        <div class="single-task">   
        <h5>Company-${company}</h5>
        <h7>Position-${position}</h7>
        <h7>Status-${status}</h7>
        </div>
        <p>
        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample${jobID}" aria-expanded=${currComm ==jobID ?"true" : "false"} aria-controls="collapseExample${jobID}">
          Comments
        </button>
      </p>
      <div class="collapse ${currComm == jobID ?"show":""}" id="collapseExample${jobID}">
       <div class="card card-body">
        ${commStr}
         <div class="row height d-flex justify-content-center align-items-center">
           <input type="text" class="form-control form-input-search commTxt${jobID}" placeholder="Enter Your Comments">
           <button class="btn btn-primary commBtn" type="button" aria-expanded="false" data-id="${jobID}" >
           Submit
           </button>
         </div>
        </div>
      </div>`}))
  console.log(promises)
    const allJobs = promises.join('')
    tasksDOM.innerHTML = allJobs+`<h3>Job potentials for ${name}`
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
      // formDOM.style.visibility = 'hidden'
    
    console.log(error)
  }
  loadingDOM.style.visibility = 'hidden'
}

  showJobs()

  tasksDOM.addEventListener('click',async (e) =>{
    let Comm = "yeah"
    const el = e.target
    if(el.classList.contains('commBtn')){
     const id = el.dataset.id
     currComm = id;
     const commIP = document.querySelector(`.commTxt${id}`)
     Comm = commIP.value
     console.log('clicked')
     console.log(id)
     console.log(Comm)
     loadingDOM.style.visibility = 'visible'
     try{
      await axios.post(`/api/v1/comments`,{content: Comm, host: id},{
        headers: {
          authorization: `Bearer ${sessionStorage.token}`
        }
      })
      showJobs()
     }catch(err){
      console.log(err)
     }
    }
    loadingDOM.style.visibility = 'hidden'  
 })

 searchBar.addEventListener('click',async (e)=>{
  const el = e.target
 
    const searchFor = actS.value
    try{
      location.href=`/search/?name=${searchFor}`
    }catch(error){
    console.log(error);
  }

})

  // addJobDOM.innerHTML = `Add new job for ${sessionStorage.name}`
  // tasksDOM.addEventListener('click', async (e) => {
  //   const el = e.target
  //   if (el.parentElement.classList.contains('delete-btn')) {
  //     loadingDOM.style.visibility = 'visible'
  //     const id = el.parentElement.dataset.id
  //     try {
  //       await axios.delete(`/api/v1/jobs/${id}`,{headers: {
  //         authorization: `Bearer ${sessionStorage.token}`
  //       }})
  //       showJobs()
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   loadingDOM.style.visibility = 'hidden'
  // })
  
  // formDOM.addEventListener('submit', async (e) => {
  //   e.preventDefault()
  //   const name = taskInputDOM.value
  //   const position = taskInputDOMpos.value
  //   const status = taskInputDOMstat.value
  
  //   try {
  //     await axios.post('/api/v1/jobs', {company: name,
  //     position: position, status: status},
  //       {headers: {
  //         authorization: `Bearer ${sessionStorage.token}`
  //       }})
  //     showJobs()
  //     taskInputDOM.value = ''
  //     formAlertDOM.style.display = 'block'
  //     formAlertDOM.textContent = `success, task added`
  //     formAlertDOM.classList.add('text-success')
  //   } catch (error) {
  //     formAlertDOM.style.display = 'block'
  //     formAlertDOM.innerHTML = `error, please try again`
  //   }
  //   setTimeout(() => {
  //     formAlertDOM.style.display = 'none'
  //     formAlertDOM.classList.remove('text-success')
  //   }, 3000)
  // })
  
  