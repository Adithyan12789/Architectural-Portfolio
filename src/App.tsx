// app.tsx

import { PageFlipBook } from "./components/PageFlipBook"

const generatePages = () => {
  const pages = [];

  for (let i = 0 ; i < 91; i++) {
    pages.push({
      id: i,
      imageUrl: `/images/full-${i}.jpg`,
    });
  }
  
  return pages;
}

const pages = generatePages();

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <PageFlipBook pages={pages} />
    </div>
  )
}

export default App;
