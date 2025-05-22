"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  fetchCartItems,
  addToCart as apiAddToCart,
  updateCartItem,
  removeFromCart as apiRemoveFromCart,
} from "@/lib/api"

export type CartItem = {
  id: string
  productId: string
  title: string
  price: number
  quantity: number
  image: string
}

type CartContextType = {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  loading: boolean
  addToCart: (productId: string, quantity: number) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartItems = await fetchCartItems()
        setItems(cartItems)
      } catch (error) {
        console.error("Failed to load cart:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [])

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const addToCart = async (productId: string, quantity: number) => {
    setLoading(true)
    try {
      const newItem = await apiAddToCart(productId, quantity)
      setItems((prev) => {
        const existingItemIndex = prev.findIndex((item) => item.productId === productId)

        if (existingItemIndex >= 0) {
          const updatedItems = [...prev]
          updatedItems[existingItemIndex].quantity += quantity
          return updatedItems
        } else {
          return [...prev, newItem]
        }
      })
    } catch (error) {
      console.error("Failed to add item to cart:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return

    setLoading(true)
    try {
      await updateCartItem(itemId, quantity)
      setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
    } catch (error) {
      console.error("Failed to update cart item:", error)
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (itemId: string) => {
    setLoading(true)
    try {
      await apiRemoveFromCart(itemId)
      setItems((prev) => prev.filter((item) => item.id !== itemId))
    } catch (error) {
      console.error("Failed to remove item from cart:", error)
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    setLoading(true)
    try {
      // API call to clear cart would go here
      setItems([])
    } catch (error) {
      console.error("Failed to clear cart:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
