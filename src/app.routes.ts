import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 

import { ConsultaComponent } from './app/pessoa/consulta/consulta.component';

import {CadastroComponent} from './app/pessoa/cadastro/cadastro.component';

import { HomeComponent } from './app/home/home.component';
 
const appRoutes: Routes = [
    { path: 'home',                    component: HomeComponent },
    { path: '',                        component: HomeComponent },
    { path: 'consulta-pessoa',         component: ConsultaComponent },
    { path: 'cadastro-pessoa',         component: CadastroComponent },
    { path: 'cadastro-pessoa/:codigo', component: CadastroComponent }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);