import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data'; // Apunta correctamente a tu data.ts
import { NavController } from '@ionic/angular';

// Importación obligatoria de componentes nativos de Ionic para Standalone
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, 
  IonRefresher, IonRefresherContent, IonList, IonItem, 
  IonThumbnail, IonSkeletonText, IonAvatar, IonLabel 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true, // Indica que es un componente independiente
  imports: [
    CommonModule, // Reemplaza los módulos tradicionales para usar *ngIf y *ngFor
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, 
    IonRefresher, IonRefresherContent, IonList, IonItem, 
    IonThumbnail, IonSkeletonText, IonAvatar, IonLabel
  ]
})
export class HomePage implements OnInit {
  digimons: any[] = [];
  digimonsFiltrados: any[] = [];
  cargando: boolean = true;

  constructor(private dataService: DataService, private navCtrl: NavController) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos(event?: any) {
    this.cargando = true;
    this.dataService.getDigimons().subscribe({
      next: (res) => {
        this.digimons = res;
        this.digimonsFiltrados = res;
        this.cargando = false;
        if (event) event.target.complete();
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
        if (event) event.target.complete();
      }
    });
  }

  buscarDigimon(event: any) {
    const texto = event.target.value.toLowerCase();
    if (texto && texto.trim() !== '') {
      this.digimonsFiltrados = this.digimons.filter(d => 
        d.name.toLowerCase().includes(texto)
      );
    } else {
      this.digimonsFiltrados = this.digimons;
    }
  }

  irAlDetalle(name: string) {
    this.navCtrl.navigateForward(`/detalle/${name}`);
  }
}