document.addEventListener("DOMContentLoaded", () => {  
  const options = {
    threshold: 0.5 //cuando cargue el 50% del elemento se va a activar
  }
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target
        const targetVal = el.getAttribute('data-target');
        const countUpOptions = {
          startVal: 0,
          duration: 2.5,
          useEasing: true,
          useGrouping: false, 
        }
        const anim = new countUp.CountUp(el, targetVal, countUpOptions)
        if (!anim.error) {
          anim.start()
        } else {
          console.error(anim.error)
          el.innerText = targetVal 
        }        
        observer.unobserve(el)
      }
    })
  }, options)

  const counters = document.querySelectorAll('.counter')
  counters.forEach(counter => {
    observer.observe(counter)
  })

})