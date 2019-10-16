import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 
    console.log('Servicio listo');
  }

  getQuery(query:string) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers= new HttpHeaders({
      'Authorization':'Bearer BQC-TF8RUBXREttd4oHoKybcpt9V56vNMjWWY9zIjNZYujB6DGd0ksWJzRiXQot_XUisLmOpbEGFgykuElY'
    });
    return this.http.get(url,{headers});
  }

  getNewReleases(){
    
    return this.getQuery('browse/new-releases')
              .pipe(map( data=> data['albums'].items));

  }
  getArtistas(termino: string){
    
    return this.getQuery(`search?q=${ termino }&type=artist&market=AR&limit=15`)
              .pipe(map( data =>  data['artists'].items));
  
  }
  getArtista(id: string){
    
    return this.getQuery(`artists/${id}`);
             // .pipe(map( data =>  data['artists'].items));
  
  }
  getTopTracks(id: string){
    
    return this.getQuery(`artists/${id}/top-tracks?country=AR`)
              .pipe(map( data =>  data['tracks']));
  
  }
}
