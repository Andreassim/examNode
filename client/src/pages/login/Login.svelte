<script>
    import { Button, Card, Input, Label } from "flowbite-svelte";
    import { useNavigate } from "svelte-navigator";
    import { BASE_URL, user } from "../../store/globals.js";
    import { errorToast, succesToast } from "../../util/custom-toasters.js";


    const navigate = useNavigate();
    let email;
    let password;

    async function onLogin(){

        const response = await fetch(`http://${$BASE_URL}/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        const json = await response.json()
        if(!response.ok){
            errorToast(json.message);
            
            return
        }
        
        $user = json.data;
       
        succesToast(`Welcome! <br> Redirecting to profile`);
        setTimeout(() => navigate('/profile'),1000)
    };
    
</script>


<div class="bg-white h-full text-black">
    <div class="pt-5">
        <Card size="lg" class="text-left m-auto">
                <div class="mx-5">
                    <h1 class=" text-primary-600 font-bold">Login</h1>
                    <div class="my-2">
                        <Label for="email" class="mb-2">Email</Label>
                        <Input type="text" id="email" placeholder="donald@duck.movistar" bind:value={email}/>
                    </div>
                    <div class="my-2">
                        <Label for="password" class="mb-2">Password</Label>
                        <Input type="password" id="password" placeholder="•••••••••" bind:value={password}/>
                    </div>
                    <div class="mt-4">
                        <Button color="primary" class="w-full" on:click={() => onLogin()}>Login</Button>
                    </div>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Don't have an account? <span
                          on:click={() => navigate("/signup")} on:keydown={() => navigate("/signup")}
                          class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          >Sign up here!</span>
                    </div>
                </div>
        </Card>
    </div>
</div>