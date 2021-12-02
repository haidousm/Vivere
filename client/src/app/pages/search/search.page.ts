import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DiaryService } from 'src/app/services/diary.service';
import { FoodService } from 'src/app/services/food.service';
import { MealsService } from 'src/app/services/meals.service';
import { FoodItem } from 'src/app/types/FoodItem';
import { MealTime } from 'src/app/types/MealTime';
import { FoodDetailsPage } from '../food-details/food-details.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  numberOfItems = 30;
  foodItems: FoodItem[] = [];
  mealTimes: MealTime[] = [];

  constructor(
    private modalController: ModalController,
    private foodService: FoodService,
    private mealsService: MealsService,
    private diaryService: DiaryService
  ) {}

  ngOnInit() {
    this.foodService
      .getFoodItems(this.numberOfItems)
      .subscribe((foodItems: FoodItem[]) => {
        this.foodItems = foodItems;
      });

    this.mealsService.getMealTimes().subscribe((meals: MealTime[]) => {
      this.mealTimes = meals.sort((a, b) => a.order - b.order);
    });
  }

  search(event) {
    this.foodService
      .filterFoodItems(event.target.value.toLowerCase())
      .subscribe((foodItems: FoodItem[]) => {
        this.foodItems = foodItems;
      });
  }

  async selectItem(food: FoodItem) {
    const modal = await this.modalController.create({
      component: FoodDetailsPage,
      componentProps: {
        food,
        mealTimes: this.mealTimes,
        currentDiaryId: this.diaryService.getCurrentDiaryId(),
      },
      id: 'food-details-modal',
    });
    return await modal.present();
  }
}
