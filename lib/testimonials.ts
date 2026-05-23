export interface Testimonial {
  name: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Nguyen",
    text: "Finally, authentic Filipino food in Halifax! The sinigang brought me right back to my grandmother's kitchen. The adobo is perfectly balanced — not too sour, not too salty. Portions are generous and the staff are so warm and welcoming. This is our new go-to spot for family dinners.",
    rating: 5,
    date: "2 weeks ago",
  },
  {
    name: "Michael Thompson",
    text: "My first time trying Filipino cuisine and Ala Eh Eatery made it absolutely memorable. The lumpia was crispy and packed with flavour. The halo-halo was a dessert experience unlike anything I've had before. The team took the time to explain every dish — truly exceptional service.",
    rating: 5,
    date: "1 month ago",
  },
  {
    name: "Jasmine dela Cruz",
    text: "Ala Eh is a true gem in Halifax. The kare-kare is rich and perfectly complemented by the bagoong. Everything tastes home-cooked with love. As a Filipino living abroad, places like this are more than just food — they're a piece of home. Salamat!",
    rating: 5,
    date: "3 weeks ago",
  },
];
