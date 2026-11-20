import logoImg from '../assets/logo.svg';
import userAvatarImg from '../assets/Avatar.jpg';

import teslaImg from '../assets/tesla.jpg';
import bmwImg from '../assets/bmw.jpg';
import mercedesImg from '../assets/mercedes.jpg';
import mercedesGImg from '../assets/mercedesG.jpg';
import porscheImg from '../assets/porsche.jpg';
import porscheSImg from '../assets/porscheS.jpg';
import audiImg from '../assets/Audi_RS6_Avant.jpg';
import audi8Img from '../assets/audi_R8.jpg';
import camryImg from '../assets/camry.jpg';
import lexusImg from '../assets/lexus.jpg';
import cybertruckImg from '../assets/cybertruck.jpg';
import bmw5Img from '../assets/bmw5.jpg';

import reviewUser1 from '../assets/User1.jpg';
import reviewUser2 from '../assets/User2.jpg';

export const siteConfig = {
  logo: logoImg,
  title: "DriveSelect",
};

export const currentUser = {
  name: "Arnur",
  role: "Premium Client",
  avatarUrl: userAvatarImg,
};

export const initialCars = [
  {
    id: 1,
    title: "Tesla Model 3",
    category: "Electric",
    pricePerDay: 85,
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 24,
    colors: ["White", "Black", "Deep Blue"],
    description: "Modern electric sedan with autopilot and long driving range.",
    imageUrl: teslaImg,
  },
  {
    id: 2,
    title: "BMW M4 Competition",
    category: "Sports",
    pricePerDay: 150,
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 18,
    colors: ["Yellow", "Black", "Isle of Man Green"],
    description: "High-performance sports coupe built for dynamic driving.",
    imageUrl: bmwImg,
  },
  {
    id: 3,
    title: "Mercedes-Benz G-Class",
    category: "SUV",
    pricePerDay: 220,
    isAvailable: true,
    rating: 5.0,
    reviewsCount: 42,
    colors: ["Obsidian Black", "Matte Gray"],
    description: "Luxury off-road icon offering supreme comfort and prestige.",
    imageUrl: mercedesGImg,
  },
  {
    id: 4,
    title: "porsche 918 spyder",
    category: "Sports",
    pricePerDay: 500,
    isAvailable: true,
    rating: 3.3,
    reviewsCount: 3,
    colors: ["Guards Red", "GT Silver", "Black"],
    description: "Iconic sports car delivering precision handling and speed.",
    imageUrl: porscheSImg,
  },
  {
    id: 5,
    title: "Audi R8",
    category: "Sports",
    pricePerDay: 300,
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 11,
    colors: ["Nardo Gray", "Mythos Black"],
    description: "The ultimate blend of supercar performance.",
    imageUrl: audi8Img,
  },
  {
    id: 6,
    title: "Lexus ES 350",
    category: "Sedan",
    pricePerDay: 60,
    isAvailable: true,
    rating: 4.4,
    reviewsCount: 16,
    colors: ["Black", "White", "Silver"],
    description: "Reliable and comfortable sedan perfect for business and city trips.",
    imageUrl: lexusImg,
  },
  {
    id: 7,
    title: "Tesla Cybertruck",
    category: "Electric",
    pricePerDay: 120,
    isAvailable: true,
    rating: 4.5,
    reviewsCount: 30,
    colors: ["White", "Black", "Deep Blue"],
    description: "Modern electric pickup with autopilot and long driving range.",
    imageUrl: cybertruckImg,
  },
  {
    id: 8,
    title: "BMW M5 Competition",
    category: "Sports",
    pricePerDay: 150,
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 19,
    colors: ["Yellow", "Black", "Isle of Man Green"],
    description: "High-performance sports coupe built for dynamic driving.",
    imageUrl: bmw5Img,
  },
  {
    id: 9,
    title: "Mercedes-Benz S-Class",
    category: "Sedan",
    pricePerDay: 220,
    isAvailable: false,
    rating: 5.0,
    reviewsCount: 42,
    colors: ["Obsidian Black", "Matte Gray"],
    description: "Luxury icon offering supreme comfort and prestige.",
    imageUrl: mercedesImg,
  },
  {
    id: 10,
    title: "Porsche 911 Carrera",
    category: "Sports",
    pricePerDay: 260,
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 15,
    colors: ["Guards Red", "GT Silver", "Black"],
    description: "Iconic sports car delivering precision handling and speed.",
    imageUrl: porscheImg,
  },
  {
    id: 11,
    title: "Audi RS6 Avant",
    category: "Wagon",
    pricePerDay: 180,
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 11,
    colors: ["Nardo Gray", "Mythos Black"],
    description: "The ultimate blend of supercar performance and family practical design.",
    imageUrl: audiImg,
  },
  {
    id: 12,
    title: "Toyota Camry",
    category: "Sedan",
    pricePerDay: 50,
    isAvailable: true,
    rating: 4.6,
    reviewsCount: 38,
    colors: ["Black", "White", "Silver"],
    description: "Reliable and comfortable sedan perfect for business and city trips.",
    imageUrl: camryImg,
  },
];

export const categoriesList = ["All", "Electric", "Sports", "SUV", "Sedan", "Wagon"];

export const navItemsList = [
  { id: "cars", label: "Fleet Catalog", link: "#cars" },
  { id: "stats", label: "Analytics", link: "#stats" },
  { id: "reviews", label: "Reviews", link: "#reviews" },
];

export const statsList = [
  { id: 1, title: "Available Fleet", value: "48", change: "12% this month", isPositive: true },
  { id: 2, title: "Successful Rentals", value: "1,240", change: "24% this year", isPositive: true },
  { id: 3, title: "Average Rating", value: "4.9 / 5", change: "0.2 vs last month", isPositive: true },
];

export const initialReviews = [
  {
    id: 1,
    authorName: "Alex Johnson",
    authorRole: "Business Traveler",
    avatar: reviewUser1,
    text: "Rented the Tesla Model 3 for a weekend trip. Immaculate condition and top-notch service!",
    date: "October 12, 2026",
    likes: 5,
  },
  {
    id: 2,
    authorName: "Sarah Miller",
    authorRole: "Tourist",
    avatar: reviewUser2,
    text: "Awesome car selection! Booked online in minutes. Highly recommended.",
    date: "September 28, 2026",
    likes: 12,
  },
];