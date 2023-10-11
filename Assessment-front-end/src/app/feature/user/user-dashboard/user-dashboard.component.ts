import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  role: any;

  ngOnInit(): void {
    this.role = JSON.parse(localStorage.getItem('user') as string).authorities[0].authority;
  }

  toggleSidebar(isHovered: boolean) {
    const mySidebarElement = document.getElementById("mySidebar");
    const mainElement = document.getElementById("main");

    if (mySidebarElement && mainElement) {
      if (isHovered) {
        console.log("opening sidebar");
        mySidebarElement.style.width = "250px";
        mainElement.style.marginLeft = "140px";
      } else {
        console.log("closing sidebar");
        mySidebarElement.style.width = "65px";
        mainElement.style.marginLeft = "0px";
      }
    }
  }
}
