import { notFound } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

async function getProducts(category: string): Promise<Product[]> {
  // Express 서버 API 호출
  const res = await fetch(`http://localhost:5000/server-api/products?category=${category}`, {
    cache: 'no-store', // 실시간 데이터
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export default async function CategoryProductsPage({ params }: { params: { category: string } }) {
  const { category } = params;

  let products: Product[] = [];
  try {
    products = await getProducts(category);
  } catch {
    notFound();
  }

  return (
    <div>
      <h1>{category} 제품 목록</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button>Add To Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
