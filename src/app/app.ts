import { Component, ViewChild } from '@angular/core';

import { WebdatarocksPivotModule, WebdatarocksComponent } from "@webdatarocks/ngx-webdatarocks";
import "@webdatarocks/webdatarocks/webdatarocks.highcharts.js";

import { TopMenuComponent } from '../components/top-menu/top-menu.component';

import { HighchartsChartComponent } from 'highcharts-angular';
import * as Highcharts from "highcharts";
import 'highcharts/modules/accessibility';

@Component({
  selector: 'app-root',
  imports: [WebdatarocksPivotModule, HighchartsChartComponent, TopMenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  @ViewChild("pivot") pivotRef!: WebdatarocksComponent;

  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: { text: '' },
    series: []
  };
  report = {
    dataSource: {
      filename: "https://cdn.webdatarocks.com/data/data.csv",
    },
    slice: {
      rows: [
        {
          uniqueName: "Country",
        },
      ],
      columns: [
        {
          uniqueName: "Business Type",
        },
        {
          uniqueName: "Measures",
        },
      ],
      measures: [
        {
          uniqueName: "Price",
          aggregation: "sum",
        },
      ],
    },
  };

  onReportComplete() {
    // Unsubscribing from reportcomplete
    // We need it only to track the initialization of WebDataRocks
    this.pivotRef.webDataRocks.off("reportcomplete");
    this.createChart();
  }

  createChart() {
    this.pivotRef.webDataRocks.highcharts?.getData(
      {
        type: "spline"
      },
      // Function called when data for the chart is ready
      (data) => {
        this.chartOptions = data;
      },
      // Function called on report changes (filtering, sorting, etc.)
      (data) => {
        this.chartOptions = data;
      }
    );
  }
}
