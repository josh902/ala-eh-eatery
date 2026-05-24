export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  badge?: "spicy" | "vegetarian" | "chef's special";
  image?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  description?: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: "appetizers",
    label: "Appetizers",
    description: "Start your meal with our delicious appetizers",
    items: [
      {
        name: "Calamares",
        price: 12.99,
        description: "Crispy deep-fried calamari rings with two authentic dipping sauces — tender and perfectly seasoned",
        badge: "chef's special",
        image: "/images/calamares.png",
      },
      {
        name: "Lumpia Shanghai",
        price: 9.99,
        description: "Crispy Filipino spring rolls filled with seasoned pork and vegetables, served with sweet chili dipping sauce",
        badge: "chef's special",
      },
      {
        name: "Tokwa't Baboy",
        price: 10.99,
        description: "Fried tofu and pork ears tossed in a tangy soy-vinegar sauce with green onions and chili",
        badge: "spicy",
      },
      {
        name: "Lechon Kawali Bites",
        price: 12.99,
        description: "Crispy deep-fried pork belly bites served with liver sauce and pickled papaya",
      },
    ],
  },
  {
    id: "rice-dishes",
    label: "Rice Dishes",
    description: "Traditional Filipino rice preparations",
    items: [
      {
        name: "Tapsilog",
        price: 11.99,
        description: "Classic Filipino breakfast — crispy fried eggs, dried beef strips, garlic fried rice, served with lumpia and fresh vegetables",
        badge: "chef's special",
        image: "/images/tapsilog.png",
      },
      {
        name: "Sinangag (Garlic Fried Rice)",
        price: 4.99,
        description: "Filipino-style garlic fried rice — crispy garlic bits, a perfect side for any dish",
        badge: "vegetarian",
      },
      {
        name: "Java Rice",
        price: 4.99,
        description: "Golden turmeric-seasoned rice, a classic pairing with grilled and saucy mains",
        badge: "vegetarian",
      },
      {
        name: "Champorado",
        price: 6.99,
        description: "Sweet Filipino chocolate rice porridge, served with a drizzle of condensed milk",
      },
    ],
  },
  {
    id: "noodles",
    label: "Noodles & Pancit",
    description: "Savory noodle dishes",
    items: [
      {
        name: "Palabok",
        price: 14.99,
        description: "Rice noodles smothered in a rich shrimp sauce, topped with chicharrón, hard-boiled egg, and green onion",
        badge: "chef's special",
        image: "/images/palabok.png",
      },
      {
        name: "Pancit Canton",
        price: 13.99,
        description: "Stir-fried egg noodles with pork, shrimp, and vegetables in a savory soy-based sauce",
      },
      {
        name: "Pancit Bihon",
        price: 12.99,
        description: "Thin rice noodles sautéed with chicken, vegetables, and soy-calamansi seasoning",
      },
    ],
  },
  {
    id: "meat-mains",
    label: "Meat Mains",
    description: "Signature meat dishes",
    items: [
      {
        name: "Club Sandwich",
        price: 10.99,
        description: "Hearty three-layer sandwich with crispy bacon, turkey, fresh lettuce, tomato, and mayo, served with crispy fries",
        image: "/images/club-sandwich.png",
      },
      {
        name: "Adobo",
        price: 16.99,
        description: "Our house Filipino adobo — pork and chicken braised in soy sauce, vinegar, garlic, and bay leaf",
        badge: "chef's special",
      },
      {
        name: "Kare-Kare",
        price: 18.99,
        description: "Slow-braised oxtail and vegetables in a rich, creamy peanut sauce, served with fermented shrimp paste",
      },
      {
        name: "Bistek Tagalog",
        price: 17.99,
        description: "Tender beef sirloin marinated in soy sauce and calamansi, topped with caramelized onion rings",
      },
      {
        name: "Lechon Kawali",
        price: 17.99,
        description: "Whole slab crispy deep-fried pork belly, golden and crunchy outside, juicy inside",
      },
    ],
  },
  {
    id: "soups",
    label: "Soups",
    description: "Warm and flavorful soups",
    items: [
      {
        name: "Sinigang na Baboy",
        price: 14.99,
        description: "Pork ribs in a sour tamarind broth with fresh vegetables — a Filipino comfort classic",
        badge: "chef's special",
      },
      {
        name: "Bulalo",
        price: 17.99,
        description: "Slow-simmered beef marrow bone soup with corn, bok choy, and tender beef shank",
      },
      {
        name: "Tinola",
        price: 13.99,
        description: "Chicken simmered in ginger-garlic broth with green papaya and malunggay leaves",
      },
    ],
  },
  {
    id: "seafood",
    label: "Seafood",
    description: "Fresh seafood preparations",
    items: [
      {
        name: "Sinigang na Hipon",
        price: 16.99,
        description: "Plump shrimp in a tangy tamarind broth with radish, eggplant, and string beans",
        badge: "chef's special",
      },
      {
        name: "Inihaw na Bangus",
        price: 15.99,
        description: "Grilled milkfish stuffed with tomatoes, onions, and ginger — a Filipino favourite",
      },
      {
        name: "Kinilaw na Tuna",
        price: 13.99,
        description: "Fresh tuna cured in coconut vinegar with ginger, onion, and chili — Filipino-style ceviche",
        badge: "spicy",
      },
    ],
  },
  {
    id: "vegetables",
    label: "Vegetables",
    description: "Vegetable sides and dishes",
    items: [
      {
        name: "Pinakbet",
        price: 11.99,
        description: "Mixed vegetables — bitter melon, eggplant, squash, okra — cooked in shrimp paste",
        badge: "vegetarian",
      },
      {
        name: "Laing",
        price: 10.99,
        description: "Dried taro leaves slow-cooked in rich coconut milk with chili and shrimp paste",
        badge: "vegetarian",
      },
      {
        name: "Ginisang Monggo",
        price: 9.99,
        description: "Sautéed mung bean stew with garlic, onion, and malunggay leaves",
        badge: "vegetarian",
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    description: "Sweet treats to end your meal",
    items: [
      {
        name: "Halo-Halo",
        price: 8.99,
        description: "The classic Filipino shaved ice dessert — sweetened beans, jellies, fruits, ube ice cream, and leche flan",
        badge: "chef's special",
      },
      {
        name: "Leche Flan",
        price: 6.99,
        description: "Silky smooth caramel egg custard, a beloved Filipino dessert made from scratch daily",
      },
      {
        name: "Bibingka",
        price: 5.99,
        description: "Soft coconut rice cake baked in banana leaves, topped with salted egg and fresh coconut",
      },
      {
        name: "Maja Blanca",
        price: 5.99,
        description: "Creamy coconut milk pudding with corn kernels, dusted with toasted coconut",
        badge: "vegetarian",
      },
    ],
  },
];
