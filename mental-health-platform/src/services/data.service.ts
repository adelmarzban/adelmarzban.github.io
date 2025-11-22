import { Injectable, signal } from '@angular/core';
import { CurrentUser, UserData, ThoughtLogEntry, NegativeThought } from '../models';

const QUESTIONS_COUNT = 49;

@Injectable({ providedIn: 'root' })
export class DataService {
  currentUser = signal<CurrentUser | null>(null);
  userData = signal<UserData | null>(null);
  
  private users = signal<{[key: string]: UserData}>({});

  constructor() {
    this.loadInitialData();
  }
  
  private loadInitialData() {
    if (typeof localStorage === 'undefined') return;

    const usersStr = localStorage.getItem('users');
    if (usersStr) {
        this.users.set(JSON.parse(usersStr));
    }

    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
        const user: CurrentUser = JSON.parse(currentUserStr);
        this.currentUser.set(user);
        this.userData.set(this.users()[user.email] ?? null);
    }
  }

  private saveUsers() {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('users', JSON.stringify(this.users()));
  }

  login(email: string, password: string): boolean {
    const user = this.users()[email];
    if (user && user.password === password) {
      const currentUser = { email };
      this.currentUser.set(currentUser);
      this.userData.set(user);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      return true;
    }
    return false;
  }

  signup(email: string, password: string): boolean {
    if (this.users()[email]) {
      return false; // User already exists
    }
    const newUser: UserData = {
      password,
      answers: new Array(QUESTIONS_COUNT).fill(false),
      thoughtLog: [],
      unlockedSteps: ['screening']
    };
    this.users.update(users => ({...users, [email]: newUser}));
    this.saveUsers();
    
    // Automatically log in the new user
    const currentUser = { email };
    this.currentUser.set(currentUser);
    this.userData.set(newUser);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    return true;
  }
  
  logout() {
    this.currentUser.set(null);
    this.userData.set(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentStepId');
  }

  clearAllData() {
    this.users.set({});
    this.currentUser.set(null);
    this.userData.set(null);
    localStorage.removeItem('users');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentStepId');
  }
  
  private updateCurrentUserdata(data: Partial<UserData>) {
    const email = this.currentUser()?.email;
    if (!email || !this.users()[email]) return;

    this.users.update(users => {
      const userCopy = {...users[email]};
      const updatedUser = Object.assign(userCopy, data);
      const usersCopy = {...users};
      usersCopy[email] = updatedUser;
      return usersCopy;
    });
    this.userData.set(this.users()[email]);
    this.saveUsers();
  }
  
  updateAnswers(answers: boolean[]) {
    this.updateCurrentUserdata({ answers });
  }

  unlockStep(stepId: string) {
    const currentSteps = this.userData()?.unlockedSteps ?? [];
    if (!currentSteps.includes(stepId)) {
        const unlockedSteps = [...currentSteps, stepId];
        this.updateCurrentUserdata({ unlockedSteps });
    }
  }

  addThoughtLog(entry: ThoughtLogEntry) {
    const currentLog = this.userData()?.thoughtLog ?? [];
    const thoughtLog = [entry, ...currentLog];
    this.updateCurrentUserdata({ thoughtLog });
  }

  deleteThoughtLog(id: number) {
    const currentLog = this.userData()?.thoughtLog ?? [];
    const thoughtLog = currentLog.filter(e => e.id !== id);
    this.updateCurrentUserdata({ thoughtLog });
  }

  updateThoughtLog(updatedEntry: Partial<ThoughtLogEntry>) {
    const currentLog = this.userData()?.thoughtLog ?? [];
    const thoughtLog = currentLog.map(e => e.id === updatedEntry.id ? { ...e, ...updatedEntry } as ThoughtLogEntry : e);
    this.updateCurrentUserdata({ thoughtLog });
  }

  saveCurrentStep(stepId: string) {
    localStorage.setItem('currentStepId', stepId);
  }
  
  loadCurrentStep(): string | null {
    return localStorage.getItem('currentStepId');
  }
}