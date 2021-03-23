import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menu-item.model';
import { getNavMenuItems } from '../../constants/menu';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.menuItems = getNavMenuItems();
  }
}
