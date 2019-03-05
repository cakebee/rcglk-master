import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';


@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
  canActivate() {
    if (this.userService.user.userType == 'student') {
      return true;
    }
    else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}