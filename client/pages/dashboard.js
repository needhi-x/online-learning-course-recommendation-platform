async function Dashboard(user){

  const rec = await post("/recommend",{
    userId: user._id
  }, localStorage.getItem("token"));

  return `
    <h1>Welcome ${user.name}</h1>
    <h3>Recommended Courses</h3>

    ${rec.map(c => Card(c)).join("")}
  `;
}