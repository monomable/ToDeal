"use client";

import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6 text-gray-500">
        <span className="mr-1">Home</span>/ <span className="ml-1 font-semibold text-black">Cart</span>
      </nav>

      {/* Cart Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-6">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="px-4">Product</th>
              <th className="px-4">Price</th>
              <th className="px-4">Quantity</th>
              <th className="px-4">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white shadow-sm">
              <td className="flex items-center px-4 py-4">
                <Image src="/products/monitor.png" alt="LCD Monitor" width={60} height={60} className="mr-4" />
                <span>LCD Monitor</span>
              </td>
              <td className="px-4 align-middle">$650</td>
              <td className="px-4 align-middle">
                <select className="border border-gray-300 rounded px-2 py-1">
                  <option>01</option>
                  <option>02</option>
                </select>
              </td>
              <td className="px-4 align-middle">$650</td>
            </tr>
            <tr className="bg-white shadow-sm">
              <td className="flex items-center px-4 py-4">
                <Image src="/products/gamepad.png" alt="Gamepad" width={60} height={60} className="mr-4" />
                <span>H1 Gamepad</span>
              </td>
              <td className="px-4 align-middle">$550</td>
              <td className="px-4 align-middle">
                <select className="border border-gray-300 rounded px-2 py-1">
                  <option>01</option>
                  <option>02</option>
                </select>
              </td>
              <td className="px-4 align-middle">$1100</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button className="border px-6 py-2 rounded text-sm font-semibold">Return To Shop</button>
        <button className="border px-6 py-2 rounded text-sm font-semibold">Update Cart</button>
      </div>

      <div className="mt-12 flex flex-col md:flex-row justify-between gap-10">
        {/* Coupon Code Input + Button */}
        <div className="flex flex-col gap-2 items-start">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Coupon Code"
              className="border px-4 py-1.5 rounded w-64 text-sm h-10"
            />
            <button className="bg-red-500 text-white px-5 h-10 rounded hover:bg-red-600 text-sm font-semibold">
              Apply Coupon
            </button>
          </div>
        </div>

        {/* Cart Total Box */}
        <div className="border p-6 rounded w-full md:max-w-xs">
          <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal:</span>
            <span>$1750</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-sm font-semibold border-t border-gray-200 pt-2">
            <span>Total:</span>
            <span>$1750</span>
          </div>
          <button className="w-full bg-red-500 text-white mt-4 py-2 rounded hover:bg-red-600 text-sm font-semibold">
            Proceeds to checkout
          </button>
        </div>
      </div>
    </div>

  );
}
