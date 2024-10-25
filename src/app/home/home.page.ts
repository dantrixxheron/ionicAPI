import { Component,OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {

  products: any[] = [];
  constructor(private productService: ProductService, private alertCtrl: AlertController) {
    this.setStatusBarColor();
  }
  
  ngOnInit() {
    this.loadProducts();
  }

  private async setStatusBarColor() {
    // Establecer el color de fondo de la barra de estado
    await StatusBar.setBackgroundColor({ color: '#FF0000' }); // Color rojo
    
  }
    // Cargar los productos desde la API
    loadProducts() {
      this.productService.getProductos().subscribe((data: any) => {
        this.products = data;
      });
    }
  
    // Eliminar producto
    async deleteProduct(id: number) {
      const alert = await this.alertCtrl.create({
        header: 'Confirmar',
        message: '¿Estás seguro de eliminar este producto?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            handler: () => {
              this.productService.deleteProducto(id).subscribe(() => {
                this.loadProducts(); // Recargar productos después de eliminar
              });
            },
          },
        ],
      });
  
      await alert.present();
    }
  
    // Agregar un nuevo producto
    async addProduct() {
      const alert = await this.alertCtrl.create({
        header: 'Nuevo Producto',
        inputs: [
          { name: 'nombre', placeholder: 'Nombre' },
          { name: 'descripcion', placeholder: 'Descripción' },
          { name: 'cantidad', placeholder: 'Cantidad', type: 'number' },
          { name: 'precio_venta', placeholder: 'Precio Venta', type: 'number' },
          { name: 'precio_costo', placeholder: 'Precio Costo', type: 'number' },
          { name: 'url_foto', placeholder: 'URL de la Fotografía' },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Agregar',
            handler: (data) => {
              this.productService.createProducto(data).subscribe(() => {
                this.loadProducts(); // Recargar productos después de agregar
              });
            },
          },
        ],
      });
  
      await alert.present();
    }
  
    // Editar producto
    async editProduct(product: { nombre: any; descripcion: any; cantidad: any; precio_venta: any; precio_costo: any; url_foto: any; id: number; }) {
      const alert = await this.alertCtrl.create({
        header: 'Editar Producto',
        inputs: [
          { name: 'nombre', value: product.nombre, placeholder: 'Nombre' },
          { name: 'descripcion', value: product.descripcion, placeholder: 'Descripción' },
          { name: 'cantidad', value: product.cantidad, placeholder: 'Cantidad', type: 'number' },
          { name: 'precio_venta', value: product.precio_venta, placeholder: 'Precio Venta', type: 'number' },
          { name: 'precio_costo', value: product.precio_costo, placeholder: 'Precio Costo', type: 'number' },
          { name: 'url_foto', value: product.url_foto, placeholder: 'URL de la Fotografía' },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Guardar',
            handler: (data) => {
              this.productService.updateProducto(product.id, data).subscribe(() => {
                this.loadProducts(); // Recargar productos después de editar
              });
            },
          },
        ],
      });
  
      await alert.present();
    }
  }