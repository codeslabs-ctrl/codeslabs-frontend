# CodesLabs Angular Frontend

Este proyecto es la migración de React a Angular del frontend de CodesLabs.

## 🚀 Características Migradas

### ✅ Componentes Migrados
- **Dashboard**: Página principal con navegación y sección de servicios
- **About**: Página "Quiénes Somos" con información de la empresa
- **NotFound**: Página 404 para rutas no encontradas

### ✅ Tecnologías Utilizadas
- **Angular 20**: Framework principal
- **Angular Material**: Componentes de UI
- **Tailwind CSS**: Framework de estilos
- **TypeScript**: Lenguaje de programación

### ✅ Funcionalidades Implementadas
- Navegación entre páginas
- Diseño responsivo
- Componentes de Material Design
- Estilos con Tailwind CSS

## 📦 Instalación

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar el servidor de desarrollo**:
   ```bash
   ng serve
   ```

3. **Abrir en el navegador**:
   ```
   http://localhost:4200
   ```

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   └── dashboard/          # Componente principal del dashboard
│   ├── pages/
│   │   ├── index/             # Página de inicio
│   │   ├── about/             # Página "Quiénes Somos"
│   │   └── not-found/         # Página 404
│   ├── app.routes.ts          # Configuración de rutas
│   └── app.component.html     # Componente raíz
├── styles.css                 # Estilos globales con Tailwind
└── main.ts                    # Punto de entrada
```

## 🔄 Diferencias con React

### Estructura de Componentes
- **React**: JSX con hooks y componentes funcionales
- **Angular**: Templates HTML con TypeScript y decoradores

### Navegación
- **React**: `react-router-dom`
- **Angular**: `RouterModule` nativo de Angular

### UI Components
- **React**: shadcn/ui con Radix UI
- **Angular**: Angular Material

### Estilos
- **React**: Tailwind CSS con clases personalizadas
- **Angular**: Tailwind CSS con Angular Material

## 🎨 Personalización

### Agregar Nuevos Componentes
```bash
ng generate component components/nuevo-componente
```

### Agregar Nuevas Páginas
```bash
ng generate component pages/nueva-pagina
```

### Modificar Rutas
Editar `src/app/app.routes.ts` para agregar nuevas rutas.

## 🚀 Comandos Útiles

```bash
# Servidor de desarrollo
ng serve

# Construir para producción
ng build

# Ejecutar tests
ng test

# Linting
ng lint
```

## 📝 Notas de Migración

### Cambios Principales
1. **Sintaxis**: JSX → Templates HTML
2. **Estado**: useState → @Input/@Output
3. **Efectos**: useEffect → ngOnInit/ngOnDestroy
4. **Rutas**: react-router-dom → RouterModule
5. **UI**: shadcn/ui → Angular Material

### Próximos Pasos
- [ ] Migrar componentes de UI más complejos
- [ ] Implementar servicios para API calls
- [ ] Agregar animaciones y transiciones
- [ ] Optimizar para SEO
- [ ] Implementar PWA features

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
