import { useNavigate } from "react-router";

export const NotFound = () => {
  const nav = useNavigate();
  return (
    <div class="bg-gradient-to-r from-purple-300 to-blue-200">
      <div class="m-auto flex min-h-screen w-9/12 items-center justify-center py-16">
        <div class="overflow-hidden bg-white pb-8 shadow sm:rounded-lg">
          <div class="border-t border-gray-200 pt-8 text-center">
            <h1 class="text-9xl font-bold text-purple-400">404</h1>
            <h1 class="py-8 text-6xl font-medium">oops! Page not found</h1>
            <p class="px-12 pb-8 text-2xl font-medium">
              Oops! The page you are looking for does not exist. It might have
              been moved or deleted.
            </p>
            <button
              onClick={() => nav("/")}
              class="mr-6 rounded-md bg-gradient-to-r from-purple-400 to-blue-500 px-6 py-3 font-semibold text-white hover:from-pink-500 hover:to-orange-500"
            >
              HOME
            </button>
            <button
              onClick={() => nav("/contact-us")}
              class="rounded-md bg-gradient-to-r from-red-400 to-red-500 px-6 py-3 font-semibold text-white hover:from-red-500 hover:to-red-500"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
