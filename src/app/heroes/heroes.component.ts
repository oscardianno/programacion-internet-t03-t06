import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getHeroes();
  }

  heroes: Hero[] = [];

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(
        (heroes) => (this.heroes = heroes.sort((a, b) => a.points - b.points))
      );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) return;

    this.heroService.addHero({ name, points: 0 } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
      this.getHeroes();
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
