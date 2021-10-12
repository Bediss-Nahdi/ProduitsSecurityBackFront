import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../../model/produit';
import { AuthService } from '../authetification/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  produits: Produit[] = [];

  apiURL: string = 'http://localhost:8080/api';

  produit: any = new Produit;

  constructor(private http: HttpClient, public authService: AuthService) {
    /* this.produits = [
      {
        idProduit: 1, nomProduit: "PC Asus", prixProduit: 1248.00, dateCreation: new Date("01/14/2011")
      },
      {
        idProduit: 2, nomProduit: "Imprimante Epson", prixProduit: 450.00, dateCreation: new Date("12/17/2010")
      },
      {
        idProduit: 3, nomProduit: "Tablette Samsung", prixProduit: 900.48, dateCreation: new Date("02/20/2020")
      }
    ]; */

  }


  /*  ON CREE DES METHODES  ==> CES METHODES SONT APPELEES AU FUR ET A MESURE DANS LES DIFFERENTS COMPONENTS */


  /* Méthode qui liste les produits */
  listeProduit(): Observable<Produit[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Produit[]>(this.apiURL + "/all", { headers: httpHeaders }
    );
  }
  /*   ANCIENNE VERSION
 listeProduits(): Produit[] {
   return this.produits; // appelé dans le componenet produit (qui liste et affiche la totalité des produits)
 }*/

  /* Méthode qui ajoute les produits */
  ajouterProduit(prod: Produit) {
    this.produits.push(prod); // appelé dans le componenet add-produit (qui ajoute un produit à la liste)
  }


  /* Méthode qui supprime les produits */
  supprimerProduit(prod: Produit) {
    //supprimer le produit prod du tableau produits
    const index = this.produits.indexOf(prod, 0);
    if (index > -1) {
      this.produits.splice(index, 1);
    }
    //ou Bien
    /* this.produits.forEach((cur, index) => {
    if(prod.idProduit === cur.idProduit) {
    this.produits.splice(index, 1);
    }
    }); */
  }



  consulterProduit(id: number): Produit {
    /* Cette méthode est pour update-produit ==> pour pouvoir l'afficher */

    this.produit = this.produits.find(p => p.idProduit == id);
    return this.produit;




  }




  /* Mise à jour du produit */
  updateProduit(p: Produit) {
    // console.log(p);
    this.supprimerProduit(p);
    this.ajouterProduit(p);
  }


/*
  ajouterProduit(prod: Produit): Observable<Produit> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Produit>(this.apiURL, prod, { headers: httpHeaders });
  }
  supprimerProduit(id: number) {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }
  consulterProduit(id: number): Observable<Produit> {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Produit>(url, { headers: httpHeaders });
  }
  updateProduit(prod: Produit): Observable<Produit> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Produit>(this.apiURL, prod, { headers: httpHeaders });
  }
*/
}
