document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    offset: 120,
    delay: 0,
    duration: 700,
    easing: 'ease',
    once: false,
    mirror: false,
    anchorPlacement: 'top-bottom',
  });

  const toastTrigger = document.getElementById('liveToastBtn');
  const toastLiveExample = document.getElementById('liveToast');
  if (toastTrigger) {
    toastTrigger.addEventListener('click', () => {
      const toast = new bootstrap.Toast(toastLiveExample);
      toast.show();
    });
  }

  const modalIdentifier = {
    "Data Management Solutions": "./content/html/data-management.html",
    "Backend DevOps": "./content/html/backend-devops.html",
    "Electronics Design": "./content/html/electronics-design.html",
  };

  const detailsModal = document.getElementById('detailsModal');
  detailsModal.addEventListener('show.bs.modal', async (event) => {
    const button = event.relatedTarget;
    const parentDiv = button.closest('.service');
    const serviceTitle = parentDiv.querySelector('.service-title').textContent;
    const modalTitle = detailsModal.querySelector('.modal-title');
    modalTitle.textContent = serviceTitle;
    const htmlPath = modalIdentifier[serviceTitle];

    try {
      const response = await fetch(htmlPath);
      const data = await response.text();
      const tempElement = document.createElement('div');
      tempElement.innerHTML = data;

      const bodyHTML = tempElement.querySelector("section.body-html");
      const footerHTML = tempElement.querySelector(".footer-html");

      const modalBodyContainer = document.querySelector('#detailsModal .modal-body .container-fluid');
      modalBodyContainer.innerHTML = '';
      const modalFooterContainer = document.querySelector('#detailsModal .modal-footer');
      modalFooterContainer.innerHTML = '';

      if (bodyHTML) {
        modalBodyContainer.appendChild(bodyHTML);
      }
      if (footerHTML) {
        modalFooterContainer.innerHTML = footerHTML.innerHTML;
      }
    } catch (error) {
      console.error('Error fetching data-management.html:', error);
    }
  });

  /**
   * Asynchronously populates the work items on the page.
   *
   * Fetches work data from a JSON file and a template, then dynamically creates
   * and inserts HTML elements into the DOM based on the fetched data.
   *
   * @param {string} dataToFetch - The category of work data to fetch. If an empty string is provided, all categories are fetched.
   * @returns {Promise<void>} - A promise that resolves when the work items have been populated.
   */
  async function populateWorks(dataToFetch) {
    try {
      const response = await fetch('./content/json/work.json');
      const json = await response.json();
      const templateResponse = await fetch(json.template.path);
      const template = await templateResponse.text();
      const map = json.template.map;
      const data = json.data;
      const container = document.getElementById('work-container');
      container.innerHTML = '';

      let works = [];
      if (dataToFetch === "") {
        Object.values(data).forEach(category => {
          works.push(...category);
        });
      } else {
        works = data[dataToFetch];
      }

      works.forEach((item, index) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = template;
        if (index % 2 === 1) {
          tempElement.querySelector('div.work-item').setAttribute('data-aos-delay', '300');
        }
        tempElement.querySelector(map.title).textContent = item.title;
        tempElement.querySelector(map['cover-photo']).src = item['cover-photo'];
        tempElement.querySelector(map['cover-photo']).alt = item['cover-photo-alt'];
        tempElement.querySelector(map.body).textContent = item.body;
        tempElement.querySelector(map['read-more-link']).href = item['read-more-link'];
        tempElement.querySelector(map.roles).textContent = item.roles;

        container.innerHTML += tempElement.innerHTML;
      });
    } catch (error) {
      console.error('Error fetching work data:', error);
    }
  }

  populateWorks("");

  document.querySelectorAll('a[data-filter]').forEach(filterLink => {
    filterLink.addEventListener('click', (event) => {
      event.preventDefault();
      const filterValue = event.target.getAttribute('data-filter');
      populateWorks(filterValue === "all" ? "" : filterValue);
      const filterString = filterValue.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      document.getElementById('filter-btn').textContent = filterString;
    });
  });

  document.querySelector('#detailsModal .modal-footer').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const filterValue = event.target.getAttribute('data-filter');
      const modalInstance = bootstrap.Modal.getInstance(detailsModal);
      modalInstance.hide();
      populateWorks(filterValue === "all" ? "" : filterValue);
      const filterString = filterValue.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      document.getElementById('filter-btn').textContent = filterString;
      document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
    }
  });
});
