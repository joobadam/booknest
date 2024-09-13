import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Accommodation } from '../models/accommodation.model';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getAccommodations(): Observable<Accommodation[]> {
    return this.firestore.collection<Accommodation>('accommodations').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Accommodation;
        const id = a.payload.doc.id;
        return { ...data, id };
      }))
    );
  }

  addAccommodationWithImage(accommodation: Accommodation, imageFile: File): Observable<any> {
    const filePath = `accommodations/${Date.now()}_${imageFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, imageFile);

    return new Observable(observer => {
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(
            downloadURL => {
              accommodation.imageUrl = downloadURL;
              this.firestore.collection('accommodations').add(accommodation).then(
                () => {
                  observer.next();
                  observer.complete();
                },
                error => observer.error(error)
              );
            },
            error => observer.error(error)
          );
        })
      ).subscribe();
    });
  }

  updateAccommodationWithImage(id: string, accommodation: Partial<Accommodation>, imageFile: File | null): Observable<void> {
    if (imageFile) {
      const filePath = `accommodations/${Date.now()}_${imageFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, imageFile);

      return new Observable(observer => {
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(
              downloadURL => {
                accommodation.imageUrl = downloadURL;
                this.firestore.collection('accommodations').doc(id).update(accommodation).then(
                  () => {
                    observer.next();
                    observer.complete();
                  },
                  error => observer.error(error)
                );
              },
              error => observer.error(error)
            );
          })
        ).subscribe();
      });
    } else {
      return from(this.firestore.collection('accommodations').doc(id).update(accommodation));
    }
  }

  deleteAccommodation(id: string): Promise<void> {
    return this.firestore.collection('accommodations').doc(id).delete();
  }

  getAccommodationById(id: string): Observable<Accommodation> {
    return this.firestore.collection('accommodations').doc(id).get().pipe(
      map(doc => {
        if (doc.exists) {
          return { id: doc.id, ...(doc.data() as object) } as Accommodation;
        } else {
          throw new Error('A szállás nem található');
        }
      })
    );
  }
}