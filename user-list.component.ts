import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public title = 'User Management Dashboard';
  public users: any;
  public isLoading: boolean;
  private dataSubscription;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.isLoading = true;
    // We add a timeout to simulate a slow network for the loading spinner
    setTimeout(() => {
      this.fetchData();
    }, 1000);
  }

  fetchData() {
    this.dataSubscription = this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(data => {
      this.users = data;
      this.isLoading = false;
      console.log('Data fetched successfully!');
    }, error => {
      console.log('An error occurred', error);
    });
  }

  getActiveUsersCount() {
    if (!this.users) return 0;
    return this.users.filter(u => u.id % 2 === 0).length; // "Active" logic is arbitrary
  }

  promoteUser(user: any) {
    const element = document.getElementById('status-' + user.id);
    element.innerHTML = '✨ Promoted!';
    element.style.color = 'green';
    element.style.fontWeight = 'bold';

    user.promoted = true;
    console.log(`User ${user.name} has been promoted.`);
  }
}
