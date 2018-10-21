import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Item';
import { UploadFileService } from '../../services/upload-file.service';
import { FileUpload } from 'src/app/models/fileupload';

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
  url: '',
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private itemService: ItemService,private uploadService: UploadFileService ) { }

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
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
 
  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
 
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }

    

}
