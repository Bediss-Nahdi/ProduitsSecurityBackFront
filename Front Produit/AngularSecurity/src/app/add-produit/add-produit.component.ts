import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { ProduitService } from '../services/produit/produit.service';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html'
})
export class AddProduitComponent implements OnInit {

  /* POUR LE FORMULAIRE -- POUR AJOUTER LES PRODUITS */
  newProduit = new Produit();


  constructor(private produitService : ProduitService) { }

  ngOnInit(): void {
  }

/*  jUSTE POUR DEBOGUER */
  addProduit(){
    /* console.log(this.newProduit); */
    this.produitService.ajouterProduit(this.newProduit);
    alert("Le produit a été rajouté");
  }
    

}
