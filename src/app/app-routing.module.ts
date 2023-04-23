import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './page/log-in/log-in.component';
import { DashbordComponent } from './page/dashbord/dashbord.component';
import { TableComponent } from './page/table/table.component';
import { AdduserComponent } from './page/adduser/adduser.component';
import { ImagesComponent } from './page/images/images.component';
import { UploadImgComponent } from './page/images/upload-img/upload-img.component';
import { AuthGurdService } from './sheard/service/auth-gurd';
import { PagenotfoundComponent } from './page/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: "", component: LogInComponent, pathMatch: 'full'
  },

  {
    path: "dashbord", component: DashbordComponent,canActivate : [AuthGurdService] , children: [
      {
        path: 'table', component: TableComponent
      },

      {
        path: 'adduser', component: AdduserComponent
      },
      {
        path: 'edit/:id', component: AdduserComponent
      },
      
      {
        path : 'images', component : ImagesComponent
      },{
        path : 'table/:id', component : TableComponent
      }
    ]},
    {
      path : 'pagenotfound', component : PagenotfoundComponent
    },
    {
     path: "**", redirectTo : 'pagenotfound'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
