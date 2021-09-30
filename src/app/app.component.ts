import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { WebdatarocksComponent } from 'ng-webdatarocks';
import * as Highcharts from "highcharts";
// import "webdatarocks/webdatarocks.highcharts.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('pivot1') child: WebdatarocksComponent;
  Highcharts: typeof Highcharts = Highcharts;

  onPivotReady(pivot: WebDataRocks.Pivot): void {
    console.log('[ready] WebdatarocksPivotModule', this.child);
  }

  public pivotReport = {
    dataSource: {
      filename: "https://cdn.webdatarocks.com/data/data.csv"
    },
    slice: {
      rows: [{ uniqueName: "Country" }],
      columns: [{ uniqueName: "Measures" }],
      measures: [{ uniqueName: "Price", aggregation: "sum" }]
    }
  };

  onCustomizeCell(
    cell: WebDataRocks.CellBuilder,
    data: WebDataRocks.CellData
  ): void {
    if (data.isClassicTotalRow) {
      cell.addClass('fm-total-classic-r');
    }
    if (data.isGrandTotalRow) {
      cell.addClass('fm-grand-total-r');
    }
    if (data.isGrandTotalColumn) {
      cell.addClass('fm-grand-total-c');
    }
  }

  onReportComplete(): void {
    this.child.webDataRocks.off("reportcomplete");
    this.createAreaChart();
    this.createBarChart();
  }

  createAreaChart() {
    this.child.webDataRocks.highcharts.getData(
      {
        type: "areaspline"
      },
      data => {
        this.Highcharts.setOptions({
          plotOptions: {
            series: {
              color: "#2a8000" // set colors of the series
            }
          }
        });
        this.Highcharts.chart("highchartsContainer-1", data);
      },
      data => {
        this.Highcharts.setOptions({
          plotOptions: {
            series: {
              color: "#2a8000" // set colors of the series
            }
          }
        });
        this.Highcharts.chart("highchartsContainer-1", data);
      }
    );
  }
  /* Create a bar chart that shows a preconfigured slice */
  createBarChart() {
    this.child.webDataRocks.highcharts.getData(
      {
        slice: {
          rows: [{ uniqueName: "Country" }],
          columns: [{ uniqueName: "Measures" }],
          measures: [{ uniqueName: "Quantity", aggregation: "sum" }]
        },
        type: "bar"
      },
      data => {
        this.Highcharts.setOptions({
          plotOptions: {
            series: {
              color: "#00a3cc" // set colors of the series
            }
          }
        });
        this.Highcharts.chart("highchartsContainer-2", data);
      },
      data => {
        this.Highcharts.setOptions({
          plotOptions: {
            series: {
              color: "#00a3cc" // set colors of the series
            }
          }
        });
        this.Highcharts.chart("highchartsContainer-2", data);
      }
    );
  }
}
