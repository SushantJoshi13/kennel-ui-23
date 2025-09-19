import { BsFillPersonFill } from "react-icons/bs";
import { HiCurrencyRupee, HiOutlineHome } from "react-icons/hi";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import NewAdminLayout from "../layouts/NewAdminLayout";
import RequireAuth from "../layouts/RequiredRoute";
import AddAnimal from "../screens/AddAnimal";
import ChangePetName from "../screens/ChangePetName";
import LitterRegistration from "../screens/LitterRegistration";
import CostMaster from "../screens/admin/CostMaster";
import BreedersList from "../screens/admin/adminBreederList";
import AdminHome from "../screens/admin/adminHome";
import AnimalList from "../screens/admin/animal";
import OwnerDetails from "../screens/admin/breederDetails";
import BreedsList from "../screens/admin/breedsList";
import Home from "../screens/home";
import Login from "../screens/login";
// import Register from '../screens/register';
import { BiCategoryAlt } from "react-icons/bi";
import { FaDog, FaUsers } from "react-icons/fa";
import { RiLandscapeFill } from "react-icons/ri";
import { userRoles } from "../constants/app.constants";
import AddFarm from "../screens/AddFarm";
import AnimalPedigree from "../screens/AnimalPedigree";
import Certificate from "../screens/Certificate";
import ConfirmSire from "../screens/ConfirmSire";
import ConfirmTransfer from "../screens/ConfirmTransfer";
import { CourseDetails } from "../screens/CourseDetails";
import EditAnimal from "../screens/EditAnimal";
import { Education } from "../screens/Education";
import ExportPedigree from "../screens/ExportPedigree";
import ForgotPassword from "../screens/ForgotPassword";
import { NotFound } from "../screens/NotFound";
import { PaymentFailed } from "../screens/PaymentFailed";
import { Pricing } from "../screens/Pricing";
import ResetPassword from "../screens/ResetPassword";
import Search from "../screens/Search";
import Subscription from "../screens/Subscription";
import { Terms } from "../screens/Terms";
import TransferFarm from "../screens/TransferFarm";
import UserAnimalDetails from "../screens/UserAnimalDetails";
import UserAnimalList from "../screens/UserAnimalList";
import UserDetails from "../screens/UserDetails";
import AboutUs from "../screens/about/AboutUs";
import { AddCourses } from "../screens/admin/AddCourses";
import { AdminAddAnimal } from "../screens/admin/AdminAddAnimal";
import CourseList from "../screens/admin/CourseList";
import LitterRegisterDetails from "../screens/admin/Litters/LitterRegisterDetails";
import LittersDetails from "../screens/admin/Litters/LittersDetails";
import RegisteredAnimalDetails from "../screens/admin/RegisteredAnimalDetails";
import RegisteredAnimals from "../screens/admin/RegisteredAnimals";
import ViewAnimalPedegree from "../screens/admin/ViewAnimalPedegree";
import IndividualList from "../screens/admin/adminIndividualList";
import FarmTypes from "../screens/admin/farmTypes";
import IndividualDetails from "../screens/admin/individualDetails";
import ContactUs from "../screens/contactUs/ContactUs";
import NewRegister from "../screens/newRegister";
import Services from "../screens/services/Services";
import TransferOwnership from "../screens/transferOwnership";
import { TreeDia } from "../screens/tree";
import RoleCheckWrapper from "./AuthWrapper";
import VerifiedAuthWrapper from "./VerifiedAuthWrapper";
import EnrolledCourseList from "../screens/admin/CoursesEnrolled";
import EnrolledCourseDetails from "../screens/admin/EnrolledCourseDetails";
import { AnimalRegistrationDetails } from "../screens/AnimalRegistrationDetails";
import { Breeds } from "../screens/Breeds";

