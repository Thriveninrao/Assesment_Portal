import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

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
