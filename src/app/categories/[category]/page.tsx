import Image from 'next/image';
import Link from "next/link";
import { notFound } from 'next/navigation';
import { StarIcon } from "@heroicons/react/24/solid";


interface Product {
  id: number;
  product_name: string;
  product_price: number;
  shop_info: string;
  category: string;
  product_link: string;
  created_at: string;
  updated_at: string;
  filename : string;
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
    <Link href="/post/view/22">
    <div className="grid grid-cols-4 gap-6 w-full">
      {products.map((product) => (
        <div key={product.id} className="p-0 rounded-lg relative">
          {/* 할인율 배지 */}
          <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 text-sm rounded">
            -{product.discount}%
          </span>

          {/* 관심 & 조회 아이콘 */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="bg-white p-1 rounded-full shadow"><span>❤️</span></button>
            <button className="bg-white p-1 rounded-full shadow"><span>👁️</span></button>
          </div>

          {/* 상품 이미지 */}
          <Image src={`https://img.onemable.com/images/${product.filename}`} alt={product.product_name} width={300} height={300} className="mx-auto bg-gray-100 rounded-md p-10" />

          {/* 상품명 */}
          <h3 className="mt-4 text-lg font-medium">{product.product_name}</h3>

          {/* 가격 정보 */}
          <p className="text-red-500 text-xl">
            {product.product_price}원 <span className="text-md text-gray-500 line-through ml-2">{product.product_price}원</span>
          </p>

          {/* 별점 및 리뷰 */}
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.floor(product.id) }).map((_, index) => (
                <StarIcon key={index} className="w-6 h-6 text-yellow-500" />
            ))}
            {/* <span className="text-gray-500">({product.reviews})</span> */}
          </div>

          {/* "Add to Cart" 버튼 (특정 상품만) */}
          {product.showButton && (
            <button className="w-full mt-3 bg-black text-white">Add To Cart</button>
          )}
        </div>
      ))}
    </div>
    </Link>
  );
}
