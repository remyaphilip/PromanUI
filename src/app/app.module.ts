import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
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
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
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

      { path: 'home', component: HomeComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'user', component: UserComponent},
      { path: 'board', component: BoardComponent},     
      { path: 'projectitem/:flag', component: ProjectItemComponent },
      { path: 'issue/:userId', component: IssueComponent },
      { path: 'issue', component: IssueComponent },
      { path: 'login', component: LoginComponent },
      { path: '**', component: NotfoundComponent }
    ])
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
