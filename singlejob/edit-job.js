const jobIDDOM = document.querySelector('.job-edit-id')
const jobNameDOM = document.querySelector('.job-edit-name')
const jobPositionDOM = document.querySelector('.job-edit-position')
const jobStatusDOM= document.querySelector('.job-edit-status')
const editFormDOM = document.querySelector('.single-job-form')
const editBtnDOM = document.querySelector('.job-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showjob = async () => {
  try {
    const {
      data: { job },
    } = await axios.get(`/api/v1/jobs/${id}`,{
        headers: {
          authorization: `Bearer ${sessionStorage.token}`
        }
      })
    const { _id: jobID, status, company,position } = job

    jobIDDOM.textContent = jobID
    jobNameDOM.value = company
    jobPositionDOM.value=position
    tempName = company
  } catch (error) {
    console.log(error)
  }
}

showjob()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const companyName = jobNameDOM.value
    const position = jobPositionDOM.value
    const jobStatus = jobStatusDOM.value

    const {
      data: { job },
    } = await axios.patch(`/api/v1/jobs/${id}`,{
      company: companyName,
      status: jobStatus,
      position: position
      
    },{headers: {
      authorization: `Bearer ${sessionStorage.token}`
    }})
    const { _id: jobID, status, company } = job

    jobIDDOM.textContent = jobID
    jobNameDOM.value = company
    jobPositionDOM.value=position
    tempName = company
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited job`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    jobNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `Fill all the fields!`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
