import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from '../projects/projects';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ProjectsComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  services = [
    {
      id: "1",
      title: "Desarrollo con IA",
      description: "Soluciones personalizadas que integran inteligencia artificial para optimizar procesos en cualquier industria.",
      icon: "brain",
      features: ["Machine Learning", "Deep Learning", "Procesamiento de Lenguaje Natural", "Visión por Computadora"]
    },
    {
      id: "2", 
      title: "Transformación Digital",
      description: "Impulsa cualquier tipo de negocio hacia la era digital con tecnologías disruptivas adaptadas a tu sector.",
      icon: "zap",
      features: ["Automatización de Procesos", "Análisis Predictivo", "Cloud Computing"]
    },
    {
      id: "3",
      title: "Desarrollo Full-Stack", 
      description: "Aplicaciones web y móviles completas con tecnologías modernas y arquitecturas escalables.",
      icon: "code",
      features: ["React & Next.js", "Node.js & Python", "Bases de Datos", "APIs RESTful"]
    }
  ];

  companyValues = [
    {
      title: "Misión",
      description: "Desarrollar soluciones tecnológicas innovadoras potenciadas por IA que transformen la manera en que las empresas operan y compiten en el mercado global.",
      icon: "target"
    },
    {
      title: "Visión", 
      description: "Ser la empresa de referencia mundial en desarrollo con IA, reconocida por crear tecnologías disruptivas que redefinan industrias completas.",
      icon: "lightbulb"
    },
    {
      title: "Enfoque",
      description: "Utilizamos IA, ML y deep learning para crear soluciones personalizadas que se adapten perfectamente a las necesidades de cada cliente.",
      icon: "users"
    }
  ];
}
