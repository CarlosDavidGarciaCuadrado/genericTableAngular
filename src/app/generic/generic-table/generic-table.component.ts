import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GenericTableConfig, TableEventControl } from '../../common/interfaces';
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
  @Input() tableConfigExternal: GenericTableConfig | undefined;
  @Input() service: any;
  @Input() searchWord: any;
  @Output() actionEvent = new EventEmitter<string>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  objectKeys = Object.keys;
  dataSource!: MatTableDataSource<any>;
  eventControl!: TableEventControl;
  tableConfig: GenericTableConfig;

  constructor(){
    this.tableConfig = this.genericTableConfigDefault();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataSourceExternal);
    if(this.tableConfigExternal)
      this.tableConfig = this.tableConfigExternal;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.customMessagePaginator();
  }

  genericTableConfigDefault (): GenericTableConfig {
    return {
    canCreate: false,
    canEdit: false,
    canRemove: false,
    canShowDetail: false,
    canUpdate: true,
    canUpdateState: false,
    orderColumn: {},
    applyInterline: true,
    paginatorConfig: {
      showPaginator: true,
      showFirstLastButtons: true,
      showPageSizeOptions: true,
      pageSizeOptions: [5,10,20],
      pageSizeDefault: 5,
      disable: false,
      customMessagePaginator: {
        registerByPage: 'Registros por página',
        nextPage: 'Siguiente',
        previousPage: 'Atrás',
        lastPage: 'Última página',
        firstPage: 'Primera página',
        pageInfo: 'Total registros: ',
        showPageInfo: true
      }
    }
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  executeAction(action: string, event: any, object?: any): void {
    this.eventControl = {
      action: action,
      event: event,
      object: object ?? {}
    };
    this.actionEvent.emit(JSON.stringify(this.eventControl));
  }

  interlineDefault(index: number): object {
    return { 'background-color': index === 0 ? 'white' : 'lightgrey' };
  }

  interlineColor(index: number): object {
    let color = index === 0 ? this.tableConfig?.colorInterline?.color0 : this.tableConfig?.colorInterline?.color1;
    return this.validateInterLineColor() ? this.interlineDefault(index) : { 'background-color': color };
  }

  validateInterLineColor(): boolean {
    let color0 = this.tableConfig?.colorInterline?.color0;
    let color1 = this.tableConfig?.colorInterline?.color1;
    return (!color0 || color0 === '') || (!color1 || color1 === '')
  }

  isSortColumn(nameColumn: string): boolean {
    const columnsSort = this.tableConfig?.sortColumns ? this.tableConfig.sortColumns : [];
    return columnsSort.includes(nameColumn);
  }

  customMessagePaginator(): void {
    if(this.tableConfig.paginatorConfig.showPaginator){
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = this.tableConfig.paginatorConfig.customMessagePaginator?.registerByPage ?? 'item by page';
      this.paginator._intl.previousPageLabel = this.tableConfig.paginatorConfig.customMessagePaginator?.previousPage ?? 'previous page';
      this.paginator._intl.nextPageLabel = this.tableConfig.paginatorConfig.customMessagePaginator?.nextPage ??  'next page';
      this.paginator._intl.lastPageLabel = this.tableConfig.paginatorConfig.customMessagePaginator?.lastPage ?? 'last page';
      this.paginator._intl.firstPageLabel = this.tableConfig.paginatorConfig.customMessagePaginator?.firstPage ?? 'first page';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        const start = page * pageSize + 1;
        const end = (page + 1) * pageSize;
        let localEnd = (this.dataSourceExternal.length) > 0 ? this.dataSourceExternal.length : length;
        localEnd = localEnd > end ? end : localEnd;
        return  this.tableConfig.paginatorConfig.customMessagePaginator?.showPageInfo ? `${start} - ${localEnd} de ${length}` : `${this.tableConfig.paginatorConfig.customMessagePaginator?.pageInfo ?? 'Total registers: '} ${length}`;
      };
    }
  }

}