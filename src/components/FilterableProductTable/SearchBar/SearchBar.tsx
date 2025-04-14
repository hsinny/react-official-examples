import './SearchBar.css';

export default function SearchBar() {
  return (
    <div className="searchbar">
      <input type="text" name="keyword" placeholder="Search..." />
      <div>
        <input type="checkbox" name="isInStock" id="isInStock" />
        <label htmlFor="isInStock">Only show products in stock</label>
      </div>
    </div>
  )
}