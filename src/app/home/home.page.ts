import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data';
import { NavController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonSkeletonText,
  IonIcon,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonRefresher,
    IonRefresherContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonSkeletonText,
    IonIcon,
    IonButton
  ]
})
export class HomePage implements OnInit {
  digimons: any[] = [];
  digimonsFiltrados: any[] = [];
  cargando: boolean = true;
  page = 0;
  totalPages = 0;
  totalElements = 0;

  constructor(private dataService: DataService, private navCtrl: NavController) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos(event?: any) {
    this.cargando = true;
    this.dataService.getDigimons(this.page).subscribe({
      next: (res: any) => {
        this.digimons = res.content || [];
        this.digimonsFiltrados = this.digimons;
        this.totalPages = res.pageable?.totalPages ?? 0;
        this.totalElements = res.pageable?.totalElements ?? 0;
        this.cargando = false;
        if (event) {
          event.target.complete();
        }
      },
      error: (err: any) => {
        console.error(err);
        this.cargando = false;
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  cambiarPagina(delta: number) {
    const nextPage = this.page + delta;
    if (nextPage < 0 || nextPage >= this.totalPages) {
      return;
    }
    this.page = nextPage;
    this.cargarDatos();
  }

  buscarDigimon(event: any) {
    const texto = event.target.value?.toLowerCase() || '';
    if (texto && texto.trim() !== '') {
      this.digimonsFiltrados = this.digimons.filter((d) =>
        d.name?.toLowerCase().includes(texto)
      );
    } else {
      this.digimonsFiltrados = this.digimons;
    }
  }

  irAlDetalle(name: string) {
    this.navCtrl.navigateForward(`/detalle/${name}`);
  }
}
