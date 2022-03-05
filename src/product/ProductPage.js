import './ProductPage.css';
import PRODUCTS from './Products.js'; // import 之前已整理好依照category排序


const ProductRow = ({ product }) => (
  <tr className={product.stocked ? '' : 'out_of_stock'} >
    <td>{product.name}</td>
    <td className="price">{product.price}</td>
    <td>{product.stocked ? 'In stock' : 'Out of stock'}</td>
  </tr>
)
const ProductCategoryRow = ({ category }) => (
  <tr>
    <th colSpan="3">{category}</th>
  </tr>
)


const ProductTable = () => {
  const list = [];
  let currentCategory = null;
  PRODUCTS.forEach(product => {
    if (product.category !== currentCategory) {
      list.push(
        <ProductCategoryRow key={product.category} category={product.category} />
      )
    }

    list.push(
      <ProductRow key={product.name} product={product} />
    )

    currentCategory = product.category;
  })

  return (
    <table className="ProductTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {list}
      </tbody>
    </table>
  )
}

const SearchBar = () => (
  <div className="SearchBar">
    <input type="text" className="search_input" placeholder="Search..." />
    <label>
      <input type="checkbox" className="search_checkbox" />
      Only show products in stock
    </label>
  </div>
)

const FilterableProductTable = () => (
  <div className="FilterableProductTable">
    <h1>PRODUCTS</h1>
    <SearchBar />
    <ProductTable />
  </div >
)

export default function ProductPage() {
  return (
    <FilterableProductTable />
  );
}