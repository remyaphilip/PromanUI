import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { ProjectComponent } from './project/project.component';
import { IssueComponent } from './issue/issue.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BoardComponent } from './board/board.component';
import { ProjectissueComponent } from './projectissue/projectissue.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { OutletComponent } from './outlet/outlet.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UserComponent } from './user/user.component';
import { OrderModule } from 'ngx-order-pipe';
import { UserformComponent } from './userform/userform.component';
import { ProjectformComponent } from './projectform/projectform.component';
import { IssueformComponent } from './issueform/issueform.component';
import { CardformComponent } from './cardform/cardform.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthguardService } from './authguard.service';
import { ErrorhandlerService } from './errorhandler.service';
import { RequestinterceptorService } from './requestinterceptor.service';
import { AuthService } from './auth.service';
import { audit } from 'rxjs/operators';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    ProjectComponent,
    IssueComponent,
    SidenavComponent,
    BoardComponent,
    ProjectissueComponent,
    ProjectItemComponent,
    OutletComponent,
    NotfoundComponent,
    UserComponent,
    UserformComponent,
    ProjectformComponent,
    IssueformComponent,
    CardformComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSliderModule,
    MatCardModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    RouterModule.forRoot([

      { path: 'app', component: AppComponent },
      { path: 'project', component: ProjectComponent,canActivate:[AuthguardService] },
      { path: 'user', component: UserComponent,canActivate:[AuthguardService] },
      { path: 'board', component: BoardComponent,canActivate:[AuthguardService] },
      { path: 'projectitem/:flag', component: ProjectItemComponent,canActivate:[AuthguardService] },
      //{ path: 'projectitem/:flag', loadChildren: './project-item/project-item.module#ProjectitemModule' },
      { path: 'issueform', component: IssueformComponent,canActivate:[AuthguardService] },
      //  { path: 'issue', component: IssueComponent },
      // { path: 'issue/:userId', loadChildren: './issue/issue.module#IssueModule' },
      { path: 'issue', component: IssueComponent,canActivate:[AuthguardService] },
      { path: 'login', component: LoginComponent },
      { path: '**', component: LoginComponent }
    ])
  ],
  providers: [LoginService,
    AuthguardService,
    AuthService,
    RequestinterceptorService,
    ErrorhandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
