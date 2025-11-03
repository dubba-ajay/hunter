import { Product, Store } from "@/types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Stainless Steel Rice Cooker",
    brand: "PanasoniC",
    description:
      "Advanced 10-cup rice cooker with fuzzy logic technology and keep-warm function",
    images: [
      "https://images.unsplash.com/photo-1556910103-1c02411ad7bc?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop",
    ],
    colors: [
      { id: "c1", name: "Silver", hex: "#C0C0C0", available: true },
      { id: "c2", name: "Black", hex: "#000000", available: true },
      { id: "c3", name: "White", hex: "#FFFFFF", available: false },
    ],
    priceRange: { min: 129.99, max: 179.99 },
    category: "Home & Kitchen",
  },
  {
    id: "2",
    name: "Cordless Power Drill",
    brand: "DeWalt",
    description:
      "20V compact cordless drill with LED work light and 1/2 inch single sleeve chuck",
    images: [
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=500&h=500&fit=crop",
    ],
    colors: [
      { id: "c1", name: "Yellow", hex: "#FFEB3B", available: true },
      { id: "c2", name: "Black", hex: "#000000", available: true },
    ],
    priceRange: { min: 99.99, max: 149.99 },
    category: "Hardware",
  },
  {
    id: "3",
    name: "Stainless Steel Kitchen Sink",
    brand: "Kohler",
    description:
      "Double bowl undermount sink with sound dampening and drainboard",
    images: [
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=500&fit=crop",
    ],
    colors: [
      { id: "c1", name: "Stainless Steel", hex: "#D3D3D3", available: true },
      { id: "c2", name: "Matte Black", hex: "#1A1A1A", available: true },
    ],
    priceRange: { min: 299.99, max: 499.99 },
    category: "Home & Kitchen",
  },
  {
    id: "4",
    name: "LED Smart Bulb 16M Colors",
    brand: "Philips Hue",
    description: "16 million color options, dimmable, voice controlled compatible",
    images: [
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    ],
    colors: [
      { id: "c1", name: "White", hex: "#FFFFFF", available: true },
      { id: "c2", name: "Warm White", hex: "#FFF8DC", available: true },
      { id: "c3", name: "Cool White", hex: "#F0F8FF", available: true },
    ],
    priceRange: { min: 49.99, max: 79.99 },
    category: "Electronics",
  },
];

export const MOCK_STORES: Store[] = [
  {
    id: "s1",
    name: "HomeStore Plus",
    category: "Home & Kitchen",
    address: "123 Main Street",
    city: "Downtown",
    distance: 2.3,
    latitude: 40.7128,
    longitude: -74.006,
    phone: "+1-555-0101",
    deliveryAvailable: true,
    hours: { open: "09:00", close: "21:00" },
  },
  {
    id: "s2",
    name: "TechMart Central",
    category: "Electronics",
    address: "456 Oak Avenue",
    city: "Midtown",
    distance: 3.1,
    latitude: 40.758,
    longitude: -73.9855,
    phone: "+1-555-0102",
    deliveryAvailable: true,
    hours: { open: "10:00", close: "20:00" },
  },
  {
    id: "s3",
    name: "Mega Store North",
    category: "Home & Kitchen",
    address: "789 Park Place",
    city: "North District",
    distance: 5.2,
    latitude: 40.7614,
    longitude: -73.9776,
    phone: "+1-555-0103",
    deliveryAvailable: false,
    hours: { open: "08:00", close: "22:00" },
  },
  {
    id: "s4",
    name: "Retail Hub Downtown",
    category: "General Retail",
    address: "321 Market Street",
    city: "Central",
    distance: 4.5,
    latitude: 40.7505,
    longitude: -73.997,
    phone: "+1-555-0104",
    deliveryAvailable: true,
    hours: { open: "09:00", close: "20:00" },
  },
  {
    id: "s5",
    name: "Hardware Pro Warehouse",
    category: "Hardware",
    address: "555 Industrial Boulevard",
    city: "Warehouse District",
    distance: 6.8,
    latitude: 40.7489,
    longitude: -73.968,
    phone: "+1-555-0105",
    deliveryAvailable: true,
    hours: { open: "07:00", close: "19:00" },
  },
  {
    id: "s6",
    name: "ElectroWorld Express",
    category: "Electronics",
    address: "888 Tech Lane",
    city: "Innovation Hub",
    distance: 3.8,
    latitude: 40.7614,
    longitude: -73.9776,
    phone: "+1-555-0106",
    deliveryAvailable: true,
    hours: { open: "10:00", close: "21:00" },
  },
];

export function findNearbyStores(
  productCategory: string,
  limit: number = 4
): Store[] {
  return MOCK_STORES.filter((store) => store.category === productCategory || productCategory === "All")
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

export function getProductById(id: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}

export function getStoreById(id: string): Store | undefined {
  return MOCK_STORES.find((s) => s.id === id);
}
