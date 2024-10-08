
export interface Action {
  id: string;
  icon: string;
  tooltip: string;
  standalone:boolean;
  callback: Function;  
}