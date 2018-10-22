import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Item';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

item: Item = {
  SKU: '',
  Name: '',
  Category: '',
  Price: '',
  Date: '',
};

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  onSubmit() {

    if (this.item.SKU !== '' && this.item.Name !== '' && this.item.Category !== '' && this.item.Price !== '' && this.item.Date !== '') {
      this.itemService.addItem(this.item);
      this.item.SKU = '';
      this.item.Name = '';
      this.item.Category = '';
      this.item.Price = '';
      this.item.Date = '';
    }
  }

}
