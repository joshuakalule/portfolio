AOS.init();
// You can also pass an optional settings object
// below listed default settings
AOS.init({

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

// Add event listener for the toast button
var toastTrigger = document.getElementById('liveToastBtn')
var toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  toastTrigger.addEventListener('click', function () {
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
  })
}

// vary modal content
var comingSoonModal = document.getElementById('comingSoonModal')
comingSoonModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget
  // fetch the parent of that button that has the class .service
  var parentDiv = button.closest('.service');
  // extract the title of that service
  var serviceTitle = parentDiv.querySelector('.service-title').textContent;

  // Update the modal's content.
  var modalTitle = comingSoonModal.querySelector('.modal-title')
  modalTitle.textContent = serviceTitle
})
