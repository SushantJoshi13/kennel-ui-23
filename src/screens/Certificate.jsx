import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { useNavigate, useParams } from "react-router";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import logo from "../assets/Logos/latest_logo.png";
import CertificateTree from "../components/CertificateTree";
import { getApi } from "../service/axios.service";
import { CustomTree } from "./CustomTree";

const Certificate = () => {
  const temp_data = {
    name: "Parent",
    attributes: {
      level: 0,
    },
    children: [
      {
        name: "Child 1",
        children: [
          {
            name: "Parent",
            children: [
              {
                name: "Child 1",
                children: [
                  {
                    name: "Parent",
                    children: [],
                  },
                  {
                    name: "Parent",
                    children: [],
                  },
                ],
              },
              {
                name: "Child 2",
                children: [
                  {
                    name: "Parent",
                    children: [],
                  },
                  {
                    name: "Parent",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            name: "Parent",
            children: [
              {
                name: "Child 1",
                children: [
                  {
                    name: "Parent",
                    children: [],
                  },
                  {
                    name: "Parent",
                    children: [],
                  },
                ],
              },
              {
                name: "Child 2",
                children: [
                  {
                    name: "Parent",
                    children: [],
                  },
                  {
                    name: "Parent",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Child 2",
        children: [
          {
            name: "Parent",
            children: [
              {
                name: "Child 1",
                children: [
                  {
                    name: "Parent",
                    children: [],
                  },
                  {
                    name: "Parent",
                    children: [],
                  },
                ],
              },
              {
                name: "Child 2",
                children: [
                  {
                    name: "Parent",
                    children: [],
                  },
                  {
                    name: "Parent",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            name: "Parent",
            children: [
              {
                name: "Child 1",
                children: [
                  {
                    name: "Parent",
                    children: [],
                  },
                  {
                    name: "Parent",
                    children: [],
                  },
                ],
              },
              {
                name: "Child 2",
                children: [
                  {
                    name: "Parent",
                    children: [],
                  },
                  {
                    name: "Parent",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [certificateData, setCertificateData] = useState(null);
  const [breeder, setBreeder] = useState(null);
  // get params id
  const { id } = useParams();
  const nav = useNavigate();
  const getCertificateData = async () => {
    const res = await getApi(`animal/CertificateData?animal_id=${id}`);
    if (res.status === 200) {
      setCertificateData(res.data.data);
      if (res.data.data.animal.animal_pedigree !== null)
        setData(res.data.data.animal.animal_pedigree);
      document.title = res.data.data.animal.animal_registration_number;
      setLoading(false);
    } else {
      console.log("error");
      setLoading(false);
      toast.error("Something went wrong. Please try again later");
      setTimeout(() => {
        nav(-1);
      }, 1000);
    }
  };

  const breederName = () => {
    const animal_name = certificateData?.animal.animal_name;
    const user_sirname =
      certificateData?.animal.animal_owner_id.user_name.split(" ")[1];
    // get farm where animal_type_id == animal_type_id
    if (certificateData.farm?.farms?.length > 0) {
      const farm = certificateData?.farm.farms.filter(
        (farm) =>
          farm.animal_type_id ===
          certificateData?.animal.animal_type_id.animal_type_id
      );
      // get starting string of farm name
      if (farm?.length > 0) {
        const farm_name = farm[0]?.farm_name.split(" ")[0];
        setBreeder(farm_name + "'s" + " " + animal_name);
      } else {
        setBreeder(animal_name);
      }
    } else {
      setBreeder(animal_name);
    }
  };

  useEffect(() => {
    getCertificateData();
  }, []);

  useEffect(() => {
    if (certificateData) {
      breederName();
    }
  }, [certificateData]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className="p-4">
      <div className="flex">
        <button className="btn-primary mb-4" onClick={() => nav(-1)}>
          Go Back
        </button>
        <button className="btn-primary mb-4 ml-4" onClick={handlePrint}>
          Print this out!
        </button>
      </div>

      <div
        ref={componentRef}
        className="bg-main-yellow !font-poppins"
        id="Certificate"
      >
        {loading ? (
          <div className="flex h-[90vh] w-full items-center justify-center">
            <span className="loader self-center"></span>
          </div>
        ) : (
          <div className="flex flex-col justify-between h-full">
            <div className="flex items-start justify-between gap-4 basis-[20%] overflow-hidden p-2">
              <div className="flex flex-col items-start justify-center text-[10px] basis-[25%] uppercase">
                <div>
                  <span>BREED: </span>
                  <span>
                    {certificateData?.animal.animal_breed_id.animal_breed_name}
                  </span>
                </div>
                <div>
                  <span>NAME: </span>
                  <span>{breeder}&nbsp;</span>
                </div>
                <div>
                  <span>D.O.B.: </span>
                  <span>{certificateData?.animal.animal_date_of_birth}</span>
                </div>
                <div>
                  <span>COLOR: </span>
                  <span>
                    {certificateData?.animal.animal_color_and_markings}
                  </span>
                </div>
                <div>
                  <span>MICROCHIP NO.: </span>
                  <span>{certificateData?.animal.animal_microchip_id}</span>
                </div>
                <div>
                  <span>REGISTRATION NO.: </span>
                  <span>
                    {certificateData?.animal.animal_registration_number}
                  </span>
                </div>
                <div>
                  <span>BREEDER: </span>
                  <span>{certificateData?.animal?.breeder_name}</span>
                </div>
                <div>
                  <span>CONTACT NO.: </span>
                  <span>
                    {certificateData?.animal.animal_owner_id.contact_no}
                  </span>
                </div>
                <div>
                  <span>BREED IN (COUNTRY): </span>
                  <span>{certificateData?.animal.animal_country}</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 basis-[50%]">
                <img
                  alt="logo"
                  src={logo}
                  className="h-[10vh] rounded-lg object-center"
                />
                <div className="flex flex-col items-center justify-center">
                  <span>Reg.No. F-59689/PUNE</span>
                  <span>www.genuinebreederassociation.com</span>
                </div>
              </div>
              <div className="flex flex-col items-start text-[10px] basis-[25%] uppercase">
                <div className="flex items-center justify-center">
                  <span>OWNER: </span>
                  <pre> </pre>
                  <span>
                    {certificateData?.animal?.animal_owner_id.user_name}
                  </span>
                </div>

                <div className="flex justify-center">
                  <pre>ADDRESS: </pre>
                  <span>
                    {certificateData?.animal?.animal_owner_id !== null
                      ? certificateData?.animal?.animal_owner_id.user_address
                      : ""}
                  </span>
                </div>
              </div>
            </div>
            {data !== null ? (
              <div className="w-full basis-[80%] h-full uppercase relative">
                {/* <div className="h-100 bg-red-50"></div>
              // <div className="h-100 bg-red-100"></div>
              // <div className="h-100 bg-red-200"></div>
              // <div className="h-100 bg-red-300"></div>
              // <div className="h-100 bg-red-400"></div>
              // <div className="h-100 bg-red-500"></div> */}
                {/* // <CustomTree familyTree={data} /> */}
                <CertificateTree data={data ?? temp_data} />
              </div>
            ) : (
              // {/* <CertificateTree data={data ?? temp_data} /> */}
              // </div>
              <div className="certificate_map basis-[80%] flex items-center justify-center !text-black">
                <h1>Animal has no pedigree</h1>
              </div>
            )}
            <div className="basis-[10%] overflow-hidden uppercase">
              <div className="grid grid-cols-2">
                <div className="col-span-1 pl-2">
                  <div className="flex items-center text-[10px]">
                    <div className="flex items-center gap-2 mr-3">
                      <h2>HD</h2>
                      {certificateData?.animal?.animal_hded_doc ? (
                        <ImCheckboxChecked className="h-5 w-5" />
                      ) : (
                        <ImCheckboxUnchecked className="h-2 w-2" />
                      )}
                    </div>
                    <div className="flex items-center gap-2  mr-3">
                      <h2>ED</h2>
                      {certificateData?.animal?.animal_hded_doc ? (
                        <ImCheckboxChecked className="h-5 w-5" />
                      ) : (
                        <ImCheckboxUnchecked className="h-2 w-2" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mr-3">
                      <h2>DNA</h2>
                      {certificateData?.animal?.animal_dna_doc ? (
                        <ImCheckboxChecked className="h-5 w-5" />
                      ) : (
                        <ImCheckboxUnchecked className="h-2 w-2" />
                      )}
                    </div>
                  </div>
                  <span className="text-[10px]">
                    PRESIDENT OF GENUINE BREEDER ASSOCIATION CERTIFY THAT THE
                    ABOVE INFORMATION IS CORRECT AND RELIABLE
                  </span>
                </div>
                <div className="col-span-1 text-[10px] flex flex-col items-center p-2">
                  <div className="flex flex-col">
                    <span>
                      DATE : {moment(new Date()).format("DD-MM-YYYY")}
                    </span>
                    <span>TIME : {moment(new Date()).format("hh:mm A")}</span>
                    <span>SIGNATURE </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificate;
