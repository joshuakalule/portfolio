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

modalIndentifier = {
  "Data Management Solutions": "./content/html/data-management.html",
  "Backend DevOps": "./content/html/backend-devops.html",
  "Electronics Design": "./content/html/electronics-design.html",
};

// vary modal content based on clicked card
var detailsModal = document.getElementById('detailsModal')
detailsModal.addEventListener('show.bs.modal', function (event) {
  var button = event.relatedTarget;
  var parentDiv = button.closest('.service');
  var serviceTitle = parentDiv.querySelector('.service-title').textContent;
  var modalTitle = detailsModal.querySelector('.modal-title');
  modalTitle.textContent = serviceTitle;
  var htmlPath = modalIndentifier[serviceTitle];

  fetch(htmlPath)
    .then(response => response.text())
    .then(data => {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = data;

      // Extract the relevant sections
      const bodyHTML = tempElement.querySelector("section.body-html");
      const footerHTML = tempElement.querySelector(".footer-html");

      // Clear previous content
      const modalBodyContainer = document.querySelector('#detailsModal .modal-body .container-fluid');
      modalBodyContainer.innerHTML = '';
      const modalFooterContainer = document.querySelector('#detailsModal .modal-footer');
      modalFooterContainer.innerHTML = '';

      // Append new content
      if (bodyHTML) {
        modalBodyContainer.appendChild(bodyHTML);
      }
      if (footerHTML) {
        modalFooterContainer.innerHTML = footerHTML.innerHTML;
      }
    })
    .catch(error => console.error('Error fetching data-management.html:', error));
})

// Populate works
function populateWorks(dataToFetch) {
  fetch('./content/json/work.json')
    .then(response => response.json())
    .then(json => {
      fetch(json.template.path)
        .then((response) => response.text())
        .then((template) => {
          const map = json.template.map;
          const data = json.data;
          const container = document.getElementById('work-container');
          container.innerHTML = ''; // clear
          let works = [];

          if (dataToFetch === "") {
            Object.values(data).forEach(category => {
              works.push(...category);
            });
          } else {
            works = data[dataToFetch];
          }

          works.forEach(item => {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = template;
            // for animation
            if (works.indexOf(item) % 2 === 1) {
              tempElement.querySelector('div.work-item').setAttribute('data-aos-delay', '300');
            }
            // Replace the placeholders with actual data
            // Title
            tempElement.querySelector(map.title).textContent = item.title

            // cover-photo
            tempElement.querySelector(map['cover-photo']).src = item['cover-photo'];

            // cover-photo-alt
            tempElement.querySelector(map['cover-photo']).alt = item['cover-photo-alt']

            // body
            tempElement.querySelector(map.body).textContent = item.body

            // read-more-link
            tempElement.querySelector(map['read-more-link']).href = item['read-more-link']

            // roles
            tempElement.querySelector(map.roles).textContent = item.roles;

            // Append the generated HTML to the container
            container.innerHTML += tempElement.innerHTML;
          });
        })
        .catch(error => console.error('Error fetching work html: ', error));
    })
    .catch(error => console.error('Error fetching JSON:', error));
}

// Call the function to populate works
document.addEventListener('DOMContentLoaded', (event) => {
  populateWorks("");
});

// Filters
document.querySelectorAll('a[data-filter]').forEach(filterLink => {
  filterLink.addEventListener('click', (event) => {
    event.preventDefault();
    let filterValue = event.target.getAttribute('data-filter');

    if (filterValue === "all") {
      populateWorks("");
    } else {
      populateWorks(filterValue);
    }
    // set the name of the Works filter
    let filterString = filterValue.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    document.getElementById('filter-btn').textContent = filterString;
  });
});

document.querySelector('#detailsModal .modal-footer').addEventListener('click', function (event) {
  if (event.target.tagName === 'BUTTON') {
    let filterValue = event.target.getAttribute('data-filter');

    // Close the modal
    var modalInstance = bootstrap.Modal.getInstance(detailsModal);
    modalInstance.hide();

    if (filterValue === "all") {
      populateWorks("");
    } else {
      populateWorks(filterValue);
    }
    // set the name of the Works filter
    let filterString = filterValue.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    document.getElementById('filter-btn').textContent = filterString;

    // Scroll to the works section
    document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
  }
});
