import React from 'react';
import { Product, Products } from '../FilterableProductTable';
import './ProductTable.css';

interface ProductsByCategoryProps {
  [key: string]: Array<Product>;
}

const ProductsByCategory = ({ productsByCategory }: { productsByCategory: ProductsByCategoryProps }) => {
  const categoryRows = [];

  for (const category in productsByCategory) {
    const CategoryTitle = () => (
      <tr className='product-category-row'>
        <th colSpan={2}>{category}</th>
      </tr>
    )

    const CategoryProducts = () => productsByCategory[category].map((product, index) => (
      <tr key={index} className={`product-row ${product.stocked ? '' : 'product-row--soldout'}`}>
        <td>{product.name}</td>
        <td className='product-col-price'>${product.price}</td>
      </tr>
    ));

    categoryRows.push((
      <React.Fragment key={category}>
        <CategoryTitle />
        <CategoryProducts />
      </React.Fragment>
    ));
  }

  return <>{categoryRows}</>;
}

export default function ProductTable({
  products,
  filterTxt,
  isStockOnly,
}: {
  products: Products;
  filterTxt: string;
  isStockOnly: boolean;
}) {

  const productsByCategory = filteredProducts.reduce<ProductsByCategoryProps>((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <table>
      <thead className="product-table-head">
        <tr>
          <td>Name</td>
          <td>Price</td>
        </tr>
      </thead>
      <tbody>
        <ProductsByCategory productsByCategory={productsByCategory} />
      </tbody>
    </table>
  )
}