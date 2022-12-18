const formDOM = document.querySelector('.task-form')
const taskInputDOMem = document.querySelector('.form-email')
const taskInputDOMps = document.querySelector('.form-pass')
const taskInputDOMnm = document.querySelector('.form-name')
const formAlertDOM = document.querySelector('.form-alert')

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = taskInputDOMnm.value
    const password = taskInputDOMps.value
    const email = taskInputDOMem.value
    try{
      await axios.post('/api/v1/auth/register',{name: name,
      email:email,
      password:password
      })
      taskInputDOMem.value= ''
      taskInputDOMps.value= ''
      taskInputDOMnm.value= ''
      console.log(name)
      formAlertDOM.style.display = 'block'
      
      formAlertDOM.innerHTML = `<p>Registered Successully <a href ='/'>Log in<a><p>`
      formAlertDOM.classList.add('text-success')
    } catch(error){
      console.log(error)
      formAlertDOM.style.display= 'block'
      formAlertDOM.innerHTML = `Please Provide valid Email and password.`
    }
    
})