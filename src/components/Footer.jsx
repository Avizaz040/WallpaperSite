export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-300 bg-white py-6 text-center text-sm text-gray-600">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-indigo-700">Mogetzer</span>. All rights reserved.
      </p>
      <p className="mt-1">
        Made with ❤️ using{" "}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:underline"
        >
          Next.js
        </a>{" "}
        and Tailwind CSS.
      </p>
    </footer>
  );
}
