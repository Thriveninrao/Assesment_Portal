import { Component } from '@angular/core';
import { SIDEBAR } from '../../constants/adminconstants';
import { I_SIDEBAR } from '../../utils/admin.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  sidebarData:I_SIDEBAR[] = SIDEBAR

  constructor(
    private router:Router
  ){}

  onClickMenuButton(routeData:string){
    this.router.navigateByUrl(routeData);
  }
}
