import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TProduct } from '../products.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: TProduct[] = [
    {
      id: 1,
      title: 'Travel Tripod',
      price: 39.99,
      price_off: 5,
      image:
        'https://plus.unsplash.com/premium_photo-1710409625188-d34e3e813f6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.7,
      reviews: 223,
      description: 'Compact and sturdy tripod, perfect for travel photography.',
      stock: 25,
      available: true,
      brand: 'XYZ Brand',
      material: 'Aluminium Alloy',
      features: ['Compact', 'Lightweight', 'Ball head included'],
      category: 'Tripods',
    },
    {
      id: 2,
      title: 'Professional Tripod Kit',
      price: 299.95,
      price_off: 0,
      image:
        'https://plus.unsplash.com/premium_photo-1710409625188-d34e3e813f6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.8,
      reviews: 87,
      description:
        'Heavy-duty tripod kit for professional photographers and videographers.',
      stock: 5,
      available: true,
      brand: 'ProShot',
      material: 'Carbon Fiber',
      features: ['Heavy-duty', 'Maximum height', 'Carrying case included'],
      category: 'Tripods',
    },
    {
      id: 3,
      title: 'Monopod',
      price: 74.5,
      price_off: 10,
      image:
        'https://plus.unsplash.com/premium_photo-1710409625188-d34e3e813f6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.3,
      reviews: 112,
      description:
        'Lightweight and portable monopod for added camera stability.',
      stock: 18,
      available: true,
      brand: 'ClickSnap',
      material: 'Aluminum',
      features: ['Lightweight', 'Portable', 'Compact'],
      category: 'Tripods',
    },
    {
      id: 4,
      title: 'Smartphone Tripod Adapter',
      price: 12.99,
      price_off: 0,
      image:
        'https://plus.unsplash.com/premium_photo-1710409625188-d34e3e813f6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.5,
      reviews: 348,
      description: 'Universal adapter to mount your smartphone on any tripod.',
      stock: 50,
      available: true,
      brand: 'TechClip',
      material: 'ABS Plastic',
      features: ['Universal compatibility', 'Lightweight', 'Portable'],
      category: 'Tripod',
    },
    {
      id: 5,
      title: 'Wireless Remote Shutter Release',
      price: 19.95,
      price_off: 8,
      image:
        'https://plus.unsplash.com/premium_photo-1710409625188-d34e3e813f6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.2,
      reviews: 179,
      description:
        'Control your camera remotely for long exposure photography.',
      stock: 32,
      available: true,
      brand: 'SnapTrigger',
      material: 'Plastic',
      features: ['Wireless control', 'Long-range Bluetooth', 'Compact'],
      category: 'Tripod',
    },
    {
      id: 6,
      title: 'Tripod Carrying Case',
      price: 24.5,
      price_off: 0,
      image:
        'https://plus.unsplash.com/premium_photo-1710409625188-d34e3e813f6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.1,
      reviews: 98,
      description:
        'Durable carrying case for protecting your tripod during travel.',
      stock: 15,
      available: true,
      brand: 'GearSafe',
      material: 'Padded Nylon',
      features: ['Durable', 'Water-resistant', 'Adjustable straps'],
      category: 'Tripod',
    },
    {
      id: 7,
      title: 'Macro Photography Tripod',
      price: 149.99,
      price_off: 15,
      image:
        'https://plus.unsplash.com/premium_photo-1710409625188-d34e3e813f6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.6,
      reviews: 56,
      description: 'Specialized tripod for close-up photography.',
      stock: 8,
      available: true,
      brand: 'MacroPro',
      material: 'Carbon Fiber',
      features: ['Precise adjustments', 'Lightweight', 'Compact'],
      category: 'Tripods',
    },
    {
      id: 8,
      title: 'Tabletop Tripod',
      price: 14.99,
      price_off: 0,
      image:
        'https://plus.unsplash.com/premium_photo-1710409625188-d34e3e813f6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.4,
      reviews: 201,
      description: 'Mini tripod for stable shots on flat surfaces.',
      stock: 42,
      available: true,
      brand: 'DeskStand',
      material: 'Plastic',
      features: ['Compact', 'Lightweight', 'Portable'],
      category: 'Tripods',
    },
    {
      id: 9,
      title: 'Action Camera Tripod',
      price: 29.95,
      price_off: 3,
      image:
        'https://plus.unsplash.com/premium_photo-1710409625188-d34e3e813f6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.2,
      reviews: 135,
      description: 'Flexible tripod for mounting action cameras.',
      stock: 28,
      available: true,
      brand: 'FlexMount',
      material: 'Rubber',
      features: ['Flexible legs', 'Waterproof', 'Durable'],
      category: 'Tripods',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onDetailsPage(id: number) {
    this.router.navigate(['products', id]);
  }

  getCalculatedDiscountPrice(price: number, discount: number): number {
    let discountedPrice = price - (price * discount) / 100;

    return parseFloat(discountedPrice.toFixed(2));
  }

  getStarsArray(rating: number) {
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 !== 0; // Check for half star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

    return {
      fullStars: Array(fullStars).fill(0),
      halfStar,
      emptyStars: Array(emptyStars).fill(0),
    };
  }
}
