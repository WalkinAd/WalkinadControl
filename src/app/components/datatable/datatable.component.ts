import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Action } from '../../models/datatable.model'; 
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent<T> implements OnInit, AfterViewInit, OnChanges {

  @Input() data: T[] = [];
  @Input() columns: string[] = [];
  @Input() actions: Action[] = [];  

  dataSource!: MatTableDataSource<T>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.dataSource) {
      this.dataSource.data = this.data;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  executeAction(action: any, row: any): void {
    if (action.callback && typeof action.callback === 'function') {
      action.callback(row); 
    }
  }
  

}
