import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { RawAssetComponent } from './rawasset.component';
import { RouteGuardService } from '../../services/routeguard.service';
import { SharedModule } from '../../../../core/modules/shared.module';
import { ProfileService } from '../profile/profile.service';

const routes = [
    {
        path     : 'pages/raw-asset',
        component: RawAssetComponent,
        canActivate: [RouteGuardService],        
    }
];

@NgModule({
    declarations:[
        RawAssetComponent
    ],
    imports:[
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class RawAssetModule
{
}