// import React, { useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import type { MemeTemplate, DecorativeElement } from "../services/imageService";

// interface ImageCarouselProps {
//   label: string;
//   images: (MemeTemplate | DecorativeElement)[];
//   selectedImage: string;
//   onSelect: (url: string) => void;
// }

// export const ImageCarousel: React.FC<ImageCarouselProps> = ({
//   images,
//   selectedImage,
//   onSelect,
//   label,
// }) => {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: "left" | "right") => {
//     if (scrollRef.current) {
//       const scrollAmount = direction === "left" ? -200 : 200;
//       scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="relative w-full">
//       {label && (
//         <h3 className="text-white font-medium text-sm uppercase mb-2">
//           {label}
//         </h3>
//       )}
//       <div className="relative group">
//         <div
//           ref={scrollRef}
//           className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-2 px-6"
//         >
//           {images.map((image) => (
//             <button
//               key={image.id}
//               onClick={() => onSelect(image.url)}
//               className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ${
//                 selectedImage === image.url
//                   ? "ring-2 ring-primary shadow-lg shadow-primary/20"
//                   : "hover:ring-2 hover:ring-primary/50"
//               }`}
//               title={image.name}
//             >
//               <img
//                 src={image.url}
//                 alt={image.name}
//                 className="w-full h-full object-cover"
//               />
//             </button>
//           ))}
//         </div>
//         <button
//           onClick={() => scroll("left")}
//           className="absolute -left-3 top-[calc(50%-30px)] z-10 bg-gray-700 hover:bg-gray-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
//           aria-label="Scroll left"
//         >
//           <ChevronLeft className="w-4 h-4 text-white" />
//         </button>
//         <button
//           onClick={() => scroll("right")}
//           className="absolute -right-3 top-[calc(50%-30px)] z-10 bg-gray-700 hover:bg-gray-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
//           aria-label="Scroll right"
//         >
//           <ChevronRight className="w-4 h-4 text-white" />
//         </button>
//       </div>
//     </div>
//   );
// };
