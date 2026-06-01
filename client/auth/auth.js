function loadAuth(){
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  return {
    user: user ? JSON.parse(user) : null,
    token: token || null
  };
}