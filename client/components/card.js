function Card(course){
  return `
    <div class="card">
      <h3>${course.title}</h3>
      <p>${course.category}</p>
      <button onclick="enroll('${course._id}')">
        Enroll
      </button>
    </div>
  `;
}