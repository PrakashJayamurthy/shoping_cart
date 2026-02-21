import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";

const PAGE_SIZE = 8;

function ProductList({ products }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, page]);

  const goToPage = (p) => setPage(p);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const nextPage = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <section className="product-list-section">
      <div className="product-list" aria-label="Product List">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Product Pagination">
          <button
            onClick={prevPage}
            disabled={page === 1}
            aria-label="Previous Page"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => goToPage(idx + 1)}
              className={page === idx + 1 ? "active" : ""}
              aria-current={page === idx + 1 ? "page" : undefined}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={page === totalPages}
            aria-label="Next Page"
          >
            &gt;
          </button>
        </nav>
      )}
    </section>
  );
}

export default React.memo(ProductList);
