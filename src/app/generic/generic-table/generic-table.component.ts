import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TableEventControl } from '../../common/interfaces';
import { FlexLayoutModule } from "@angular/flex-layout";

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent {
  @Input() dataSourceExternal: any;
  @Input() columnHeader: any;
  @Input() tableConfig: any;
  @Input() service: any;
  @Input() searchWord: any;
  @Output() actionEvent = new EventEmitter<string>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  objectKeys = Object.keys;
  dataSource!: MatTableDataSource<any>;
  eventControl!: TableEventControl;

  ngOnInit(): void {
    const indexedDataSource = this.dataSourceExternal.map((item: any, index: any) => ({ ...item, index }));
    this.dataSource = new MatTableDataSource(indexedDataSource);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  executeAction(action: string, event: any, object?: any) {
    this.eventControl = {
      action: action,
      event: event,
      object: object ?? {}
    };
    this.actionEvent.emit(JSON.stringify(this.eventControl));
  }

  interlineDefault(index: number) {
    return { 'background-color': index === 0 ? 'white' : 'lightgrey' };
  }

  interlineColor(index: number) {
    let color = index === 0 ? this.tableConfig?.colorInterline?.color0 : this.tableConfig?.colorInterline?.color1;
    return this.validateInterLineColor() ? this.interlineDefault(index) : { 'background-color': color };
  }

  validateInterLineColor() {
    let color0 = this.tableConfig?.colorInterline?.color0;
    let color1 = this.tableConfig?.colorInterline?.color1;
    return (!color0 || color0 === '') || (!color1 || color1 === '')
  }

}