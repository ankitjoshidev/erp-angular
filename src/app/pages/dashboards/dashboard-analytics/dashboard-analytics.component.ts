import { Component } from '@angular/core';
import { defaultChartOptions } from '../../../../@vex/utils/default-chart-options';
import { Order, tableSalesData } from '../../../../static-data/table-sales-data';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { UsersData } from 'src/static-data/users';

@Component({
  selector: 'vex-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss']
})
export class DashboardAnalyticsComponent {
 totalUsers: Number = UsersData.length;
 totalActiveUsers: Number = UsersData.filter(x=>x.active == 'true').length;
 today = new Date();
 todayYear = this.today.getFullYear();
 next30Days = new Date(this.today.setDate(this.today.getDate() + 30)).getTime();
 upcomingBirthdays: number;
 upcomingAniversaries: number;
 upcomingReleving: number;

constructor() {
  this.upcomingBirthdays = UsersData.filter(user => {
    if(user.dob && user.active == 'true'){

      const userDob = new Date(user.dob);

      const userBirthdayThisYear = new Date(userDob.setFullYear(this.todayYear)).getTime();
    
      return userBirthdayThisYear < this.next30Days && userBirthdayThisYear > new Date().getTime();
    } else {
      return false;
    }
  }).length;
  this.upcomingAniversaries = UsersData.filter(user => {
    if(user.joiningDate && user.active == 'true'){
      debugger
      const userDob = new Date(user.joiningDate);

      const userJoiningThisYear = new Date(userDob.setFullYear(this.todayYear)).getTime();
    
      return userJoiningThisYear < this.next30Days && userJoiningThisYear  > new Date().getTime();
    } else {
      return false;
    }
  }).length;
  this.upcomingReleving = UsersData.filter(user => {
    if(user.relevingDate){

      const userRelevingThisYear = new Date(user.relevingDate).getTime();
    
      return userRelevingThisYear > new Date().getTime();
    } else {
      return false;
    }
  }).length;
}
 
  tableColumns: TableColumn<Order>[] = [
    {
      label: '',
      property: 'status',
      type: 'badge'
    },
    {
      label: 'PRODUCT',
      property: 'name',
      type: 'text'
    },
    {
      label: '$ PRICE',
      property: 'price',
      type: 'text',
      cssClasses: ['font-medium']
    },
    {
      label: 'DATE',
      property: 'timestamp',
      type: 'text',
      cssClasses: ['text-secondary']
    }
  ];
  tableData = tableSalesData;

  series: ApexAxisChartSeries = [{
    name: 'Subscribers',
    data: [28, 40, 36, 0, 52, 38, 60, 55, 67, 33, 89, 44]
  }];

  userSessionsSeries: ApexAxisChartSeries = [
    {
      name: 'Users',
      data: [10, 50, 26, 50, 38, 60, 50, 25, 61, 80, 40, 60]
    },
    {
      name: 'Sessions',
      data: [5, 21, 42, 70, 41, 20, 35, 50, 10, 15, 30, 50]
    },
  ];

  salesSeries: ApexAxisChartSeries = [{
    name: 'Sales',
    data: [28, 40, 36, 0, 52, 38, 60, 55, 99, 54, 38, 87]
  }];

  pageViewsSeries: ApexAxisChartSeries = [{
    name: 'Page Views',
    data: [405, 800, 200, 600, 105, 788, 600, 204]
  }];

  uniqueUsersSeries: ApexAxisChartSeries = [{
    name: 'Unique Users',
    data: [356, 806, 600, 754, 432, 854, 555, 1004]
  }];

  uniqueUsersOptions = defaultChartOptions({
    chart: {
      type: 'area',
      height: 100
    },
    colors: ['#ff9800']
  });

}
