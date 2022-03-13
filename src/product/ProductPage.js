import './ProductPage.css';
import PRODUCTS from './Products.js'; // import 之前已整理好依照category排序
import { useState } from 'react';


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


const ProductTable = ({ text, isShowStocked }) => {
  console.log('search text: ', text);
  let filterProducts = PRODUCTS;
  if (text) {
    const regexp = new RegExp(text, "giu");
    filterProducts = PRODUCTS.filter(product => product.name.match(regexp));
    console.log('filterProducts: ', filterProducts);
  }

  if (isShowStocked) {
    console.log('checkbox: ', isShowStocked);
    filterProducts = PRODUCTS.filter(product => product.stocked);
  }

  const list = [];
  let currentCategory = null;
  filterProducts.forEach(product => {
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

const SearchBar = ({ text, setText, isShowStocked, setStock }) => (
  <form className="SearchBar">
    <input type="text" className="search_input" placeholder="Search..."
      value={text}
      onChange={(event) => setText(event.target.value)} />
    <label>
      <input type="checkbox" className="search_checkbox"
        checked={isShowStocked}
        onChange={() => setStock(!isShowStocked)} />
      Only show products in stock
    </label>
  </form>
)

const FilterableProductTable = () => {
  const [text, setText] = useState('');
  const [isShowStocked, setStock] = useState(false);
  return (
    <main>
      <h1>PRODUCTS</h1>
      <SearchBar
        text={text} setText={setText}
        isShowStocked={isShowStocked} setStock={setStock} />
      <ProductTable text={text} isShowStocked={isShowStocked} />
    </main>
  )
}

export default function ProductPage() {
  return (
    <FilterableProductTable />
  );
}