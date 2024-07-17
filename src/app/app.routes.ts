import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    { path: "createuser", component: UserComponent },
    { path: "", component: UserComponent },
    { path: "user/:id", component: UserComponent },
];
