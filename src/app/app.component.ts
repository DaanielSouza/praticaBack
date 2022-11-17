import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from 'src/model/Food.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';


const urlBase = "http://localhost:3000/"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
  title = 'praticaBack';

  cardapio: Food[] = [];
  form = new FormGroup({
    nome: new FormControl("", Validators.required),
    preco: new FormControl(0, [Validators.required, Validators.min(1)])
  });

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<Food[]>(urlBase + "produtos")
      .subscribe(e => this.cardapio = e)
  }

  add(): void {
    const food = this.form.value;
    this.httpClient.post<Food>(urlBase + "produtos", food)
      .subscribe(p => {
        this.cardapio.push(p);
        this.form.reset();
      })
  }

  delete(e: Food) {
    const food = e;
    this.httpClient.delete(urlBase + "produtos/" + e.id)
      .subscribe(() => this.cardapio.splice(this.cardapio.indexOf(e), 1))
  }

}
