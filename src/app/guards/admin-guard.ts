import { inject } from "@angular/core";
import { PenocApiService } from "../services/penoc-api.service";
import { Router } from "@angular/router";

export const AdminGuard = () => {
    const api = inject(PenocApiService);
    const router = inject(Router);
    
    if(api.isAuthenticated()){return true}
    return router.parseUrl('/sign-in')
}
