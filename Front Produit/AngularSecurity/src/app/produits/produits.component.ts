import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { AuthService } from '../services/authetification/auth.service';
import { ProduitService } from '../services/produit/produit.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html'
})
export class ProduitsComponent implements OnInit {


  produits: Produit[] = [];

  constructor(private produitService: ProduitService,
    public authService: AuthService) {
    /* Pour appeler mon tableau : il faut appeler à partir de mon service via une méthode */
    /* private produitService: ProduitService ==> injection de dépendences ==> pour utiliser le service*/
     produitService.listeProduit().subscribe(data =>{
       this.produits = data;
     });
  }

  ngOnInit(): void {
  }


  supprimerProduit(p: Produit) {
    /* console.log(p); */
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.produitService.supprimerProduit(p);
  }
}



