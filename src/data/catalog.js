export const GOLD = "var(--gold)";
export const GOLD_LIGHT = "var(--gold-light)";
export const WARM_BG = "var(--bg-main)";
export const WARM_CARD = "var(--bg-card)";
export const CREAM = "var(--text-main)";
export const MUTED = "var(--text-muted)";
export const SUBTLE = "var(--text-subtle)";
export const FAINT = "var(--text-faint)";

export const SIZES = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"];
export const SKELETON_PRODUCTS = Array.from({ length: 6 }, (_, index) => index);
export const SIZE_GUIDE = [
  { uk: "6", eu: "40", cm: "25" },
  { uk: "7", eu: "41", cm: "26" },
  { uk: "8", eu: "42", cm: "27" },
  { uk: "9", eu: "43", cm: "28" },
  { uk: "10", eu: "44", cm: "29" },
];

export const FILTERS = ["All", "Dress", "Classic", "Work", "Outdoor", "Western", "Limited"];
export const SORTS = ["Featured", "Price: Low to High", "Price: High to Low"];
export const PRICE_RANGES = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under Rs. 5,000", min: 0, max: 4999 },
  { label: "Rs. 5,000 - Rs. 6,500", min: 5000, max: 6500 },
  { label: "Above Rs. 6,500", min: 6501, max: Infinity },
];
export const COLORS = ["All Colors", "Black", "Brown", "Tan"];

const bootImages = {
  chelsea: ["/assets/boots/chelsea.png"],
  chukka: ["/assets/boots/chukka.png"],
  service: ["/assets/boots/service.png"],
  capToe: ["/assets/boots/cap-toe.png"],
  mocToe: ["/assets/boots/moc-toe.png"],
  jodhpur: ["/assets/boots/jodhpur.png"],
  desert: ["/assets/boots/desert.png"],
  hiking: ["/assets/boots/hiking.png"],
  combat: ["/assets/boots/combat.png"],
  engineer: ["/assets/boots/engineer.png"],
  western: ["/assets/boots/western.png"],
  wingtip: ["/assets/boots/wingtip.png"],
};

const cardImage = (images) => images[0];
const galleryImages = (primary) => [primary, primary, primary];

