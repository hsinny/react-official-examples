import { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ProductTable from "./ProductTable/ProductTable";

export interface Product {
  category: string;
  price: number;
  stocked: boolean;
  name: string;
};

export type Products = Array<Product>;

const PRODUCTS: Products = [
  { category: "Fruits", price: 1, stocked: true, name: "Apple" },
  { category: "Fruits", price: 1, stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: 2, stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: 2, stocked: true, name: "Spinach" },
  { category: "Vegetables", price: 4, stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: 1, stocked: true, name: "Peas" }
];

export default function FilterableProductTable() {
  const [filterTxt, setFilterTxt] = useState<string>('');
  const [isStockOnly, setIsStockOnly] = useState<boolean>(false);

  return (
    <section style={{ minHeight: '100vh' }}>
      <SearchBar
        filterTxt={filterTxt}
        isStockOnly={isStockOnly}
        onFilterChange={setFilterTxt}
        onIsStockOnlyChange={setIsStockOnly}
      />
      <ProductTable
        products={PRODUCTS}
        filterTxt={filterTxt}
        isStockOnly={isStockOnly}
      />
    </section>
  )
}