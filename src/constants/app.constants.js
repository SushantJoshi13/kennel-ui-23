export const appToken = "token";
export const appUserId = "user_id";
export const appUserRole = "role_id";
export const UserStatus = {
  1: "Verified",
  2: "Verification Pending",
  3: "Rejected",
};

export const VerificationStatus = [
  { 1: "Verify" },
  { 2: "Verification Pending" },
  { 3: "Reject" },
];

export const StatusArray = [{ true: "Active" }, { false: "In Active" }];
export const Status = {
  1: "Active",
  2: "In Active",
};

export const LitterStatus = {
  1: "Verified",
  2: "Rejected",
};

export const userRoles = {
  1: "breeder",
  2: "user",
  3: "admin",
};

export const animalGender = ["Male", "Female"];

export const animalRegistrationSource = {
  litter: "Litter Registration",
  registration: "Animal Registration",
  pedigree: "Pedigree Registration",
  semen: "Semen Registration",
  adminRegistration: "Admin Registration",
};

export const animalVerificationStatus = [
  {
    label: "Verify",
    value: true,
  },
  {
    label: "Reject",
    value: false,
  },
];

export const paymentMinutesToShow = 5;
