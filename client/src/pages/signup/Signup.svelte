<script>
    import { Button, Card, Input, Label } from "flowbite-svelte";
    import { useNavigate } from "svelte-navigator";
    import { BASE_URL } from "../../store/globals";
    import { errorToast, succesToast } from "../../util/custom-toasters";

    const navigate = useNavigate();

    let email;
    let password;
    let cPassword;

    async function onSignUp(e){
        e.preventDefault();

        if(password != cPassword){
            errorToast("Passwords does not match!");
            return
        }

        const body = {
            email: email,
            password: password
        };

        const response = await fetch(`http://${$BASE_URL}/signup`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify(body)
        });
        
        const json = await response.json()
        if(!response.ok){
            errorToast(json.message);
            
            return
        }
        
        succesToast(`${json.message} <br> Redirecting to login`);
        setTimeout(() => navigate('/login'),1000)
        
    }
    
</script>


<div class="bg-white h-full text-black">
    <div class="pt-5">
        <Card size="lg" class="m-auto text-left">
            <form on:submit={(e) => onSignUp(e)}>
                <div class="mx-5">
                    <h1 class=" text-primary-600 font-bold">Signup</h1>
                    <div class="my-2">
                        <Label for="email" class="mb-2">Email</Label>
                        <Input type="text" id="email" placeholder="donald@duck.movistar" bind:value={email} required/>
                    </div>
                    <div class="my-2">
                        <Label for="password" class="mb-2">Password</Label>
                        <Input type="password" id="password" placeholder="•••••••••" bind:value={password} required/>
                    </div>
                    <div class="my-2">
                        <Label for="password" class="mb-2">Confirm password</Label>
                        <Input type="password" id="password" placeholder="•••••••••" bind:value={cPassword} required/>
                    </div>
                    <div class="mt-6">
                        <Button color="primary" type="submit" class="w-full">Sign Up</Button>
                    </div>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already have an account? 
                        <span on:click={() => navigate("/login")} on:keydown={() => navigate("/login")}
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                            Login here!
                        </span>
                    </div>
                </div>
            </form>
        </Card>
    </div>
</div>