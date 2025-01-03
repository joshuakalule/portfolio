fetch('./content/json/work.json')
  .then(response => response.json())
  .then(json => {
    fetch(json.template.path)
      .then((response) => response.text())
      .then((template) => {
        const map = json.template.map;
        const data = json.data;

        const container = document.getElementById('work-container');

        data.forEach(item => {
          const tempElement = document.createElement('div');
          tempElement.innerHTML = template;
          // for animation
          if (data.indexOf(item) % 2 === 1) {
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
