import { Component, Input, OnInit } from '@angular/core';
import { SIDEBAR } from '../../constants/adminconstants';
import { I_SIDEBAR } from '../../utils/admin.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @Input() role!:string;

  sidebarData:I_SIDEBAR[] = SIDEBAR

  constructor(
    private router:Router
  ){}

  ngOnInit(): void {
    this.sidebarData = this.sidebarData.filter((x:I_SIDEBAR) => x.role === this.role)
  }

  onClickMenuButton(routeData:string){
    this.router.navigateByUrl(routeData);
  }
}
