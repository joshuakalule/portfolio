fetch('/content/json/work.json')
  .then(response => response.json())
  .then(json => {
    const template = json.template.raw;
    const map = json.template.map;
    const data = json.data;

    const container = document.getElementById('work-container');

    data.forEach(item => {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = template;
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

      // html = html.replace(map.title, item.title);
      // html = html.replace(map['cover-photo'], item['cover-photo']);
      // html = html.replace('alt goes here', item['cover-photo-alt']);
      // html = html.replace(map.body, item.body);
      // html = html.replace(map['read-more-link'], item['read-more-link']);
      // html = html.replace(map.roles, item.roles);

      // Append the generated HTML to the container
      container.innerHTML += tempElement.innerHTML;
    });
  })
  .catch(error => console.error('Error fetching JSON:', error));


// fetch('/content/json/work.json')
// .then(response => response.json())
// .then(json => {
//   const template = json.template.raw;
//   const map = json.template.map;
//   const data = json.data;

//   const container = document.getElementById('work-container');

//   data.forEach(item => {
//     let html = template;

//     // Replace the placeholders with actual data
//     // Title
//     html.querySelector(map.title).textContent = item.title
//     html = html.replace(map.title, item.title);
//     html = html.replace(map['cover-photo'], item['cover-photo']);
//     html = html.replace('alt goes here', item['cover-photo-alt']);
//     html = html.replace(map.body, item.body);
//     html = html.replace(map['read-more-link'], item['read-more-link']);
//     html = html.replace(map.roles, item.roles);

//     // Append the generated HTML to the container
//     container.innerHTML += html;
//   });
// })
// .catch(error => console.error('Error fetching JSON:', error));
