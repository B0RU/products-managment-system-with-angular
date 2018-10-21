import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection , AngularFirestoreDocument } from '@angular/fire/firestore' ;
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Item } from '../models/item';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;



  constructor(public afs: AngularFirestore, private afStorage: AngularFireStorage) {
    this.itemsCollection = this.afs.collection('items');
    this.items = this.itemsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    });
   }
   getItems() {
     return this.items;
   }
   addItem(item: Item) {
     this.itemsCollection.add(item);
   }
   deleteItem (item: Item) {
     this.itemDoc = this.afs.doc(`items/${item.id}`);
     this.itemDoc.delete();
   }
   updateItem(item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
     this.itemDoc.update(item);
   }
   upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.downloadURL = this.task.downloadURL();
  }
}


