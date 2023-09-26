import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  toggleSidebar(isHovered: boolean) {
    const mySidebarElement = document.getElementById("mySidebar");
    const mainElement = document.getElementById("main");

    if (mySidebarElement && mainElement) {
      if (isHovered) {
        console.log("opening sidebar");
        mySidebarElement.style.width = "250px";
        mainElement.style.marginLeft = "250px";
      } else {
        console.log("closing sidebar");
        mySidebarElement.style.width = "65px";
        mainElement.style.marginLeft = "65px";
      }
    }
  }
}
