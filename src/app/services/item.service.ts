import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection , AngularFirestoreDocument } from '@angular/fire/firestore' ;
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


  constructor(public afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection('items');
    // this.items = this.afs.collection('items').valueChanges();
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
}

