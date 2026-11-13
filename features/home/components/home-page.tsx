"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import {
  ArrowRight,
  BadgePercent,
  Bell,
  ChevronDown,
  CircleHelp,
  Coins,
  Gift,
  Globe,
  Heart,
  PackageCheck,
  Percent,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  Truck,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useCartStore from "@/features/cart/store";
import { categories } from "@/features/categories/data/categories";
import { products, type Product } from "@/features/products/data/products";
import { cn } from "@/lib/utils";

const trendingSearches = [
  "Baggy Pants",
  "Butane Gas Stove Portable Set",
  "Neon Strip Lights",
  "Dual Lens CCTV Camera",
  "Official Store",
  "Jersey Basketball Customize Name And Number",
];

const shortcutItems: { label: string; icon: LucideIcon }[] = [
  { label: "Refer For Rewards", icon: Gift },
  { label: "Siguradong Mura", icon: BadgePercent },
  { label: "Fulfilled by Shopee", icon: PackageCheck },
  { label: "Flash Deals", icon: Percent },
  { label: "Free Shipping & Vouchers", icon: Truck },
  { label: "Shopee Beauty", icon: Sparkles },
  { label: "Shopee Loyalty", icon: Coins },
  { label: "Partner Promos", icon: Store },
  { label: "Coins Rewards", icon: Gift },
  { label: "Shopee Supermarket", icon: ShoppingBag },
];

const notifications = [
  "Your order #2048 has shipped.",
  "New vouchers are ready for you.",
  "Flash sale ends in 2 hours.",
];

const helpItems = [
  "Shipping & Delivery",
  "Returns & Refunds",
  "Payment & Wallet",
  "Customer Support",
];

const languages = ["English", "Bahasa Indonesia", "Filipino", "Portuguese", "Vietnamese"];