const products = [
  { id: 1, name: "Chelsea Boot", subtitle: "Dress Pull-On Variant", price: 4999, tag: "Bestseller", category: "dress", img: cardImage(bootImages.chelsea), images: galleryImages(cardImage(bootImages.chelsea)), description: "A classic ankle-height pull-on boot defined by elastic side gussets, a clean vamp, and a slim dress profile.", details: ["Full-grain calf leather upper", "Elasticated side gussets", "Leather-stacked block heel", "Leather insole, rubber outsole", "Hand-finished in Bandra, Mumbai"] },
  { id: 2, name: "Chukka Boot", subtitle: "Two-Eyelet Ankle Variant", price: 5499, tag: "New", category: "dress", img: cardImage(bootImages.chukka), images: galleryImages(cardImage(bootImages.chukka)), description: "A low ankle boot with open lacing, traditionally cut with two or three eyelets for a smart-casual shape.", details: ["Waxed leather or suede upper", "Two-eyelet open lacing", "Soft ankle collar", "Rubber or crepe-inspired sole", "Easy weekday-to-weekend styling"] },
  { id: 3, name: "Service Boot", subtitle: "Military Heritage Variant", price: 4799, tag: "Heritage", category: "work", img: cardImage(bootImages.service), images: galleryImages(cardImage(bootImages.service)), description: "A lace-up boot inspired by early military issue footwear, known for a plain toe, sturdy quarters, and everyday durability.", details: ["Full-grain leather upper", "Plain toe silhouette", "Speed-hook lacing", "Goodyear-style welt look", "Built for daily wear"] },
  { id: 4, name: "Cap-Toe Boot", subtitle: "Reinforced Dress Variant", price: 6299, tag: "Exclusive", category: "dress", img: cardImage(bootImages.capToe), images: galleryImages(cardImage(bootImages.capToe)), description: "A refined boot with an additional toe cap panel, giving the front structure and a sharper formal presence.", details: ["Structured cap-toe panel", "Polished leather finish", "Slim dress last", "Full leather lining", "Made to order in 3 weeks"] },
  { id: 5, name: "Moc Toe Work Boot", subtitle: "U-Shaped Toe Variant", price: 5899, tag: "Workwear", category: "work", img: cardImage(bootImages.mocToe), images: galleryImages(cardImage(bootImages.mocToe)), description: "A workwear staple recognized by its raised U-shaped moccasin-style toe seam and rugged leather build.", details: ["Moc-toe stitched apron", "Oil-tanned leather look", "Cushioned footbed", "Traction rubber outsole", "Ideal with denim and utility wear"] },
  { id: 6, name: "Jodhpur Boot", subtitle: "Strap-and-Buckle Variant", price: 6499, tag: "Atelier", category: "dress", img: cardImage(bootImages.jodhpur), images: galleryImages(cardImage(bootImages.jodhpur)), description: "An equestrian-inspired ankle boot with a wraparound strap and buckle fastening instead of visible laces.", details: ["Side strap and buckle closure", "Clean vamp", "Low stacked heel", "Leather lining", "Sharp formal profile"] },
  { id: 7, name: "Desert Boot", subtitle: "Crepe-Sole Variant", price: 4299, tag: "Casual", category: "classic", img: cardImage(bootImages.desert), images: galleryImages(cardImage(bootImages.desert)), description: "A relaxed ankle boot related to the chukka, typically styled with a soft upper and crepe-inspired sole.", details: ["Minimal two-eyelet upper", "Soft suede or leather finish", "Crepe-inspired sole", "Lightweight casual build", "Weekend-ready silhouette"] },
  { id: 8, name: "Hiking Boot", subtitle: "Trail Support Variant", price: 6999, tag: "Outdoor", category: "outdoor", img: cardImage(bootImages.hiking), images: galleryImages(cardImage(bootImages.hiking)), description: "A supportive outdoor boot built for grip, ankle security, and long-distance comfort on uneven ground.", details: ["Padded ankle collar", "Deep-lug traction outsole", "Reinforced toe area", "Weather-ready upper", "Trail and travel focused"] },
  { id: 9, name: "Combat Boot", subtitle: "Lug-Sole Utility Variant", price: 5799, tag: "Utility", category: "work", img: cardImage(bootImages.combat), images: galleryImages(cardImage(bootImages.combat)), description: "A tall lace-up boot with utility roots, usually paired with a substantial lug sole and protective upper.", details: ["Higher ankle shaft", "Full lace closure", "Chunky lug sole", "Protective toe shape", "Urban utility styling"] },
  { id: 10, name: "Engineer Boot", subtitle: "Buckle Moto Variant", price: 7499, tag: "Limited", category: "limited", img: cardImage(bootImages.engineer), images: galleryImages(cardImage(bootImages.engineer)), description: "A pull-on motorcycle-inspired boot with a tall shaft, minimal front, and buckle strap detailing.", details: ["Pull-on shaft", "Adjustable buckle strap", "Plain rounded toe", "Stacked heel", "Limited seasonal run"] },
  { id: 11, name: "Western Boot", subtitle: "Cowboy Pull-On Variant", price: 7999, tag: "Western", category: "western", img: cardImage(bootImages.western), images: galleryImages(cardImage(bootImages.western)), description: "A pull-on western boot known for its taller shaft, angled heel, pointed toe influence, and decorative stitching.", details: ["Tall pull-on shaft", "Western stitch pattern", "Angled riding heel", "Leather lining", "Statement styling"] },
  { id: 12, name: "Wingtip Brogue Boot", subtitle: "Perforated Dress Variant", price: 6899, tag: "Formal", category: "dress", img: cardImage(bootImages.wingtip), images: galleryImages(cardImage(bootImages.wingtip)), description: "A dress boot with wingtip paneling and brogue perforations, giving classic tailoring a stronger boot profile.", details: ["Wingtip toe panel", "Brogue perforation detail", "Slim lace-up shaft", "Leather stacked heel", "Ideal for tailored outfits"] },
];

const productMeta = {
  1: { color: "Brown", rating: 4.9, sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"] },
  2: { color: "Tan", rating: 4.8, sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"] },
  3: { color: "Brown", rating: 4.8, sizes: ["UK 6", "UK 8", "UK 9", "UK 10", "UK 12"] },
  4: { color: "Black", rating: 4.9, sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"] },
  5: { color: "Brown", rating: 4.7, sizes: ["UK 8", "UK 9", "UK 10", "UK 11", "UK 12"] },
  6: { color: "Black", rating: 4.9, sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"] },
  7: { color: "Tan", rating: 4.8, sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"] },
  8: { color: "Brown", rating: 4.7, sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"] },
  9: { color: "Black", rating: 4.8, sizes: ["UK 8", "UK 9", "UK 10", "UK 11", "UK 12"] },
  10: { color: "Black", rating: 4.9, sizes: ["UK 8", "UK 9", "UK 10", "UK 11"] },
  11: { color: "Tan", rating: 4.8, sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"] },
  12: { color: "Brown", rating: 4.9, sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"] },
};

export const catalogProducts = products.map((product) => ({
  ...product,
  color: productMeta[product.id]?.color ?? "Brown",
  rating: productMeta[product.id]?.rating ?? 4.8,
  availableSizes: productMeta[product.id]?.sizes ?? SIZES,
}));

export const recommendSize = (lengthCm) => {
  if (!lengthCm || lengthCm < 23) return null;
  if (lengthCm < 24.2) return "UK 5";
  if (lengthCm < 25) return "UK 6";
  if (lengthCm < 25.8) return "UK 7";
  if (lengthCm < 26.7) return "UK 8";
  if (lengthCm < 27.5) return "UK 9";
  if (lengthCm < 28.4) return "UK 10";
  if (lengthCm < 29.2) return "UK 11";
  return "UK 12";
};
