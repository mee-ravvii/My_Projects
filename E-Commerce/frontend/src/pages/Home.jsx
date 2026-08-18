import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import {
  getAllProducts,
  getProductsByCategory,
  getProductsByCategoryAndSearch,
  getProductsBySearch,
} from "../services/productServices";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../css/home.css";

const Home = () => {

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  // Mobile Sidebar / Filter Drawer
  const [filterOpen, setFilterOpen] = useState(false);


  useEffect(() => {

    const fetchProducts = async () => {

      try {

        let tempProducts;

        if (category === "All") {

          const data = await getAllProducts();

          tempProducts = data.products;

        } else {

          const data = await getProductsByCategory(category);

          tempProducts = data.products;

        }

        setProducts(tempProducts);

      } catch (err) {

        console.log(err.message);

      }

    };

    fetchProducts();

  }, [category]);


  useEffect(() => {

    let tempProducts;

    const fetchProducts = async () => {

      console.log(search);

      if (category != "All" && search) {

        const data = await getProductsByCategoryAndSearch(
          category,
          search
        );

        tempProducts = data.products;

        console.log(tempProducts);

        setProducts(tempProducts);

        return;

      }

      if (category === "All" || search) {
        const data = await getProductsBySearch(search);

        tempProducts = data.products;

        setProducts(tempProducts);

        return;

      }

    };

    fetchProducts();

  }, [search]);


  return (
    <>

      {/* ================= NAVBAR ================= */}

      <Navbar
        search={search}
        setSearch={setSearch}
        onFilterClick={() => setFilterOpen(true)}
      />

      {/* ================= MAIN LAYOUT ================= */}



      <div className="home-layout">
        {/* ================= SIDEBAR ================= */}

        <aside
          className={`sidebar-section ${
            filterOpen ? "mobile-sidebar-open" : ""
          }`}
        >

          <Sidebar
            category={category}
            setCategory={setCategory}
            onClose={() => setFilterOpen(false)}
          />

        </aside>


        {/* ================= MOBILE OVERLAY ================= */}

        {filterOpen && (

          <div
            className="sidebar-overlay"
            onClick={() => setFilterOpen(false)}
          ></div>

        )}


        {/* ================= PRODUCTS ================= */}

        <main className="product-section">

          <ProductGrid
            products={products}
          />

        </main>

      </div>

    </>
  );
};

export default Home;