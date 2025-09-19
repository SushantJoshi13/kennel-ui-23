import { useReactToPrint } from "react-to-print";
import logo1 from "../../assets/Logos/latest_logo.png";
import { useRef } from "react";

export const UserIdCard = ({ user }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div id="id" ref={componentRef} className="flex flex-col p-2 border">
        <div className="flex flex-col basis-[20%] object-contain justify-center items-center">
          <img
            src={logo1}
            alt="logo"
            style={{ height: "20mm" }}
            className="object-contain"
          />
          <p className="text-[6px]">Reg. No. F-59689/PUNE</p>
        </div>
        <div className="flex basis-[30%] justify-center items-center">
          <div className="object-contain">
            <img
              src={user?.identification_doc}
              className="object-cover rounded-full h-[18mm] w-[18mm]"
              alt="user"
            />
          </div>
        </div>
        <div className="flex flex-col basis-[50%] justify-between">
          <div>
            <p className="text-center">{user?.user_name}</p>
            <p className="text-center text-[8px]">Breeder</p>
          </div>
          <div className="flex flex-col justify-center px-6">
            <DetailComponent label={"ID No."} value={user?.id} />
            <DetailComponent label={"Email"} value={user?.email} />
            <DetailComponent label={"Phone"} value={user?.contact_no} />
          </div>
          <p className="text-center justify-end items-end text-[8px]">
            www.genuinebreederassociation.com
          </p>
        </div>
      </div>
      <button className="btn-primary mb-4 mt-4" onClick={handlePrint}>
        Print this out!
      </button>
    </div>
  );
};

const DetailComponent = ({ label, value }) => {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1 text-[8px]">{label}</div>
      <div className="col-span-2 text-[8px]">{value}</div>
    </div>
  );
};
