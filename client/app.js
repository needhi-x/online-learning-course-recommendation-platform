
let isLogin = true;

// INIT
document.getElementById("app").innerHTML = renderAuth();

/* ---------------- AUTH UI ---------------- */
function renderAuth() {
  return `
    <div class="auth-box">

      <h1>🎓 LearnX</h1>
      <p>${isLogin ? "Login to continue" : "Create your account"}</p>

      ${!isLogin ? `<input id="name" placeholder="Your Name">` : ""}

      <input id="email" placeholder="Email">
      <input id="password" type="password" placeholder="Password">

      ${!isLogin ? `<input id="interests" placeholder="AI, Web, ML">` : ""}

      <button onclick="${isLogin ? 'loginUser()' : 'registerUser()'}">
        ${isLogin ? "Login" : "Register"}
      </button>

      <p onclick="toggleMode()" style="cursor:pointer;color:#38bdf8;">
        ${isLogin ? "New user? Register" : "Already have account? Login"}
      </p>

    </div>
  `;
}

/* ---------------- TOGGLE ---------------- */
function toggleMode() {
  isLogin = !isLogin;
  document.getElementById("app").innerHTML = renderAuth();
}

/* ---------------- REGISTER ---------------- */
window.registerUser = async function () {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const interests = document.getElementById("interests").value;

  const res = await post("/auth/register", {
    name,
    email,
    password,
    interests: interests ? interests.split(",") : []
  });

  if (res.user) {
    alert("Registered ✔ Now login");
    isLogin = true;
    document.getElementById("app").innerHTML = renderAuth();
  }
};

/* ---------------- LOGIN ---------------- */
window.loginUser = async function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await post("/auth/login", {
    email,
    password
  });

  if (res.token) {
    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("token", res.token);

    loadDashboard();
  } else {
    alert("Login failed");
  }
};

/* ---------------- DASHBOARD ---------------- */
function loadDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  document.getElementById("app").innerHTML = `
  
    <div class="dashboard">

      <h1 class="welcome">👋 Welcome ${user.name}</h1>

      <div class="center-box">

        <button onclick="loadCourses()">📚 Courses</button>
        <button onclick="loadRecommended()">🎯 Recommended</button>
        <button onclick="logout()">🚪 Logout</button>

      </div>

      <!-- SMALL BACK BUTTON (FIXED) -->
      <div class="back-wrapper">
        <button class="back-btn" onclick="goBack()">← Back</button>
      </div>

    </div>

  `;
}

/* ---------------- BACK ---------------- */
function goBack() {
  location.reload();
}

/* ---------------- LOGOUT ---------------- */
function logout() {
  localStorage.clear();
  location.reload();
}

/* ---------------- COURSES ---------------- */
async function loadCourses() {

  const res = await get("/courses");

  document.getElementById("app").innerHTML = `
    <h2 style="text-align:center">📚 Courses</h2>

    ${res.map(c => `
      <div class="card">
        <h3>${c.title}</h3>
        <p>${c.category}</p>
        <button onclick="enroll('${c._id}')">Enroll</button>
      </div>
    `).join("")}
  `;
}

/* ---------------- RECOMMENDED ---------------- */
async function loadRecommended() {

  const user = JSON.parse(localStorage.getItem("user"));

  const res = await post("/recommend", {
    userId: user._id
  });

  document.getElementById("app").innerHTML = `
    <h2 style="text-align:center">🎯 Recommended</h2>

    ${res.map(c => `
      <div class="card">
        <h3>${c.title}</h3>
        <p>${c.category}</p>
        <button onclick="enroll('${c._id}')">Enroll</button>
      </div>
    `).join("")}
  `;
}

/* ---------------- ENROLL ---------------- */
async function enroll(id) {

  const user = JSON.parse(localStorage.getItem("user"));

  await post("/enroll", {
    userId: user._id,
    courseId: id
  });

  alert("Enrolled ✔");
}