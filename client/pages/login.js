async function login(){

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await post("/auth/login", {
    email,
    password
  });

  if(res.token){
    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("token", res.token);

    loadDashboard();
  } else {
    alert("Invalid credentials");
  }
}