import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";

const products = [
  {
    name: "Product 1",
    description: "Product 1 description",
    price: "$100",
    image: "https://picsum.photos/200/300"
  },
  {
    name: "Product 2",
    description: "Product 2 description",
    price: "$200",
    image: "https://picsum.photos/200/300"
  },
  {
    name: "Product 3",
    description: "Product 3 description",
    price: "$300",
    image: "https://picsum.photos/200/300"
  },
  {
    name: "Product 4",
    description: "Product 4 description",
    price: "$400",
    image: "https://picsum.photos/200/300"
  },
  {
    name: "Product 5",
    description: "Product 5 description",
    price: "$500",
    image: "https://picsum.photos/200/300"
  },
  {
    name: "Product 6",
    description: "Product 6 description",
    price: "$600",
    image: "https://picsum.photos/200/300"
  },
  {
    name: "Product 7",
    description: "Product 7 description",
    price: "$700",
    image: "https://picsum.photos/200/300"
  },
  {
    name: "Product 8",
    description: "Product 8 description",
    price: "$800",
    image: "https://picsum.photos/200/300"
  },
  {
    name: "Product 9",
    description: "Product 9 description",
    price: "$900",
    image: "https://picsum.photos/200/300"
  },
  {
    name: "Product 10",
    description: "Product 10 description",
    price: "$1000",
    image: "https://picsum.photos/200/300"
  },
  {
    name: "Product 11",
    description: "Product 11 description",
    price: "$1100",
    image: "https://picsum.photos/200/300"
  },
  {
    name: "Product 12",
    description: "Product 12 description",
    price: "$1200",
    image: "https://picsum.photos/200/300"
  },
  {
    name: "Product 13",
    description: "Product 13 description",
    price: "$1300",
    image: "https://picsum.photos/200/300"
  },
]

const ProductListingSection = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-8 px-8 sm:px-none container">
      <h2 className="text-2xl font-bold">Catálogo de produtos</h2>
      <FilterBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-10 w-full">
        {products.map((product, index) => (
          <ProductCard {...product} key={index} />
        ))}
      </div>
    </section>
  )
}

ProductListingSection.displayName = "ProductListingSection";

export default ProductListingSection;