import { Products } from '../FilterableProductTable';
import './ProductTable.css';

const ProductCategory = () => {
  return (
    <tr className='product-category-row'>
      <th colSpan={2}>{'Fruits'}</th>
    </tr>
  )
}

const ProductList = ({ products }: { products: Products }) => (
  products.map((product, index) => (
    <tr key={index} className={`product-row ${product.stocked ? '' : 'product-row--soldout'}`}>
      <td>{product.name}</td>
      <td className='product-col-price'>${product.price}</td>
    </tr>
  ))
)

export default function ProductTable({ 
  products, 
  filterTxt, 
  isStockOnly,
}: { 
  products: Products;
  filterTxt: string;
  isStockOnly: boolean;
}) {
  return (
    <table>
      <thead className="product-table-head">
        <tr>
          <td>Name</td>
          <td>Price</td>
        </tr>
      </thead>
      <tbody>
        <ProductCategory />
        <ProductList products={products} />
      </tbody>
    </table>
  )
}