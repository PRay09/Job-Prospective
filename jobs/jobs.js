const tasksDOM = document.querySelector('.jobs')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const taskInputDOMpos = document.querySelector('.task-inputp')
const taskInputDOMstat = document.querySelector('.task-inputs')
const formAlertDOM = document.querySelector('.form-alert')
const addJobDOM = document.querySelector('.new-job')


const showJobs = async () => {
    loadingDOM.style.visibility = 'visible'
    try {
      const {
        data: { jobs },
      } = await axios.get('/api/v1/jobs',{
        headers: {
          authorization: `Bearer ${sessionStorage.token}`
        }
      })
      if (jobs.length < 1) {
        tasksDOM.innerHTML = '<h5 class="empty-list">No jobs in your list</h5>'
        loadingDOM.style.visibility = 'hidden'
        return
      }
      const allJobs = jobs
        .map((job) => {
          const { status, _id: jobID, company,position } = job
          return `
          <div class="single-task">   
          <h5>Company-${company}</h5>
  <h7>Position-${position}</h7>
  <h7>Status-${status}</h7>
  </div>
  <div class="task-links">
  <!-- edit link -->
  <a href="singlejob/?id=${jobID}"  class="edit-link">
  <i class="fas fa-edit"></i>
  </a>
  <!-- delete btn -->
  <button type="button" class="delete-btn" data-id="${jobID}">
  <i class="fas fa-trash"></i>
  </button>
  </div>
  </div>`
        })
        .join('')
      tasksDOM.innerHTML = allJobs
    } catch (error) {
      tasksDOM.innerHTML =
        '<h5 class="empty-list">There was an error, please try later....</h5>'
        formDOM.style.visibility = 'hidden'
      
      console.log(error)
    }
    loadingDOM.style.visibility = 'hidden'
  }

  showJobs()
  addJobDOM.innerHTML = `Add new job for ${sessionStorage.name}`
  tasksDOM.addEventListener('click', async (e) => {
    const el = e.target
    if (el.parentElement.classList.contains('delete-btn')) {
      loadingDOM.style.visibility = 'visible'
      const id = el.parentElement.dataset.id
      try {
        await axios.delete(`/api/v1/jobs/${id}`,{headers: {
          authorization: `Bearer ${sessionStorage.token}`
        }})
        showJobs()
      } catch (error) {
        console.log(error)
      }
    }
    loadingDOM.style.visibility = 'hidden'
  })
  
  formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = taskInputDOM.value
    const position = taskInputDOMpos.value
    const status = taskInputDOMstat.value
  
    try {
      await axios.post('/api/v1/jobs', {company: name,
      position: position, status: status},
        {headers: {
          authorization: `Bearer ${sessionStorage.token}`
        }})
      showJobs()
      taskInputDOM.value = ''
      formAlertDOM.style.display = 'block'
      formAlertDOM.textContent = `success, task added`
      formAlertDOM.classList.add('text-success')
    } catch (error) {
      formAlertDOM.style.display = 'block'
      formAlertDOM.innerHTML = `error, please try again`
    }
    setTimeout(() => {
      formAlertDOM.style.display = 'none'
      formAlertDOM.classList.remove('text-success')
    }, 3000)
  })
  
  