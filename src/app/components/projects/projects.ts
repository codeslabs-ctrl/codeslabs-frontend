import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsService, Project } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  loading = true;
  error = false;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.loading = true;
    this.error = false;
    
    this.projectsService.getProjects().subscribe({
      next: (data: Project[]) => {
        this.projects = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading projects:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  getStatusColor(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'completado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'en progreso':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'en pausa':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pendiente':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  getStatusText(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'completado':
        return 'Completado';
      case 'en progreso':
        return 'En Progreso';
      case 'en pausa':
        return 'En Pausa';
      case 'pendiente':
        return 'Pendiente';
      default:
        return estado;
    }
  }

  openProject(url: string) {
    window.open(url, '_blank');
  }


} 