import { Component, DestroyRef, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl } from '@angular/forms';
import { TablePrimaryComponent } from '../../../../shared/components/table-primary/table-primary.component';
import { InputPrimaryComponent } from '../../../../shared/components/input-primary/input-primary.component';
import { ButtonPrimaryComponent } from '../../../../shared/components/button-primary/button-primary.component';

import { SelectPrimaryComponent } from "../../../../shared/components/select-primary/select-primary.component";
import { ListProductsFacade } from '../../application/list-products.facade';


@Component({
  selector: 'app-list-products',
  imports: [RouterModule, TablePrimaryComponent, InputPrimaryComponent, ButtonPrimaryComponent, SelectPrimaryComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent implements OnInit, OnDestroy {
  facade = inject(ListProductsFacade);
  searchControl = new FormControl('');
  private destroyRef = inject(DestroyRef); // Inyecta el DestroyRef



  constructor() {
    this.facade.fetchProducts();    
  }
  ngOnInit(): void {
    this.facade.connectSearch(this.searchControl.valueChanges, this.destroyRef);   
  }

  ngOnDestroy(): void {
    // Borramos los datos en guardados en el facabe
   this.facade.searchTerm.set("");
  }


  // El resto de los métodos no cambian, siguen siendo simples llamadas al Facade.
  deleteProduct(id: string) {
    this.facade.deleteProductById(id);
  }

  changeLimit(limit: number) {
    this.facade.changePageLimit(limit);
  }
}