export default class Col {
  constructor(
    name,
    field,
    resizable,
    width,
    sortable,
    sort,
    order,
    minWidth,
    visible,
    colId,
    height
  ) {
    this.headerName = name;
    this.field = field;
    this.resizable = resizable;
    this.width = width;
    this.sortable = sortable;
    this.sort = sort;
    this.colId = order;
    this.minWidth = minWidth;
    this.hide = !visible;
    this.colId = colId;
    this.height = height
  }
}
