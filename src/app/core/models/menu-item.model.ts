export class MenuItem {
  name: string;
  link: string;
  icon: string;

  constructor(value: MenuItem) {
    this.name = value.name;
    this.link = value.link;
    this.icon = value.icon;
  }
}
