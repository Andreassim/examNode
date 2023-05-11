<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  import {Router, Link, Route} from "svelte-navigator";
  import Home from "./pages/home/Home.svelte";
  import Profile from "./pages/profile/Profile.svelte";
  import Footer from './components/shared/Footer.svelte';

  import { user } from './store/globals.js';

</script>

<main class="min-h-screen h-screen pt-0 my-0 mx-auto text-center flex flex-col items-stretch">
  <Router>
    <Navbar let:hidden let:toggle class="w-screen bg-slate-800 border-b-2 border-gray-400">
      <NavBrand href="/">
        <img src="/icon.svg" alt="" class=" mr-3 h-6 sm:h-14">
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Webhooker
        </span>
      </NavBrand>
      <NavUl>
        <NavLi>
          <Link to="/">Home</Link>
       </NavLi>
       {#if $user}
       <NavLi>
         <Link to="/profile">Profile</Link>
       </NavLi>
        <NavLi>
          <Link to="/logout">Login</Link>
        </NavLi>
        {:else}
        <NavLi>
          <Link to="/login">Login</Link>
        </NavLi>
        <NavLi>
          <Link to="/signup">Signup</Link>
        </NavLi>
        {/if}
      </NavUl>
    </Navbar>
  
    <div class="mb-auto w-screen h-full">
      <Route path="/">
        <Home />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </div>
  </Router>
  <Footer/>
</main>