export const adminRoutes = [
  {
    path: "dashboard",
    label: "Dashboard",
    element: <AdminHome />,
    icon: <HiOutlineHome className="mr-2 " />,
    showInSideBar: true,
  },
  {
    path: "animal-master",
    label: "Animals Master",
    element: <AnimalList />,
    icon: <FaDog className="mr-2 " />,
    showInSideBar: true,
  },
  {
    path: "breeds",
    label: "Animal Breeds",
    element: <BreedsList />,
    icon: <BiCategoryAlt className="mr-2 " />,
    showInSideBar: true,
  },
  {
    path: "farm-type",
    label: "Farm Types",
    element: <FarmTypes />,
    icon: <RiLandscapeFill className="mr-2 " />,
    showInSideBar: true,
  },
  {
    path: "cost-master",
    label: "Cost Master",
    element: <CostMaster />,
    icon: <HiCurrencyRupee className="mr-2 " />,
    showInSideBar: true,
  },
  {
    path: "breeders-list",
    label: "Breeders",
    element: <BreedersList />,
    icon: <FaUsers className="mr-2 " />,
    showInSideBar: true,
  },
  {
    path: "individual-list",
    label: "Individuals",
    element: <IndividualList />,
    icon: <FaUsers className="mr-2 " />,
    showInSideBar: true,
  },
  {
    path: "litters-registered-details",
    label: "Litters Details",
    element: <LitterRegisterDetails />,
    icon: <FaUsers className="mr-2 " />,
    showInSideBar: true,
  },
  {
    path: "litters-details/:id",
    label: "Litters Details",
    element: <LittersDetails />,
    icon: <FaUsers className="mr-2 " />,
    showInSideBar: false,
  },
  {
    path: "breeder-details/:id",
    label: "Breeders",
    element: <OwnerDetails />,
    icon: <BsFillPersonFill className="mr-2 " />,
    showInSideBar: false,
  },
  {
    path: "individual-details/:id",
    label: "Individuals",
    element: <IndividualDetails />,
    icon: <BsFillPersonFill className="mr-2 " />,
    showInSideBar: false,
  },
  {
    path: "registered-animals",
    label: "Registered Animals",
    element: <RegisteredAnimals />,
    icon: <FaDog className="mr-2 " />,
    showInSideBar: true,
  },
  {
    path: "registered-animals/details/:id",
    label: "Registered Animals",
    element: <RegisteredAnimalDetails />,
    icon: <FaDog className="mr-2 " />,
    showInSideBar: false,
  },
  {
    path: "registered-animals/details/view-pedegree",
    label: "Registered Animals",
    element: <ViewAnimalPedegree />,
    icon: <FaDog className="mr-2 " />,
    showInSideBar: false,
  },
  {
    path: "add-course",
    label: "Add Courses",
    element: <AddCourses edit={false} />,
    showInSideBar: false,
  },
  {
    path: "edit-course/:id",
    label: "Edit Course",
    element: <AddCourses edit={true} />,
    showInSideBar: false,
  },
  {
    path: "courses",
    label: "Courses",
    element: <CourseList />,
    icon: <FaDog className="mr-2 " />,
    showInSideBar: true,
  },
  {
    path: "courses-enrolled",
    label: "Courses Enrolled",
    element: <EnrolledCourseList />,
    icon: <FaDog className="mr-2 " />,
    showInSideBar: true,
  },
  {
    path: "enrolled-course/:courseId/:userId",
    label: "View Enrolled Course",
    element: <EnrolledCourseDetails />,
    showInSideBar: false,
  },
  {
    path: "add-animal",
    label: "Add Animal",
    element: <AdminAddAnimal />,
    icon: <FaDog className="mr-2 " />,
    showInSideBar: false,
  },
];
export const appRouter = createBrowserRouter([
  {
    path: "/register",
    element: <NewRegister />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: (
      <Layout>
        <AboutUs />
      </Layout>
    ),
  },
  {
    path: "/pricing",
    element: (
      <Layout>
        <Pricing />
      </Layout>
    ),
  },
  {
    path: "/education",
    element: (
      <Layout>
        <Education />
      </Layout>
    ),
  },
  {
    path: "/education/:id",
    element: (
      <Layout>
        <CourseDetails />
      </Layout>
    ),
  },
  {
    path: "/search",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <Layout hideBar={true}>
            <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
              <Search />
            </RoleCheckWrapper>
          </Layout>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/terms",
    element: (
      <Layout>
        <Terms />
      </Layout>
    ),
  },
  {
    path: "/payment",
    element: (
      <Layout>
        <PaymentFailed />
      </Layout>
    ),
  },
  {
    path: "/subscription",
    element: (
      <Layout>
        <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
          <Subscription />
        </RoleCheckWrapper>
      </Layout>
    ),
  },
  {
    path: "/add-farm",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <Layout hideBar={true}>
            <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
              <AddFarm />
            </RoleCheckWrapper>
          </Layout>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/services",
    element: (
      <Layout>
        <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
          <Services />
        </RoleCheckWrapper>
      </Layout>
    ),
  },
  {
    path: "/contact-us",
    element: (
      <Layout>
        <ContactUs />
      </Layout>
    ),
  },
  {
    path: "/animal-registration",
    element: (
      <Layout>
        <AnimalRegistrationDetails />
      </Layout>
    ),
  },
  {
    path: "/breeds/:animalTypeId",
    element: (
      <Layout>
        <Breeds />
      </Layout>
    ),
  },
  {
    path: "/",
    element: (
      <Layout>
        <RoleCheckWrapper path="/" allowedRole={[userRoles[1], userRoles[2]]}>
          <Home />
        </RoleCheckWrapper>
      </Layout>
    ),
  },
  {
    path: "/confirmTransfer",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <Layout hideBar={true}>
            <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
              <ConfirmTransfer />
            </RoleCheckWrapper>
          </Layout>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout hideBar={false}>
        <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
          <UserDetails />
        </RoleCheckWrapper>
      </Layout>
    ),
  },

  {
    path: "/litterRegistration",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <Layout hideBar={true}>
            <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
              <ConfirmSire />
            </RoleCheckWrapper>
          </Layout>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/userAnimals",
    element: (
      <RequireAuth>
        <Layout hideBar={false}>
          <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
            <UserAnimalList />
          </RoleCheckWrapper>
        </Layout>
      </RequireAuth>
    ),
  },
  {
    path: "/terms",
    element: (
      <Layout>
        <Terms />
      </Layout>
    ),
  },
  {
    path: "/payment",
    element: (
      <Layout>
        <PaymentFailed />
      </Layout>
    ),
  },
  {
    path: "/subscription",
    element: (
      <Layout>
        <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
          <Subscription />
        </RoleCheckWrapper>
      </Layout>
    ),
  },
  {
    path: "/add-farm",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <Layout hideBar={true}>
            <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
              <AddFarm />
            </RoleCheckWrapper>
          </Layout>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/services",
    element: (
      <Layout>
        <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
          <Services />
        </RoleCheckWrapper>
      </Layout>
    ),
  },
  {
    path: "/contact-us",
    element: (
      <Layout>
        <ContactUs />
      </Layout>
    ),
  },
  {
    path: "/",
    element: (
      <Layout>
        <RoleCheckWrapper path="/" allowedRole={[userRoles[1], userRoles[2]]}>
          <Home />
        </RoleCheckWrapper>
      </Layout>
    ),
  },
  {
    path: "/confirmTransfer",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <Layout hideBar={true}>
            <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
              <ConfirmTransfer />
            </RoleCheckWrapper>
          </Layout>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout hideBar={false}>
        <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
          <UserDetails />
        </RoleCheckWrapper>
      </Layout>
    ),
  },

  {
    path: "/litterRegistration",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <Layout hideBar={true}>
            <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
              <ConfirmSire />
            </RoleCheckWrapper>
          </Layout>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/userAnimals",
    element: (
      <RequireAuth>
        <Layout hideBar={false}>
          <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
            <UserAnimalList />
          </RoleCheckWrapper>
        </Layout>
      </RequireAuth>
    ),
  },
  {
    path: "/userAnimalDetails/:id",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <Layout hideBar={true}>
            <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
              <UserAnimalDetails />
            </RoleCheckWrapper>
          </Layout>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/animalPedigree",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
            <AnimalPedigree />
          </RoleCheckWrapper>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/litter",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <Layout hideBar={true}>
            <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
              <LitterRegistration />
            </RoleCheckWrapper>
          </Layout>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/transfer-owner",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <Layout hideBar={true}>
            <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
              <TransferOwnership />
            </RoleCheckWrapper>
          </Layout>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/transfer-farm",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <Layout hideBar={true}>
            <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
              <TransferFarm />
            </RoleCheckWrapper>
          </Layout>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/add-animal",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <Layout hideBar={true}>
            <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
              <AddAnimal hasCertificateOptions={true} />
            </RoleCheckWrapper>
          </Layout>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/edit-animal",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <Layout hideBar={true}>
            <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
              <EditAnimal edit={true} hasCertificateOptions={true} />
            </RoleCheckWrapper>
          </Layout>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/import-pedigree",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <Layout hideBar={true}>
            <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
              <AddAnimal hasCertificateOptions={false} />
            </RoleCheckWrapper>
          </Layout>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/change-name",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <Layout hideBar={true}>
            <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
              <ChangePetName />
            </RoleCheckWrapper>
          </Layout>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/export-pedigree",
    element: (
      <RequireAuth>
        <VerifiedAuthWrapper>
          <Layout hideBar={true}>
            <RoleCheckWrapper allowedRole={[userRoles[1], userRoles[2]]}>
              <ExportPedigree />
            </RoleCheckWrapper>
          </Layout>
        </VerifiedAuthWrapper>
      </RequireAuth>
    ),
  },
  {
    path: "/tree",
    element: (
      <RequireAuth>
        <TreeDia />
      </RequireAuth>
    ),
  },
  {
    path: "/admin-layout",
    element: (
      <RoleCheckWrapper allowedRole={[userRoles[3]]}>
        <NewAdminLayout />
      </RoleCheckWrapper>
    ),
    children: adminRoutes,
  },
  {
    path: "/certificate/:id",
    label: "Animal Certificate",
    element: <Certificate />,
    showInSideBar: true,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
