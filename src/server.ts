import { Server } from '@overnightjs/core';
import express, { Application } from 'express';

import ForecastController from './controllers/forecast';
import './util/module-alias';

export default class SetupServer extends Server {
  constructor(private readonly port = 3000) {
    super();
  }

  public init(): void {
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(express.json());
  }

  private setupControllers(): void {
    const forecastController = new ForecastController();
    this.addControllers(forecastController);
  }

  public getApp(): Application {
    return this.app;
  }
}
