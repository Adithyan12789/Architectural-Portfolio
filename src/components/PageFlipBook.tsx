import { useEffect, useRef, useState } from "react";
import {
  Loader2,
  ArrowLeft,
  X,
  ZoomIn,
  ZoomOut,
  ArrowRight,
} from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "react-medium-image-zoom/dist/styles.css";

interface Page {
  id: number;
  imageUrl: string;
}

interface PageFlipBookProps {
  pages: Page[];
}

export const PageFlipBook = ({ pages = [] }: PageFlipBookProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 600 });
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const updateDimensions = () => {
      const width = Math.min(900, window.innerWidth - 40);
      const height = (width * 3) / 4;
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const turnPage = (direction: "next" | "prev") => {
    if (isFlipping) return; // Prevent multiple clicks

    const newPage =
      direction === "next"
        ? Math.min(currentPage + 2, pages.length - 1)
        : Math.max(currentPage - 2, 0);

    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsFlipping(false);
    }, 600);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(
      Math.max(0, Math.min(parseInt(event.target.value) - 1, pages.length - 1))
    );
  };

  const handleImageLoad = (pageId: number) => {
    setLoadedImages((prev) => new Set(prev).add(pageId));
  };

  const handleImageClick = (imageUrl: string) => {
    setPreviewImage(imageUrl);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{
        backgroundImage: "url('/images/5026563.jpg')", // replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Dark Overlay to reduce background visibility */}
      <div
        className="absolute inset-0 z-0 bg-black opacity-50"
        style={{ pointerEvents: "none" }}
      ></div>

      <div
        ref={bookRef}
        className="relative z-10 overflow-hidden bg-white rounded-lg shadow-2xl"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          perspective: "1500px",
          position: "relative",
        }}
      >
        <div className="relative w-full h-full">
          {[currentPage, currentPage + 1].map((index) => {
            if (index >= pages.length) return null;

            const page = pages[index];
            const isLoaded = loadedImages.has(page.id);

            return (
              <div
                key={page.id}
                className={`absolute w-1/2 h-full overflow-hidden 
          ${index % 2 === 0 ? "left-0" : "right-0"}
          transition-all duration-800 ease-in-out`}
                style={{
                  zIndex: isFlipping ? 10 : pages.length - index, // Keep this value low if necessary
                  transformOrigin:
                    index % 2 === 0 ? "right center" : "left center",
                  backfaceVisibility: "hidden",
                }}
              >
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                  </div>
                )}
                <img
                  src={page.imageUrl || "/placeholder.svg"}
                  alt={`Page ${index + 1}`}
                  className="object-cover w-full h-full transition-transform duration-300 cursor-pointer hover:scale-110"
                  onLoad={() => handleImageLoad(page.id)}
                  onClick={() => handleImageClick(page.imageUrl)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Page numbers */}
      <div className="mt-4 text-amber-800">
        Pages {currentPage + 1}-{Math.min(currentPage + 2, pages.length)} of{" "}
        {pages.length}
      </div>

      {/* Button Container */}
      {pages.length > 1 && (
        <div className="absolute inset-x-0 z-50 flex justify-between px-4 py-2">
          {/* Backward Button */}
          <button
            type="submit"
            title="backward"
            onClick={() => turnPage("prev")}
            className={`px-4 py-2 transition-all duration-300 rounded-lg shadow-lg 
        bg-amber-100 text-amber-800 hover:bg-amber-200 
        ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={currentPage === 0}
          >
            <ArrowLeft className="w-6 h-6 text-amber-800" />
          </button>

          {/* Forward Button */}
          <button
            title="forward"
            onClick={() => turnPage("next")}
            className={`px-4 py-2 transition-all duration-300 rounded-lg shadow-lg 
        bg-amber-100 text-amber-800 hover:bg-amber-200 
        ${
          currentPage >= pages.length - 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
            disabled={currentPage >= pages.length - 1}
          >
            <ArrowRight className="z-50 w-6 h-6 text-amber-800" />
          </button>
        </div>
      )}

      {/* Modern Slider */}
      <div className="w-full max-w-xs mt-4">
        <input
          title="slider"
          type="range"
          min={1}
          max={pages.length}
          value={currentPage + 1}
          onChange={handleSliderChange}
          className="w-full h-2 transition-all duration-300 ease-in-out rounded-full appearance-none cursor-pointer bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700 hover:scale-105 focus:outline-none"
          style={{
            backgroundSize: `${((currentPage + 1) / pages.length) * 100}% 100%`,
            backgroundPosition: "0 0",
          }}
        />
        <div className="flex justify-between mt-1 text-sm text-amber-600">
          <span>1</span>
          <span>{pages.length}</span>
        </div>
      </div>

      {/* Full-screen Image Preview with Zoom & Pan */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closePreview}
        >
          <div
            className="relative p-4 bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
          >
            <TransformWrapper>
              {({ zoomIn, zoomOut }) => (
                <>
                  <div className="flex justify-end space-x-2">
                    <button
                      title="zoomin"
                      onClick={() => zoomIn()}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <ZoomIn className="w-6 h-6" />
                    </button>
                    <button
                      title="zoomout"
                      onClick={() => zoomOut()}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <ZoomOut className="w-6 h-6" />
                    </button>
                  </div>
                  <TransformComponent>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="max-w-5xl max-h-[90vh] rounded-lg shadow-lg object-contain"
                    />
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
            <button
              title="close"
              onClick={closePreview}
              className="absolute p-2 text-white transition rounded-full top-2 right-2 bg-black/50 hover:bg-black"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
