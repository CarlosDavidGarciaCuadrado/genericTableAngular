import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GenericTableComponent } from './generic/generic-table/generic-table.component';
import { UserData, GenericTableConfig, TableEventControl } from './common/interfaces';
import { FRUITS, NAMES } from './common/constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GenericTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'genericTableAngular';

  orderColumn = {
    id: true,
    name: true,
    progress: false,
    fruit: false,
    Actions: false
  };

  displayedColumns = {
    id: 'id',
    name: 'nombre',
    progress: 'progreso',
    fruit: 'frutas',
    actions: 'acciones'
  };
  dataSource: UserData[] = [];

  constructor() {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource = users;
  }

  tableConfig: GenericTableConfig = {
    canCreate: true,
    canEdit: true,
    canRemove: true,
    canShowDetail: true,
    orderColumn: this.orderColumn,
    actionColumnWidth: 10,
    applyInterline: true,
    colorInterline: {
      color0: '#FF5733',
      color1: 'green'
    },
    sortColumns: ['id', 'nombre'],
    paginatorConfig: {
      showPaginator: true,
      showFirstLastButtons: true,
      showPageSizeOptions: true,
      pageSizeOptions: [5, 15, 25],
      pageSizeDefault: 5,
      disable: false,
      customMessagePaginator: {
        registerByPage: 'Registros por página',
        nextPage: 'Página siguiente',
        previousPage: 'Página anterior',
        lastPage: 'Última página',
        firstPage: 'Primera página',
        pageInfo: 'Total registros: ',
        showPageInfo: true
      }
    }
  }

  executeAction(strEventControl: string) {
    let eventControl: TableEventControl = JSON.parse(strEventControl);

    switch (eventControl.action) {
      case 'add':
        alert('Insertando...');
        break;
      case 'edit':
        alert('Editando...');
        break;
      case 'delete':
        alert('Eliminando...');
        break;
      case 'showDetail':
        alert('Mostrando detalles...');
        break;
    }
  }

}

function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}

