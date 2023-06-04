import { toast } from "@zerodevx/svelte-toast";

export const succesToast = m => toast.push(m, {
    theme:{
        '--toastBackground': "rgba(4, 108, 78, 0.9)",
        '--toastColor': 'white',
        '--toastBarHeight': 0                
    },
    duration: 2000
});

export const errorToast = m => toast.push(m, {
    theme:{
        '--toastBackground': "rgba(254, 121, 93, 0.9)",
        '--toastColor': 'black',
        '--toastBarHeight': 0                
    },
    duration: 3000
}); 
