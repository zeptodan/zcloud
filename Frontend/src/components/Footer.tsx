export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-4 mt-auto">      
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="text-3xl font-bold text-blue-400 sm:self-end">
                Zcloud
            </div>
            <div className="flex flex-col mt-6 sm:mt-0 text-sm space-y-1">
                <span className="text-gray-400">Made by Muhammad Anas</span>
                <a href="https://www.linkedin.com/in/muhammad-anas-alam/" target="_blank" className="hover:text-blue-400 transition">LinkedIn</a>
            </div>
        </div>
      <div className="text-center text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} Zcloud. All rights reserved.
      </div>
    </footer>
  );
}
