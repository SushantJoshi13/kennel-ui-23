export const PaymentSuccess = ({ successText }) => {
  return (
    <div
      id="successModal"
      tabindex="-1"
      aria-hidden="true"
      class="h-modal fixed left-0 right-0 top-0 z-50 hidden w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"
    >
      <div class="relative h-full w-full max-w-md p-4 md:h-auto">
        <div class="dark:bg-gray-800 relative rounded-lg bg-white p-4 text-center shadow sm:p-5">
          <button
            type="button"
            class="hover:bg-gray-200 dark:hover:bg-gray-600 absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white"
            data-modal-toggle="successModal"
          >
            <svg
              aria-hidden="true"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="mx-auto mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 p-2 dark:bg-green-900">
            <svg
              aria-hidden="true"
              class="h-8 w-8 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Success</span>
          </div>
          <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Payment Successful!.
          </p>
          <p className="text-gray-600">
            Thank you for your payment. {successText}.
          </p>
          <button
            data-modal-toggle="successModal"
            type="button"
            class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:focus:ring-primary-900 rounded-lg px-3 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
