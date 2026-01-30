export type TableProps = {
  HeaderData: TableHeaderProps[];
  itemData: TableBodyProps[];
  view?: boolean;
  Link?: string;
};
export type TableHeaderProps = string;
export type TableBodyProps = {
  id: string;
  order_id?: string;
  created_at: string;
  due_date?: string;
  customer_name: string;
  items?: string;
  problem?: string;
  brand_name?: string;
  engineer?: string;
  status?: string;
};