export function HomePage() {
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQty = useCartStore((state) => state.updateQty);
  const clearCart = useCartStore((state) => state.clear);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
      const matchesSearch =
        !normalizedQuery ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleSearchSubmit = (term?: string) => {
    const nextTerm = (term ?? searchTerm).trim();
    setSearchTerm(nextTerm);
  };

  const showToast = (message: string) => {
    setToast(message);
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    setCartOpen(true);
    showToast(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#333333]">
      <header className="bg-[#EE4D2D] text-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-2 text-[12px] md:px-6">
          <div className="flex items-center gap-3 text-white/90">
            <button type="button" className="transition hover:text-white">
              Seller Centre
            </button>
            <span className="text-white/30">|</span>
            <button type="button" className="transition hover:text-white">
              Start Selling
            </button>
            <span className="text-white/30">|</span>
            <button type="button" className="transition hover:text-white">
              Download
            </button>
            <span className="text-white/30">|</span>
            <div className="flex items-center gap-2">
              <span>Follow Us On</span>
              <button type="button" aria-label="Facebook" className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 hover:bg-white/15">
                f
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-white/90">
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen((value) => !value)}
                className="flex items-center gap-1 transition hover:text-white"
              >
                <Bell size={14} />
                Notifications
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 top-8 z-30 min-w-[220px] rounded-md border border-[#EEEEEE] bg-white p-2 text-[#333333] shadow-lg">
                  {notifications.map((notification) => (
                    <div key={notification} className="rounded-sm px-2 py-2 text-sm hover:bg-[#F5F5F5]">
                      {notification}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setHelpOpen((value) => !value)}
                className="flex items-center gap-1 transition hover:text-white"
              >
                <CircleHelp size={14} />
                Help
              </button>
              {helpOpen && (
                <div className="absolute right-0 top-8 z-30 min-w-[200px] rounded-md border border-[#EEEEEE] bg-white p-2 text-[#333333] shadow-lg">
                  {helpItems.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="block w-full rounded-sm px-2 py-2 text-left text-sm hover:bg-[#F5F5F5]"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setLanguageOpen((value) => !value)}
                className="flex items-center gap-1 transition hover:text-white"
              >
                <Globe size={14} />
                English
                <ChevronDown size={12} />
              </button>
              {languageOpen && (
                <div className="absolute right-0 top-8 z-30 min-w-[170px] rounded-md border border-[#EEEEEE] bg-white p-2 text-[#333333] shadow-lg">
                  {languages.map((language) => (
                    <button
                      key={language}
                      type="button"
                      className="block w-full rounded-sm px-2 py-2 text-left text-sm hover:bg-[#F5F5F5]"
                      onClick={() => {
                        setLanguageOpen(false);
                        showToast(`${language} selected`);
                      }}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setAuthMode("signup");
                setAuthOpen(true);
              }}
              className="transition hover:text-white"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("login");
                setAuthOpen(true);
              }}
              className="transition hover:text-white"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      <div className="bg-[#EE4D2D] pb-6 text-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-6 md:px-6">
          <button type="button" className="flex items-center gap-3 text-left">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Marketplace</span>
          </button>

          <div className="flex-1 px-4 md:px-10">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSearchSubmit();
              }}
              className="flex overflow-hidden rounded-md bg-white shadow-sm"
            >
              <input
                aria-label="Search products"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Sign up and get 100% off on your first order"
                className="h-14 flex-1 border-0 bg-transparent px-4 text-sm text-[#333333] outline-none placeholder:text-[#9E9E9E]"
              />
              {searchTerm && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchTerm("")}
                  className="px-3 text-[#757575] hover:text-[#333333]"
                >
                  <X size={16} />
                </button>
              )}
              <Button
                type="submit"
                className="h-14 rounded-none bg-[#EE4D2D] px-6 text-base hover:bg-[#D93F20]"
              >
                <Search size={18} />
                Search
              </Button>
            </form>

            <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/80">
              {trendingSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSearchSubmit(item)}
                  className="transition hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="Open cart"
              onClick={() => setCartOpen(true)}
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/15"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#FFD7CC] px-1 text-[10px] font-bold text-[#EE4D2D]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 pb-8 pt-4 md:px-6">
        <div className="flex gap-4 overflow-x-auto rounded-lg bg-white p-4 shadow-sm md:justify-between md:gap-2">
          {shortcutItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className="flex min-w-[140px] flex-col items-center gap-3 rounded-md p-2 text-center transition hover:bg-[#FFF6F3] md:min-w-0"
              onClick={() => {
                setSelectedCategory(null);
                setSearchTerm(label);
              }}
            >
              <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#F5F5F5] text-[#EE4D2D]">
                <Icon size={26} />
              </div>
              <span className="text-xs font-medium text-[#333333]">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <section className="rounded-xl bg-white p-4 shadow-sm md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold uppercase tracking-wide text-[#333333]">Categories</h2>
            <button
              type="button"
              onClick={() => setSelectedCategory((current) => current ?? categories[0]?.id ?? null)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EEEEEE] bg-white text-[#757575] transition hover:border-[#EE4D2D] hover:text-[#EE4D2D]"
              aria-label="Next category"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-lg border border-[#EEEEEE] md:grid-cols-5 xl:grid-cols-10">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => {
              setSelectedCategory(category.id);
              setSearchTerm(category.name);
                }}
                className={cn(
              "group flex min-h-[150px] flex-col items-center justify-center border-b border-r border-[#EEEEEE] bg-white p-3 transition hover:bg-[#FFF6F3]",
              selectedCategory === category.id && "bg-[#FFF6F3] ring-1 ring-[#EE4D2D]",
                )}
              >
                <div className="relative mb-3 h-[80px] w-[80px] overflow-hidden rounded-full bg-[#F5F5F5] p-2">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="80px"
                    className="rounded-full object-cover"
                  />
                </div>
                <span className="text-center text-xs font-medium leading-4 text-[#333333] group-hover:text-[#EE4D2D]">
              {category.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-[#333333]">Recommended For You</p>
            </div>
            <Button variant="outline" className="text-xs hover:text-[#EE4D2D]">
              See More
            </Button>
          </div>

          {searchTerm && (
            <div className="mb-4 rounded-lg border border-[#EEEEEE] bg-white p-3 text-sm text-[#333333] shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <span>
                  Results for <strong>{searchTerm}</strong>
                </span>
                <span className="text-[#757575]">{filteredProducts.length} item(s)</span>
              </div>
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-[#EEEEEE] transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div onClick={() => setSelectedProduct(product)} className="cursor-pointer text-left">
                    <div className="relative aspect-square">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
                        className="object-cover"
                      />
                      <span className="absolute left-2 top-2 rounded-sm bg-[#EE4D2D] px-2 py-1 text-[10px] font-semibold text-white">
                        {product.badge}
                      </span>
                      <button
                        type="button"
                        aria-label={`Save ${product.name}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          showToast(`${product.name} saved`);
                        }}
                        className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-[#757575] shadow-sm"
                      >
                        <Heart size={14} />
                      </button>
                    </div>
                    <div className="p-3">
                      <p className="mb-2 line-clamp-2 min-h-[40px] text-sm text-[#333333]">{product.name}</p>
                      <div className="mb-2 flex items-center gap-2 text-xs text-[#757575]">
                        <div className="flex items-center gap-0.5 text-[#FFB200]">
                          <Star size={12} fill="currentColor" />
                          <span className="text-[#333333]">{product.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{product.sold.toLocaleString()} sold</span>
                      </div>
                      <div className="mb-3 flex items-end gap-2">
                        <span className="text-xl font-bold text-[#EE4D2D]">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-[#9E9E9E] line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      {product.shipping && (
                        <span className="inline-flex rounded-sm border border-[#F8C3B7] bg-[#FFF4F0] px-2 py-1 text-[10px] font-medium text-[#EE4D2D]">
                          Free Shipping
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="border-t border-[#EEEEEE] p-3">
                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-[#D7D7D7] bg-white p-12 text-center text-[#757575] shadow-sm">
              No products match your search. Try another keyword or pick a different category.
            </div>
          )}
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-4 z-50 mx-auto flex max-w-xs items-center justify-center px-4">
        {toast && (
          <div className="rounded-full bg-[#333333] px-4 py-2 text-sm text-white shadow-lg">
            {toast}
          </div>
        )}
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 transition-opacity duration-200",
          cartOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setCartOpen(false)}
      />

      <aside
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-200",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-[#EEEEEE] p-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-[#EE4D2D]" />
            <h3 className="text-lg font-semibold">Your Cart</h3>
          </div>
          <button type="button" onClick={() => setCartOpen(false)} className="p-2 text-[#757575] hover:text-[#333333]">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-[#757575]">
              <ShoppingCart size={42} className="mb-4 text-[#EE4D2D]" />
              <p className="text-lg font-medium text-[#333333]">Your cart is empty.</p>
              <p className="mt-2 text-sm">Browse the marketplace and add your favorite items.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-lg border border-[#EEEEEE] p-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#333333]">{item.name}</p>
                    <p className="mt-1 text-sm font-semibold text-[#EE4D2D]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="h-7 w-7 rounded border border-[#EEEEEE] text-[#333333]"
                        aria-label={`Decrease quantity for ${item.name}`}
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="h-7 w-7 rounded border border-[#EEEEEE] text-[#333333]"
                        aria-label={`Increase quantity for ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-[#757575] hover:text-[#333333]"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-[#EEEEEE] p-4">
          <div className="mb-3 flex items-center justify-between text-sm text-[#757575]">
            <span>Subtotal</span>
            <span className="font-semibold text-[#333333]">${subtotal.toFixed(2)}</span>
          </div>
          <div className="mb-4 flex items-center justify-between text-sm text-[#757575]">
            <span>Shipping</span>
            <span className="font-semibold text-[#333333]">Free</span>
          </div>
          <Button className="mb-2 w-full" onClick={() => showToast("Checkout is a demo flow for this marketplace.")}>Checkout</Button>
          <Button variant="secondary" className="w-full" onClick={clearCart}>
            Clear cart
          </Button>
        </div>
      </aside>

      <Dialog.Root open={authOpen} onOpenChange={setAuthOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xl font-semibold text-[#333333]">
                  {authMode === "login" ? "Welcome back" : "Create account"}
                </p>
                <p className="text-sm text-[#757575]">This is a demo storefront experience.</p>
              </div>
              <Dialog.Close asChild>
                <button type="button" className="rounded-full p-2 text-[#757575] hover:bg-[#F5F5F5]">
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            <form className="space-y-4">
              {authMode === "signup" && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#333333]">Full name</label>
                  <input className="h-11 w-full rounded-md border border-[#EEEEEE] bg-white px-3 text-sm outline-none ring-0 focus:border-[#EE4D2D]" placeholder="Jane Doe" />
                </div>
              )}
              <div>
                <label className="mb-1 block text-sm font-medium text-[#333333]">Email</label>
                <input className="h-11 w-full rounded-md border border-[#EEEEEE] bg-white px-3 text-sm outline-none focus:border-[#EE4D2D]" placeholder="you@example.com" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#333333]">Password</label>
                <input type="password" className="h-11 w-full rounded-md border border-[#EEEEEE] bg-white px-3 text-sm outline-none focus:border-[#EE4D2D]" placeholder="••••••••" />
              </div>
              <Button
                type="button"
                className="w-full"
                onClick={() => {
                  setAuthOpen(false);
                  showToast(authMode === "login" ? "Logged in successfully" : "Account created successfully");
                }}
              >
                {authMode === "login" ? "Log in" : "Sign up"}
              </Button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#757575]">
              <span>{authMode === "login" ? "New to Marketplace?" : "Already have an account?"}</span>
              <button
                type="button"
                className="font-medium text-[#EE4D2D]"
                onClick={() => setAuthMode((current) => (current === "login" ? "signup" : "login"))}
              >
                {authMode === "login" ? "Sign up" : "Log in"}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={Boolean(selectedProduct)} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(90vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-2xl">
            {selectedProduct && (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-[#EEEEEE] bg-[#F5F5F5]">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded bg-[#FFF4F0] px-2 py-1 text-xs font-medium text-[#EE4D2D]">
                      {selectedProduct.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#FFB200]">
                      <Star size={14} fill="currentColor" />
                      {selectedProduct.rating}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-[#333333]">{selectedProduct.name}</h3>
                  <p className="mt-3 text-sm text-[#757575]">{selectedProduct.description}</p>
                  <div className="mt-4 flex items-end gap-3">
                    <span className="text-3xl font-bold text-[#EE4D2D]">
                      ${selectedProduct.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-[#9E9E9E] line-through">
                      ${selectedProduct.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-sm text-[#757575]">
                    <ShieldCheck size={16} className="text-[#EE4D2D]" />
                    {selectedProduct.sold.toLocaleString()} sold · Free shipping available
                  </div>
                  <div className="mt-8 flex gap-3">
                    <Button className="flex-1" onClick={() => handleAddToCart(selectedProduct)}>
                      Add to Cart
                    </Button>
                    <Button variant="secondary" className="flex-1" onClick={() => setSelectedProduct(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
