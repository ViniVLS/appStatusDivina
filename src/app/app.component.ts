import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { and } from "@angular/router/esm2015/src/utils/collection";
import { SwPush, SwUpdate } from "@angular/service-worker";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  VAPID_PUBLIC_KEY =
    "BHmZtplhinGo5mIfNNWmwhSpNAF2YZaHRjQjtDaBwTDej5uwwEobMVUsxe7rfCbCtqShwRuqezsOW5DDNs7DuiM";
  constructor(private router: Router) {}

  exibindoNavbar() {
    if (
      this.router.url !== "/login" &&
      this.router.url !== "/forgot" &&
      this.router.url !== "/" &&
    
      this.router.url.includes("/appaplic") === false
    ) {
      return true;
    }

    return false;
  }
}
