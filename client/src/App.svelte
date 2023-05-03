<script>
  import {Router, Link, Route} from "svelte-navigator";
  import Home from "./pages/home/Home.svelte";
  import Profile from "./pages/profile/Profile.svelte";
</script>

<main>
  <Router>
    <nav>
    <img src="/icon.svg" alt="">
    <h1>API Callback Reciever</h1>
    <Link to="/">Home</Link>
    <Link to="/profile">Profile</Link>
  </nav>
  
  <div>
    <Route path="/">
      <Home />
    </Route>
    <Route path="/profile">
      <Profile />
    </Route>
  </div>
</Router>
</main>
