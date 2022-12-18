const formDOM = document.querySelector('.task-form')
const taskInputDOMem = document.querySelector('.form-email')
const taskInputDOMps = document.querySelector('.form-pass')
const taskInputDOMnm = document.querySelector('.form-name')
const formAlertDOM = document.querySelector('.form-alert')
formDOM.addEventListener('submit',(e) => {
    e.preventDefault()
    const password = taskInputDOMps.value
    const email = taskInputDOMem.value
    try{
      axios.post('/api/v1/auth/login',{email:email,
      password:password
      }).then((response) => {
        sessionStorage.token=response.data.token;
        sessionStorage.name=response.data.user.name;
        console.log(sessionStorage.token)
        console.log(sessionStorage.name)
      }, (error) => {
        delete sessionStorage.token
        console.log(error);
      });
      taskInputDOMem.value= ''
      taskInputDOMps.value= ''
      location.href='/jobs'
    } catch(error){
      delete sessionStorage.token
      console.log(error)
      formAlertDOM.style.display= 'block'
      formAlertDOM.innerHTML = `Please Provide valid Email and password.`
    }
})