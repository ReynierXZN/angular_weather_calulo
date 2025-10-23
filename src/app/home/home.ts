import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Weather } from '../services/weather';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  // 🌤️ Weather Section
  city: string = '';
  weatherData: any = null;
  errorMessage: string = '';

  // ✅ Task Manager Section
  newTask: string = '';
  tasks: { description: string; completed: boolean }[] = [];

  // ✅ Task Filter
  filter: 'all' | 'active' | 'completed' = 'all';
  filteredTasks: { description: string; completed: boolean }[] = [];

  // ✅ Task Counters
  completedCount: number = 0;
  remainingCount: number = 0;

  constructor(private weatherService: Weather) {}

  ngOnInit() {
    this.updateCounts();
    this.updateFilteredTasks();
  }

  // ----- WEATHER -----
  getWeather() {
    this.weatherData = null;
    this.errorMessage = '';

    if (!this.city.trim()) {
      this.errorMessage = 'Please enter a city name.';
      return;
    }

    this.weatherService.getWeather(this.city.trim()).subscribe({
      next: (data) => {
        if (data && (data.current || data.location)) {
          this.weatherData = data;
        } else if (data && data.error) {
          this.errorMessage = data.error.info || 'City Not found or API Error';
        } else {
          this.errorMessage = 'City Not found or API Error';
        }
      },
      error: (err) => {
        console.error('Weather API error:', err);
        this.errorMessage = 'City Not found or API Error';
      }
    });
  }

  // ----- TASKS -----
  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ description: this.newTask.trim(), completed: false });
      this.newTask = '';
      this.updateCounts();
      this.updateFilteredTasks();
    }
  }

  toggleTask(index: number) {
    const realIndex = this.tasks.findIndex(t => t === this.filteredTasks[index]);
    if (realIndex !== -1) {
      this.tasks[realIndex].completed = !this.tasks[realIndex].completed;
    }
    this.updateCounts();
    this.updateFilteredTasks();
  }

  deleteTask(index: number) {
    const realIndex = this.tasks.findIndex(t => t === this.filteredTasks[index]);
    if (realIndex !== -1) {
      this.tasks.splice(realIndex, 1);
    }
    this.updateCounts();
    this.updateFilteredTasks();
  }

  // ✅ Update Counts
  updateCounts() {
    this.completedCount = this.tasks.filter(t => t.completed).length;
    this.remainingCount = this.tasks.length - this.completedCount;
  }

  // ✅ Task Filter Logic
  setFilter(value: 'all' | 'active' | 'completed') {
    this.filter = value;
    this.updateFilteredTasks();
  }

  updateFilteredTasks() {
    if (this.filter === 'active') {
      this.filteredTasks = this.tasks.filter(t => !t.completed);
    } else if (this.filter === 'completed') {
      this.filteredTasks = this.tasks.filter(t => t.completed);
    } else {
      this.filteredTasks = [...this.tasks];
    }
  }
}
