export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  images: string[];
  colors: Color[];
  priceRange: {
    min: number;
    max: number;
  };
  category: string;
}

export interface Color {
  id: string;
  name: string;
  hex: string;
  available: boolean;
}

export interface Store {
  id: string;
  name: string;
  category: string;
  address: string;
  city: string;
  distance: number;
  latitude: number;
  longitude: number;
  phone: string;
  deliveryAvailable: boolean;
  hours: {
    open: string;
    close: string;
  };
}

export interface StoreAvailability {
  storeId: string;
  storeName: string;
  available: boolean;
  price: number;
  distance: number;
  deliveryAvailable: boolean;
  estimatedDeliveryTime?: string;
  replyTime?: string;
}

export interface Message {
  id: string;
  sender: "customer" | "store";
  storeId: string;
  productId: string;
  content: string;
  timestamp: Date;
  attachments?: {
    type: "availability" | "quote";
    data: Record<string, unknown>;
  };
}

export interface Order {
  id: string;
  productId: string;
  selectedColor: string;
  selectedStores: string[];
  fulfillmentType: "delivery" | "pickup";
  customerLocation: {
    address: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  status: "pending" | "confirmed" | "ready" | "completed";
  createdAt: Date;
  selectedStore?: string;
  deliveryEta?: string;
}
