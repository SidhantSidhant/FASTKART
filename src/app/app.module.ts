import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogInComponent } from './page/log-in/log-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashbordComponent } from './page/dashbord/dashbord.component';
import { MaterialModule } from './sheard/MaterialModule/material.moudle';
import { TableComponent } from './page/table/table.component';
import { NavbarComponent } from './page/dashbord/navbar/navbar.component';
import { ApiInterceptorService } from './sheard/service/api-interceptor.interceptor';
import { AdduserComponent } from './page/adduser/adduser.component';
import { LoaderService } from './sheard/service/loader.service';
import { FilterPipe, filterImgpipe } from './sheard/pipe/filter.pipe';
import { ImagesComponent } from './page/images/images.component';
import { UploadImgComponent } from './page/images/upload-img/upload-img.component';
import { PagenotfoundComponent } from './page/pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    DashbordComponent,
    TableComponent,
    NavbarComponent,
    AdduserComponent,
    FilterPipe,
    ImagesComponent,
    UploadImgComponent,
    filterImgpipe,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [{provide : HTTP_INTERCEPTORS,
    useClass : ApiInterceptorService,
    multi : true,
  },{
    provide : HTTP_INTERCEPTORS,
    useClass : LoaderService,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
