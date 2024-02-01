import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './home/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { IssueCardComponent } from './home/issue-card/issue-card.component';
import { AddIssueFormComponent } from './home/add-issue-form/add-issue-form.component';
import { EditIssueFormComponent } from './home/edit-issue-form/edit-issue-form.component';
import { IssueStageComponent } from './home/issue-stage/issue-stage.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    LogoComponent,
    HeaderComponent,
    IssueCardComponent,
    AddIssueFormComponent,
    EditIssueFormComponent,
    IssueStageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    GoogleMapsModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
