export const jobTypes = [
  { name: "Full Time" },
  { name: "Part Time" },
  { name: "Contract" },
  { name: "Contract to hire" },
  { name: "Perdiem" },
  { name: "Internship" },
  { name: "Dual-FTE/FTC" },
];

export const priorityTypes = [
  { name: "Critical" },
  { name: "High" },
  { name: "Medium" },
  { name: "Low" },
];

export const langList = [
  { name: "Hindi", is_checked: false },
  { name: "English", is_checked: false },
  { name: "Chinese", is_checked: false },
  { name: "Japaneese", is_checked: false },
];

export const jobStatus = [
  { name: "Active" },
  { name: "Inactive" },
  { name: "Hold" },
  { name: "Closed" },
  { name: "Slow" },
];

export const TaxTerms = [
  { name: "W2" },
  { name: "C2C" },
  { name: "1099" },
  { name: "Dual-W2/C2C" },
];

export const taxTermSubType = [
  { name: "W2", type: { source1: "3rd Party", source2: "Own Corporation" } },
  { name: "C2C", type: { source1: "Immigrants", source2: "Non-Immigrants" } },
];

export const documentsList = [
  {
    source: "3rd Party",
    list: [
      { name: "All fields of LinkedIn is mandatory" },
      { name: "(DL or State Id) for DOB Proof" },
      { name: "Passport" },
      { name: "I 94" },
      { name: "Travel History" },
      { name: "SSN" },
      { name: "Visa Copy" },
      { name: "RTR" },
      {
        name: "Education details documents related (like Masters/Bachlors completed year)",
      },
    ],
  },
  {
    source: "Own Corporation",
    list: [
      { name: "All fields of LinkedIn is mandatory" },
      { name: "(DL or State Id) for DOB Proof" },
      { name: "RTR" },
      {
        name: "Education details documents related (like Masters/Bachlors completed year)",
      },
    ],
  },
  {
    source: "Immigrants",
    list: [
      { name: "All fields of LinkedIn is mandatory" },
      { name: "(DL or State Id) for DOB Proof" },
      // { name: "RTR" },
      {
        name: "Education details documents related (like Masters/Bachlors completed year)",
      },
    ],
  },
  {
    source: "Non-Immigrants",
    list: [
      { name: "All fields of LinkedIn is mandatory" },
      { name: "(DL or State Id) for DOB Proof" },
      { name: "Employee RTR" },
      {
        name: "Education details documents related (like Masters/Bachlors completed year)",
      },
    ],
  },
];

export const relocationReasonList = [
  { name: "Family Dependancies" },
  { name: "Project is about to end" },
  { name: "Cost of Living" },
  { name: "Career Growth" },
  { name: "Other" },
];
