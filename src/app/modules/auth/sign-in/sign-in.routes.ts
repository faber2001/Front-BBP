import { RouterModule, Routes } from '@angular/router';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { ExampleComponent } from '../../admin/example/example.component';


export default [
    {
        path: '',
        component: AuthSignInComponent,
    },
] as Routes;

const routes: Routes = [
    { path: 'sign-in', component: AuthSignInComponent },
    { path: 'example', component: ExampleComponent },
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}
