import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../model/produit';
import { AuthService } from '../services/authetification/auth.service';
import { ProduitService } from '../services/produit/produit.service';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styles: [
  ]
})
export class UpdateProduitComponent implements OnInit {

  currentProduit = new Produit() ;


  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
    private produitService: ProduitService,
    public authService: AuthService) { }

  ngOnInit(): void {
    /* afficher l'id qui a été transmis */ //     console.log(this.activatedRoute.snapshot.params.id);


    /* Il faut assigner à currentProduit  */
    this.currentProduit = this.produitService.consulterProduit(this.activatedRoute.snapshot.params.id);


    /* console.log(this.currentProduit); */

  }


  /* Mise à jour :  il faut appeler la méthode mise à jour via le service */

  updateProduit() { //console.log(this.currentProduit);
    this.produitService.updateProduit(this.currentProduit);
    this.router.navigate(['produits']);
  }




}
