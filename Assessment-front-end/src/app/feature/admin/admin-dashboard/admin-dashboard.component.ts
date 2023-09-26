import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
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
