import { FcApproval, FcCancel } from "react-icons/fc";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import usePayment from "../context/PaymentContext";

export const PaymentFailed = () => {
  const [query] = useSearchParams();
  const { setPaymentStatus } = usePayment();
  const order_id = query.get("order_id");
  const status = query.get("status");
  const refNo = query.get("refNo");
  const mode = query.get("mode");
  const description = query.get("description");
  const navigate = useNavigate();
  return (
    <div className="mt-20 flex min-h-screen items-start justify-center px-5 text-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center justify-center text-center">
          {status === "Success" ? (
            <FcApproval size={50} className="text-center" />
          ) : (
            <FcCancel size={50} />
          )}

          <h2 className="mt-4 text-2xl font-semibold">
            Payment {status}
            {/* {status === "Success" ? "Payment Success" : "Payment Failed"} */}
          </h2>
          {status === "Success" ? (
            <p className="mt-2 text-gray-600">
              Your payment for <b>{description}</b> was successful!
              <br /> {refNo && <span>Reference Number: {refNo}</span>}
              <br />
              {mode && <span>Payment mode: {mode}</span>}
            </p>
          ) : (
            <p className="mt-2 text-gray-600">
              We're sorry, but your payment for <b>{description}</b> was not
              successful. Please contact admin if any amount was deducted from
              your account
            </p>
          )}

          {order_id && <p>Order ID: {order_id}</p>}
        </div>
        {status === "Success" ? (
          <p className="mt-6">You can return now close this tab!</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <button
              onClick={() => {
                setPaymentStatus("");
                navigate("/contact-us", { replace: true });
              }}
              className="w-full rounded-lg bg-red-500 py-3 font-semibold text-white hover:bg-red-600"
            >
              Contact Us
            </button>
            <button
              onClick={() => {
                setPaymentStatus("");
                navigate("/", { replace: true });
              }}
              className="w-full rounded-lg bg-red-500 py-3 font-semibold text-white hover:bg-red-600"
            >
              Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
