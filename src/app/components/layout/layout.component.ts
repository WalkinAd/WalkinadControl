import { Component, ViewChild  } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  isDrawerOpen=false;
  toggleDrawer() {
    this.drawer.toggle();
  }

  closeDrawer() {
    this.drawer.close();
  }
  
}
