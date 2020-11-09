import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceComponent {

  constructor(private httpClient: HttpClient) { }

  loadQuestion(): Observable<Question[]> {
    return this.httpClient.get<Question[]>("http://localhost:3000/questions");
  }

}
export class Question {
  public selected:number=0;
  constructor(public id: number,
    public question: string,
    public options: { a: string, b: string, c: string, d: string },
    public answer: string
  ) { }

}

