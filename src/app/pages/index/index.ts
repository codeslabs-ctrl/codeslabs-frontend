import { Component } from '@angular/core';
import { DashboardComponent } from '../../components/dashboard/dashboard';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './index.html',
  styleUrl: './index.css'
})
export class IndexComponent {
}
